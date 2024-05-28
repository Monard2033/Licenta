"use client"
import React, {useEffect, useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    fetchUserData,
    fetchUserSessions,
    fetchUserTeam,
    SessionInterface,
    TeamInterface,
    UserInterface
} from "@/utils/users";

const Profile = () => {

    const [user, setUser] = useState<UserInterface>();
    const [team, setTeam] = useState<TeamInterface>();
    const [session, setSession] = useState<SessionInterface>();

    const supabase = createClient();
    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen ">
            <div
                className="flex flex-row h-full gap-2 justify-between bg-content1 m-2 border-3 rounded-medium hover:my-1 hover:mx-1 transition-all duration-300 ">
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 bg-content1">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center">Datele Utilizatorului:</span>
                        <span>Nume Student: {user?.name}</span>
                        <span>Email Student: {user?.email}</span>
                        <span>Tip: {user?.role}</span>
                        <span>Echipa Studentului: {user?.team}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium p-3 h-fit bg-content1">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center">Echipa Utilizatorului:</span>
                        <span>Numele Echipei: {team?.name}</span>
                        <span>ID-ul Echipei: {team?.team_id}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium p-3 h-fit bg-content1">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center"> Sesiunile Utilizatorului:</span>
                        <span>Nume Student: {session?.student_name}</span>
                        <span>Nume Proiect: {session?.project_name}</span>
                        <span>Note Student: {session?.grade}</span>
                        <span>Numar Prezente: {session?.attendance}</span>
                    </form>
                </div>
            </div>
        </main>
    );
}
export default Profile;
