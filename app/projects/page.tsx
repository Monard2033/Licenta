'use client'
import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import CommentSection from '@/components/CommentSection';
import { createClient } from '@/utils/supabase/client';
import { ProjectInterface, TaskInterface } from '@/utils/users';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Spinner } from "@nextui-org/react";

const supabase = createClient();

const ProjectPage = ({ params }: { params: any }) => {
    const [comments, setComments] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [currentTask, setCurrentTask] = useState<TaskInterface>();
    const [isTaskEditable, setIsTaskEditable] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({ email: '', name: '' });
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [newTask, setNewTask] = useState({
        task_name: '',
        description: '',
        start_time: '',
        end_time: ''
    });

    const projectId = params.projectId;

    useEffect(() => {
        checkAdminRole();
        fetchTasks();
        fetchProjects();
        fetchUser();
    }, [projectId]);

    useEffect(() => {
        if (currentTask) {
            fetchTaskDetails(currentTask.task_name);
            const interval = setInterval(() => {
                updateTimeLeft();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentTask]);

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data: profile } = await supabase
                .from('users')
                .select('name')
                .eq('email', user.email)
                .single();

            if (profile) {
                // @ts-ignore
                setUser({ email: user.email, name: profile.name });
            }
        }
    }

    const checkAdminRole = async () => {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
            console.error('Error checking user role:', error);
            return;
        }
        // @ts-ignore
        if (user.email.endsWith('@gmail.com')) {
            setIsAdmin(true);
        // @ts-ignore
        } else if (user.email.endsWith('@student.upt.ro')) {
            setIsAdmin(false);
        }
    };

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')

        if (error) {
            console.error('Error fetching tasks:', error);
        } else {
            setTasks(data);
            if (data.length > 0) {
                setCurrentWeeklyTask(data);
            }
        }
    };

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*');

        if (error) {
            console.error('Error fetching projects:', error);
        } else {
            setProjects(data);
            setLoading(false);
        }
    };

    const setCurrentWeeklyTask = (tasks: any) => {
        const currentDate = new Date();
        const weeklyTask = tasks.find((task: { start_time: string | number | Date; end_time: string | number | Date; }) => {
            const startTime = new Date(task.start_time);
            const endTime = new Date(task.end_time);
            return startTime <= currentDate && endTime >= currentDate;
        });

        if (weeklyTask) {
            setCurrentTask(weeklyTask);
            checkIfTaskEditable(weeklyTask);
        }
    };

    const checkIfTaskEditable = (task: any) => {
        const currentDate = new Date();
        const startTime = new Date(task.start_time);
        const endTime = new Date(task.end_time);

        const isTaskEditable = startTime <= currentDate && endTime >= currentDate;
        setIsTaskEditable(isTaskEditable);
    };

    const fetchTaskDetails = async (taskName: string) => {
        const { data: comments, error: commentsError } = await supabase
            .from('comments')
            .select('*')
            .eq('task_name', taskName);

        const { data: files, error: filesError } = await supabase
            .from('files')
            .select('*')
            .eq('task_name', taskName);

        if (commentsError || filesError) {
            console.error('Error fetching task details:', commentsError || filesError);
        } else {
            setComments(comments);
            setFiles(files);
        }
    };

    const updateTimeLeft = () => {
        if (!currentTask) return;
        const endTime = new Date(currentTask.end_time);
        const now = new Date();
        const timeDifference = endTime.getTime() - now.getTime();

        if (timeDifference > 0) {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
            setTimeLeft('Time is up!');
        }
    };

    const handleFileUpload = (file: File) => {
        setFiles([...files, file]);
    };

    const handleCommentSubmit = (comment: string) => {
        setComments([...comments, comment]);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    };

    const handleNewTaskChange = (e: any) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleCreateTask = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ ...newTask, project_name: selectedProject }]);

        if (error) {
            console.error('Error creating task:', error);
        } else {
            // @ts-ignore
            setTasks([...tasks, data[0]]);
            setNewTask({ task_name: '', description: '', start_time: '', end_time: '' });
            alert("Adaugat cu Succes")
        }
    };

    const getCurrentDate = () => new Date().toISOString();

    const ongoingTasks = tasks.filter(task => new Date(task.end_time) >= new Date());
    const finishedTasks = tasks.filter(task => new Date(task.end_time) < new Date());

    if (loading) {
        return (
            <main className="w-full flex items-center justify-center">
                <Spinner />
            </main>
        )
    }

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen h-screen">
            {isAdmin && (
                <div
                    className="flex flex-col admin-panel p-2 m-1 gap-3 bg-content1 border-3 rounded-medium hover:m-0.5 transition-all duration-300">
                    <h2 className="bg-content3 rounded-medium text-3xl w-fit p-1">Panoul Mentorului</h2>
                    <h2 className="bg-content3 rounded-medium w-fit p-1">Adauga o Sarcina Noua</h2>
                    <div>
                        <label>Selecteaza Proiect: </label>
                        <select className="bg-content3 rounded-medium"
                                onChange={(e) => setSelectedProject(e.target.value)}>
                            <option>Alegeti:</option>
                            {projects.map((project) => (
                                <option key={project.project_id} value={project.name}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-fit">
                        <label>Nume Sarcina: </label>
                        <input
                            type="text"
                            name="task_name"
                            className="bg-content3 rounded-medium"
                            value={newTask.task_name}
                            onChange={handleNewTaskChange}/>
                    </div>
                    <div className="flex flex-col w-[50%] p-2 rounded-medium bg-content3 justify-start">
                        <label>Descriere Sarcina:</label>
                        <textarea
                            name="description"
                            className="border-2 rounded-medium w-full min-h-44 max-h-64 bg-inherit p-2"
                            value={newTask.description}
                            onChange={handleNewTaskChange}/>
                    </div>
                    <div>
                        <label>Data de Start: </label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            value={newTask.start_time}
                            onChange={handleNewTaskChange}/>
                    </div>
                    <div>
                        <label>Data Sfarsire: </label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            value={newTask.end_time}
                            onChange={handleNewTaskChange}/>
                    </div>

                    <button onClick={handleCreateTask}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-medium w-fit">
                        Adauga Sarcina
                    </button>
                    <div>
                        <h2>Fisierele Incarcate</h2>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div
                className="flex flex-col bg-content1 m-1 border-3 rounded-medium hover:m-0.5 transition-all duration-300 p-2">
                {currentTask && (
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between text-2xl p-1">
                            <div className="flex items-center gap-2">
                                {currentTask.task_name}
                                {comments.length > 0 && files.length > 0 && (
                                    <AiOutlineCheckCircle className="text-green-500"/>
                                )}
                            </div>
                            <span className="text-medium">
                                Nume Proiect: {currentTask.project_name}
                            </span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="bg-content3 rounded-3xl border-1 gap-2 p-2 w-[80%]">
                                {currentTask.description}
                            </p>
                            <div className="flex flex-col items-end">
                                <div className="m-3">
                                    <span>Inceput: {formatDate(currentTask.start_time)}</span>
                                </div>
                                <div className="m-3">
                                    <span>Sfarsit: {formatDate(currentTask.end_time)}</span>
                                </div>
                                <div className="m-3">
                                    <span>Timp Ramas: {timeLeft}</span>
                                </div>
                            </div>
                        </div>
                        {isTaskEditable ? (
                            <div className="flex flex-row gap-3 justify-between">
                                <div className="flex w-[50%]">
                                    <CommentSection taskName={currentTask.task_name} userId={user.name} onCommentSubmit={handleCommentSubmit}/>
                                </div>
                                <div className="flex w-[50%]">
                                    <FileUpload taskName={currentTask.task_name} onFileUpload={handleFileUpload}
                                                userId={user.name}/>
                                </div>
                            </div>
                        ) : (
                            <p>Aceasta sarcina nu poate fi modificata. Termen expirat</p>
                        )}
                    </div>
                )}
            </div>
            <div
                className="flex flex-col bg-content1 m-1 border-3 rounded-medium hover:m-0.5 transition-all duration-300 p-2">
                <h2 className="text-2xl">Sarcini Incheiate</h2>
                {finishedTasks.map(task => (
                    <div key={task.task_name} className="flex flex-col gap-3 p-2 my-2 bg-content2 rounded-medium">
                        <div className="flex justify-between text-2xl p-1">
                            <div className="flex items-center gap-2">
                                {task.task_name}
                                {comments.length > 0 && files.length > 0 && (
                                    <AiOutlineCheckCircle className="text-green-500"/>
                                )}
                            </div>
                            <span className="text-medium">
                                    Nume Proiect: {task.project_name}
                                </span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="bg-content3 rounded-3xl border-1 gap-2 p-2 w-[80%]">{task.description}</p>
                            <div className="flex flex-col items-end">
                                <div className="m-3">
                                    <span>Inceput: {formatDate(task.start_time)}</span>
                                </div>
                                <div className="m-3">
                                    <span>Sfarsit: {formatDate(task.end_time)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProjectPage;
