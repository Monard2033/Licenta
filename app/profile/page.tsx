"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const Profile = (params: any) => {
    const [user, setUser] = useState<any>({});
    const [team, setTeam] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);

    const supabase = createClient();

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Fetch user profile
            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('name, team_id')
                .eq('email', user.email)
                .single();

            if (profileError) {
                console.error('Error fetching user profile:', profileError);
                return;
            }

            if (profile) {
                const userInfo = {
                    email: user.email,
                    name: profile.name,
                    teamId: profile.team_id,
                    projects: [],
                    tasks: [],
                    sessions: [],
                    team: []

                };

                // Fetch team information
                const { data: team, error: teamError } = await supabase
                    .from('teams')
                    .select('*')
                    .eq('id', profile.team_id)
                    .single();

                if (teamError) {
                    console.error('Error fetching team:', teamError);
                    return;
                }

                userInfo.team = team;

                // Fetch projects associated with the team
                const { data: projects, error: projectsError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('team_id', profile.team_id);

                if (projectsError) {
                    console.error('Error fetching projects:', projectsError);
                    return;
                }

                userInfo.projects = projects;

                // Fetch tasks associated with the projects
                const projectIds = projects.map(project => project.id);
                const { data: tasks, error: tasksError } = await supabase
                    .from('tasks')
                    .select('*')
                    .in('project_id', projectIds);

                if (tasksError) {
                    console.error('Error fetching tasks:', tasksError);
                    return;
                }

                userInfo.tasks = tasks;

                // Fetch sessions associated with the user
                const { data: sessions, error: sessionsError } = await supabase
                    .from('sessions')
                    .select('*')
                    .eq('user_id', user.id);

                if (sessionsError) {
                    console.error('Error fetching sessions:', sessionsError);
                    return;
                }

                userInfo.sessions = sessions;

                // Set the combined user information
                setUser(userInfo);
                setTeam(team);
                setProjects(projects);
                setTasks(tasks);
                setSessions(sessions);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <main className="mx-4 flex flex-col bg-content2 p-3 border-2 justify-between w-screen">
            <div className="flex flex-row h-fit justify-between bg-content2 p-2 m-2 border-3 rounded-medium">
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Datele Tale:</span>
                        <span>Nume: {user?.name}</span>
                        <span>Email: {user?.email}</span>
                        <span>Tip: {user?.role}</span>
                        <span>Echipa Ta: {user?.team?.name}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Echipa Ta:</span>
                        <span>Numele Echipei: {team?.name}</span>
                        <span>ID-ul Echipei: {team?.id}</span>
                    </form>
                </div>
                <div className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <form className="flex flex-col gap-2">
                        <span className="flex justify-center border-3 rounded-2xl">Proiectele Tale:</span>
                        {projects.map(project => (
                            <div key={project.id} className="my-2">
                                <span>Nume Proiect: {project.name}</span>
                                <span>Descriere Proiect: {project.description}</span>
                                <span>Statut Proiect: {project.status}</span>
                                <span>Data Incepere Proiect: {new Date(project.start_date).toLocaleDateString()}</span>
                                <span>Data Finalizare Proiect: {new Date(project.end_date).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </main>
    );
}
export default Profile;
