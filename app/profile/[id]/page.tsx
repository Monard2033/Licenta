'use client'
import React, {useEffect, useState} from 'react';
import {
    fetchUsersData, fetchUsersProjects,
    fetchUsersSessions,
    fetchUsersTeam,
    fetchTeamMembers,
    SessionInterface,
    TeamInterface,
    UserInterface,
    ProjectInterface, fetchUsersComments, CommentsInterface, fetchUserTasks, TaskInterface,
} from "@/utils/users";
import {Spinner} from "@nextui-org/react";

const UserProfile = (params : any) => {
    const [user, setUser] = useState<UserInterface>();
    const [team, setTeam] = useState<TeamInterface>();
    const [loading, setLoading] = useState(true);
    const [membersData, setMembersData] = useState<string[]>([]);
    const [session, setSession] = useState<SessionInterface>();
    const [project, setProject] = useState<ProjectInterface>();
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [comments, setComments] = useState<CommentsInterface[]>([]);

    async function User(){
        const {data ,error} = await fetchUsersData(params.params.id);
        if(error) {
            return console.log(data)
        }
        setUser(data);
    }

    async function Team(){
        if(user) {
            const {data, error} = await fetchUsersTeam(user.team);
            if (error) {
                return console.log(data)
            }
            setTeam(data);
        }
    }

    async function Members(){
        try {
            const {data } = await fetchTeamMembers(user?.team)
            if (data) {
                const names: string[] = data.map((user: any) => user.name);
                setMembersData(names);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    async function Session(){
        if(user) {
            const {data, error} = await fetchUsersSessions(user.id);
            if (error) {
                return console.log(data)
            }
            setSession(data);
        }
    }

    async function Project(){
        const {data ,error} = await fetchUsersProjects(user?.project_name);
        if(error) {
            return console.log( data)
        }
        setProject(data);
    }

    async function Comments(){
        const {data ,error} = await fetchUsersComments(user?.name);
        if (data) {
            setComments(data);
        }
    }

    async function Tasks(){
        const {data ,error} = await fetchUserTasks(user?.project_name);
        if (data) {
            setTasks(data);
        }
    }

    const formatTime = (created_at: any) => {
        const date = new Date(created_at);
        return date.toLocaleTimeString([], {day:'2-digit', month:'2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'});
    }
    const isTaskCompleted = (task: TaskInterface) => {
        const endDate = new Date(task.end_time);
        const hasComment = comments.some(comment => comment.task_name === task.task_name);
        return endDate < new Date() && hasComment;
    }
    useEffect(() => {
        User();
        Comments();
        Tasks();
    }, []);

    useEffect(() => {
        if(user && user.team) {
            Team();
            Session();
            Project();
            Members();
            Comments();
            Tasks();
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return(
            <main className="w-full flex items-center justify-center">
                <Spinner/>
            </main>
        )
    }

    if(user) {
        return (
            <main className="mx-4 flex flex-col bg-content2 p-1 border-2 gap-3 w-screen">
                <div className="flex flex-row h-fit justify-between bg-content1 p-3 m-2 border-3 rounded-medium">
                    <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                        <form className="flex flex-col gap-2">
                            <span className="flex justify-center">Datele Utilizatorului:</span>
                            <span>Nume Student: {user?.name}</span>
                            <span>Email Student: {user?.email}</span>
                            <span>Tip: {user?.role}</span>
                            <span>Echipa Studentului: {user?.team}</span>
                            <span>Proiectul Studentului: {user?.project_name}</span>
                        </form>
                    </div>
                    <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                        <form className="flex flex-col gap-2">
                            <span className="flex justify-center">Echipa Utilizatorului:</span>
                            <span>ID-ul Echipei: {team?.team_id}</span>
                            <span>Numele Echipei: {team?.name}</span>
                            <div className="flex space-x-2">
                                <span>Membrii Echipei:</span>
                                <div className="flex flex-row border-y-2 rounded-medium space-x-2">
                                    {membersData.map((name, index) => (
                                        <span key={index} className="px-2 border-x-2 rounded-medium">{name}</span>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                        <form className="flex flex-col gap-3">
                            <span className="flex justify-center">Proiectele Utilizatorului:</span>
                            <span>Nume Proiect: {project?.name}</span>
                            <span>Descriere Proiect: {project?.description}</span>
                            <span>Statut Proiect: {project?.status}</span>
                            <span>Data Incepere Proiect: {formatTime(project?.start_date)}</span>
                            <span>Data Finalizare Proiect: {formatTime(project?.end_date)}</span>
                        </form>
                    </div>
                </div>
                <div className="w-full border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form id="comments" className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Comentariile Utilizatorului:</span>
                        {comments.map((comment, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <span>Sarcina: {tasks.find(task => task.task_name === comment.task_name)?.task_name || 'N/A'}</span>
                                <span>Comentariu: {comment.content}</span>
                                <span>Data Comentariu: {formatTime(comment.created_at)}</span>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="w-full border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form id="tasks" className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Sarcinile Realizate a Utilizatorului:</span>
                        {tasks.map(task => (
                            <div key={task.id} className="flex flex-col my-2">
                                <span>Nume Sarcina: {task.task_name}</span>
                                <span>Descriere Sarcina: {task.description}</span>
                                <span>Data Incepere Sarcinii: {formatTime(task.start_time)}</span>
                                <span>Data Finalizare Sarcinii: {formatTime(task.end_time)}</span>
                                <span>Status: {isTaskCompleted(task) ? 'Indeplinit' : 'Ne-Indeplinit'}</span>
                            </div>
                        ))}
                    </form>
                </div>
            </main>
        );
    }
};

export default UserProfile;
