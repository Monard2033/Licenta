"use client"
import React, { useEffect, useState } from "react";
import {Spinner} from "@nextui-org/react";
import {fetchUser} from "@/utils/users";


const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        projects: [],
        tasks: [],
        comments: [],
        team: '',
        members: '',
    });
    const [team, setTeam] = useState<any>({ name: '' });
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const [membersData, setMembersData] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);


    const formatTime = (created_at: any) => {
        const date = new Date(created_at);
        return date.toLocaleTimeString([], {day:'2-digit', month:'2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'});
    }
    const fetchData = async () => {
        try {
            // @ts-ignore
            await fetchUser(setUser, setTeam, setProjects, setTasks, setComments, setMembersData);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    useEffect(() => {
        fetchData();
        setLoading(false)
    }, [user]);

    if (loading) {
        return(
            <main className="w-full flex items-center justify-center">
                <Spinner/>
            </main>
        )
    }
    return (
        <main className="mx-4 flex flex-col bg-content2 p-3 border-2 w-screen h-full">
            <div className="flex flex-row h-fit justify-between bg-content1 p-2 mb-4 border-3 rounded-medium">
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form id="info" className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Datele Tale:</span>
                        <span>Nume: {user?.name}</span>
                        <span>Email: {user?.email}</span>
                        <span></span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form id="team" className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Echipa Ta:</span>
                        <span>Numele Echipei: {team?.name}</span>
                        <span>ID-ul Echipei: {team?.team_id}</span>
                        <div className="flex space-x-1">
                            <span>Membrii Echipei:</span>
                            <div id="team-members" className="flex flex-row border-y-2 rounded-medium space-x-2">
                                {membersData.map((name, index) => (
                                    <span key={index} className="px-2 border-x-2 rounded-medium">{name}</span>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                <div
                    className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form id="projects" className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Proiectele Tale:</span>
                        {projects.map(project => (
                            <div key={project.id} className="flex flex-col my-2 gap-3">
                                <span>Nume Proiect: {project.name}</span>
                                <span>Descriere Proiect: {project.description}</span>
                                <span>Statut Proiect: {project.status}</span>
                                <span>Data Incepere Proiect: {formatTime(project.start_date)}</span>
                                <span>Data Finalizare Proiect: {formatTime(project.end_date)}</span>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
            <div className="w-full border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                <form id="tasks" className="flex flex-col gap-2">
                    <span className="flex justify-center border-3 rounded-2xl">Sarcinile Tale:</span>
                    {tasks.map(task => (
                        <div key={task.id} className="flex flex-col my-2">
                            <span>Nume Sarcina: {task.task_name}</span>
                            <span>Descriere Sarcina: {task.description}</span>
                            <span>Data Incepere Sarcinii: {formatTime(task.start_time)}</span>
                            <span>Data Finalizare Sarcinii: {formatTime(task.end_time)}</span>
                        </div>
                    ))}
                </form>
            </div>
            <div className="w-full border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                <form id="comments" className="flex flex-col gap-2">
                    <span className="flex justify-center border-3 rounded-2xl">Comentariile Tale:</span>
                    {comments.map((comment, index) => (
                        <div key={index} className="flex flex-col gap-2 my-2">
                            <span>Sarcina: {tasks.find(task => task.task_name === comment.task_name)?.task_name || 'N/A'}</span>
                            <span>Comentariu: {comment.content}</span>
                            <span>Data Comentariu: {formatTime(comment.created_at)}</span>
                        </div>
                    ))}
                </form>
            </div>
        </main>
    );
};

export default Profile;
