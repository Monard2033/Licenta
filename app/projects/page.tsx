'use client'
import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import CommentSection from '@/components/CommentSection';
import { createClient } from '@/utils/supabase/client';
import {checkAdminRole, ProjectInterface, TaskInterface} from '@/utils/users';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Spinner } from "@nextui-org/react";

const supabase = createClient();

const ProjectPage = ({ params }: { params: any }) => {
    const [comments, setComments] = useState<string[]>([]);
    const [commentsFetched, setCommentsFetched] = useState(false);
    const [filesFetched, setFilesFetched] = useState(false);
    const [commentsLength, setCommentsLength] = useState(0);
    const [showCheckCircle, setShowCheckCircle] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [files, setFiles] = useState<string[]>([]);
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
        fetchTasks();
        fetchProjects();
        fetchUser();
        fetchFiles()
        setLoading(false)
    }, [projectId]);


    useEffect(() => {
        if (currentTask) {
            fetchTaskDetails(currentTask.task_name);
            const interval = setInterval(() => {
                updateTimeLeft();
            }, 1000);
            setCommentsFetched(true);
            setFilesFetched(true);
            return () => clearInterval(interval);
        }
        fetchComments()
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
            const isAdmin = await checkAdminRole();
            // @ts-ignore
            setIsAdmin(isAdmin);
        }
    }
    const updateShowCheckCircle = (filesFetched: boolean, commentsFetched: boolean) => {
        setShowCheckCircle(filesFetched || commentsFetched);
    }

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
        }
    };
    const fetchFiles = async () => {
        const { data, error } = await supabase
            .from('storage.objects')
            .select('name')
            .eq('bucket_id', user.name); // Adjust the condition based on your schema

        if (error) {
            console.error('Error fetching files:', error.message);
        } else {
            // @ts-ignore
            const filesList = data.map(file => file.name);
            setFiles(filesList);
            setFilesFetched(true);
            updateShowCheckCircle(true, commentsFetched);
        }
    };

    const fetchComments = async () => {
        if (!currentTask) return;

        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('user_name', user.name)
            .eq('task_name', currentTask.task_name);

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
            setCommentsLength(data.length);
            setCommentsFetched(data.length > 0);
            updateShowCheckCircle(true, commentsFetched);
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
        const { data } = await supabase
            .from('tasks')
            .select('*')
            .eq('task_name', taskName);
        return data;
    }


    const updateTimeLeft = () => {
        if (!currentTask) return;
        const endTime = new Date(currentTask.end_time);
        const now = new Date();
        const timeDifference = endTime.getTime() - now.getTime();

        if (timeDifference > 0) {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimeLeft(`${hours} ore ${minutes}m ${seconds}s`);
        } else {
            setTimeLeft('Time is up!');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    };

    const handleNewTaskChange = (e: any) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };


    const handleCreateTask = async () => {
        if (
            newTask.task_name === '' ||
            newTask.description === '' ||
            newTask.start_time === '' ||
            newTask.end_time === ''
        ) {

            alert('Completați toate câmpurile');
            return;
        }
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


    const finishedTasks = tasks.filter(task => new Date(task.end_time) < new Date());

    if (loading) {
        return (
            <main className="w-full flex items-start justify-center">
                <Spinner />
            </main>
        )
    }

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 gap-3 w-screen h-full">
            {isAdmin && (
                <div
                    className="flex flex-col admin-panel p-2 m-1 gap-3 bg-content1 border-3 rounded-medium hover:m-0.5 transition-all">
                    <h2 className="bg-content3 rounded-medium text-3xl w-fit p-1">Panoul Mentorului</h2>
                    <h2 className="bg-content3 rounded-medium w-fit p-1 ml-1">Adauga o Sarcina Noua</h2>
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
                </div>
            )}
            <div
                className="w-full border-3 m-1 rounded-medium h-fit p-3 shadow-xl bg-content1 hover:m-0.5 transition-all">
                <h2 className="text-2xl">Proiect Curent: </h2>
                <form id="projects" className="flex flex-col gap-2">
                    {projects.map(project => (
                        <div key={project.name} className="flex flex-col my-2 gap-3">
                            <span>Nume Proiect: {project.name}</span>
                            <span className="bg-content3 rounded-3xl border-1 gap-2 p-2 w-[80%]">
                                {project.description}
                            </span>
                            <span>Statut Proiect: {project.status}</span>
                            <span>Data Incepere Proiect: {formatDate(project.start_date)}</span>
                            <span>Data Finalizare Proiect: {formatDate(project.end_date)}</span>
                        </div>
                    ))}
                </form>
            </div>
            <div
                className="flex flex-col bg-content1 m-1 border-3 max-h-fit rounded-medium hover:m-0.5 transition-all p-2">
                <h2 className="text-2xl">Sarcina Curenta: </h2>
                {currentTask && (
                    <div className="flex flex-col gap-3">
                            <div className="flex justify-between text-2xl p-1">
                                <div className="flex items-center gap-2">
                                    {currentTask.task_name}
                                    {showCheckCircle && (
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
                                <div className="flex flex-row gap-3 justify-around">
                                    <div className="flex w-[70%]">
                                        <CommentSection taskName={currentTask.task_name} userId={user.name} onCommentSubmit={fetchComments}/>
                                    </div>
                                    <div className="flex w-[30%]">
                                        <FileUpload taskName={currentTask.task_name} userId={user.name} onFileUpload={fetchFiles}/>
                                    </div>
                                </div>
                            ) : (
                                <p>Aceasta sarcina nu poate fi modificata. Termen expirat</p>
                            )}
                        </div>
                    )}
                </div>
                <div
                    className="flex flex-col bg-content1 m-1 border-3 rounded-medium hover:m-0.5 transition-all p-2">
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
