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
    ProjectInterface,
} from "@/utils/users";

const UserProfile = (params : any) => {
    const [user, setUser] = useState<UserInterface>();
    const [team, setTeam] = useState<TeamInterface>();
    const [membersData, setMembersData] = useState<string[]>([]);
    const [session, setSession] = useState<SessionInterface>();
    const [project, setProject] = useState<ProjectInterface>();

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
            console.log(user)
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
        const {data ,error} = await fetchUsersProjects(params.params.id);
        if(error) {
            return console.log(data)
        }
        setProject(data);
    }
    useEffect(() => {
        User();
        Project();

    }, [])
    useEffect(() => {
        if(user && user.team) {
            Team();
            Session();
            Members();
        }
    }, [user])
    if(user) {
        return (
            <main className="mx-4 flex flex-col bg-content2 p-1 border-2 justify-between w-screen">
                <div
                    className="flex flex-row h-fit justify-between bg-content2 p-3 m-2 border-3 rounded-medium">
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
                    <div
                        className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                        <form className="flex flex-col gap-3">
                            <span className="flex justify-center">Proiectele Utilizatorului:</span>
                            <span>Nume Proiect: {project?.project_name}</span>
                            <span>Descriere Proiect: {project?.description}</span>
                            <span>Statut Proiect: {project?.status}</span>
                            <span>Data Incepere Proiect: {project?.start_date}</span>
                            <span>Data Finalizare Proiect: {project?.end_date}</span>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
};

export default UserProfile;
