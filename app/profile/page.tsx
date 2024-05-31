"use client"
import React, {useEffect, useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    fetchUsersData, fetchUsersProjects,
    fetchUsersSessions,
    fetchUsersTeam,
} from "@/utils/users";
import {ProjectInterface , SessionInterface,
    TeamInterface,
    UserInterface} from "@/utils/users";


const Profile = (params: any) => {
    const [user, setUser] = useState<UserInterface>();
    const [team, setTeam] = useState<TeamInterface>();
    const [session, setSession] = useState<SessionInterface>();
    const [project, setProject] = useState<ProjectInterface>();

    async function User(){
        if(user) {
            const {data,error} = await fetchUsersData(user.name);
            if(error)
            {
                return console.log(data)
            }
            setUser(data);
        }
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
        const {data ,error} = await fetchUsersProjects(project?.name);
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
        }
        console.log(team)
    }, [user])


    const supabase = createClient();
    return (
        <main className="mx-4 flex flex-col bg-content2 p-3 border-2 justify-between w-screen">
            <div
                className="flex flex-row h-fit justify-between bg-content2 p-2 m-2 border-3 rounded-medium">
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Datele Tale:</span>
                        <span>Nume: {user?.name}</span>
                        <span>Email: {user?.email}</span>
                        <span>Tip: {user?.role}</span>
                        <span>Echipa Ta: {user?.team}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Echipa Ta:</span>
                        <span>Numele Echipei: {team?.name}</span>
                        <span>ID-ul Echipei: {team?.team_id}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Proiectele Tale:</span>
                        <span>Nume Proiect: {project?.name}</span>
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
export default Profile;
