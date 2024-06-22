import {createClient} from "@/utils/supabase/client";
import React from "react";

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
    team: number;
    project_name: string;
    members: string[];
}
export interface TeamInterface {
    id: number;
    team_id: number;
    name: string;
}

export interface SessionInterface{
    session_id: number;
    student_name: string;
    team_name: string;
    project_name: number;
    grade: number;
    attendance: number;
    date: string;
    student_id: number;
}
export interface ProjectInterface{
    project_id: number;
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
}
export interface TaskInterface{
    id: number;
    project_name: string;
    task_name: string;
    description: string;
    start_time: string;
    end_time: string;
}
export interface MessageInterface{
    id: number;
    chat_id: number;
    author_id: number;
    content: string;
}
export interface CommentsInterface{
    task_name: string;
    user_name: string;
    content: string;
    created_at: string;
    updated_at: string;
}
export interface UserInfo {
    email: string | undefined;
    name: string;
    projects: any[];
    tasks: any[];
    comments: any[];
    team: any;
    members: string[];
}

const supabase = createClient()
export const fetchUsersData = async (userId: any) => {
    const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
    return {data, error}
};

export const fetchUsersTeam = async (teamId: any) => {
    const {data, error} = await supabase
        .from('teams')
        .select('*')
        .eq('team_id', teamId)
        .single();
    return {data, error}
};
export const fetchTeamMembers = async (teamId: any) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('team', teamId);
    return {data}
};

export const fetchUsersSessions = async (userId: any) => {
    const {data, error} = await supabase
        .from('sessions')
        .select('*')
        .eq('id', userId)
        .single();
    return {data, error}
};

export const fetchUsersProjects = async (projectId: any) => {
    const {data, error} = await supabase
        .from('projects')
        .select('*')
        .eq("name",projectId)
        .single();
    return {data, error}

};

export const deleteUsers = async (userId: any) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
    return {data, error}

};
export const fetchUsersComments = async (userId: string | undefined) => {
    const {data, error} = await supabase
        .from('comments')
        .select('*')
        .eq('user_name', userId);
    return {data, error}
};
export const fetchUserTasks = async (userId: string | undefined) => {
    const {data, error} = await supabase
        .from('tasks')
        .select('*')
        .eq('project_name', userId);
    return {data, error}
};

export const fetchUser = async (
    setUser: (value: {
        email: string | undefined;
        name: string;
        projects: any[];
        tasks: any[];
        comments: any[];
        team: string;
        members: string[];
    }) => void,
    setTeam: (arg0: any) => void,
    setProjects: (arg0: any[]) => void,
    setTasks: (arg0: any[]) => void,
    setComments: ((arg0: any[]) => void) | undefined,
    setMembersData: ((arg0: string[]) => void) | undefined
) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
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
                projects: [],
                tasks: [],
                comments: [],
                team: profile.team,
                members: profile.team,
            };

            const { data: team, error: teamError } = await supabase
                .from('teams')
                .select('*')
                .eq('team_id', profile.team)
                .single();

            if (teamError) {
                console.error('Error fetching team:', teamError);
                return;
            }
            userInfo.team = team;

            const { data: teamMembers, error: teamMembersError } = await supabase
                .from('users')
                .select('*')
                .eq('team', profile.team);

            if (teamMembersError) {
                console.error('Error fetching team members:', teamMembersError);
                return;
            }

            const names = teamMembers.map((member) => member.name);
            userInfo.members = names;

            const { data: projects, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .eq('name', profile.project_name);

            if (projectsError) {
                console.error('Error fetching projects:', projectsError);
                return;
            }
            // @ts-ignore
            userInfo.projects = projects;

            const projectNames = projects.map(project => project.name);
            const { data: tasks, error: tasksError } = await supabase
                .from('tasks')
                .select('*')
                .in('project_name', projectNames);

            if (tasksError) {
                console.error('Error fetching tasks:', tasksError);
                return;
            }
            // @ts-ignore
            userInfo.tasks = tasks;

            const taskNames = tasks.map(task => task.task_name);

            const { data: comments, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .in('task_name', taskNames)
                .eq('user_name',userInfo.name)

            if (commentsError) {
                console.error('Error fetching comments:', commentsError);
                return;
            }
            // @ts-ignore
            userInfo.comments = comments;

            setUser(userInfo);
            if (setProjects && setTasks) {
                setProjects(projects);
                setTasks(tasks);
            }
            if (setTeam) {
                setTeam(team);
            }
            if (setComments) {
                setComments(comments);
            }
            if (setMembersData) {
                setMembersData(names);
            }
            return userInfo;
        }
        return user;
    }
};
export const fetchMeetings = async () => {
        const { data, error } = await supabase
            .from('meetings')
            .select('*')
            .order('meeting_date', { ascending: false }); // Fetch meetings ordered by date in descending order
        if (error) {
            console.error('Error fetching meetings:', error);
            return [];
        }
        return data; // Return the fetched meetings data
};

export const startTimer = (endTime: Date, setTimer: React.Dispatch<React.SetStateAction<string>>) => {
    const updateTimer = () => {
        const now = new Date();
        const timeDifference = endTime.getTime() - now.getTime();

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimer(`${days} zile ${hours} ore ${minutes}m ${seconds}s`);
        }
    };

    updateTimer(); // Initial call to updateTimer

    const intervalId = setInterval(updateTimer, 1000);

    // Return a cleanup function to clear the interval
    return () => clearInterval(intervalId);
};


export const displayUserEmail = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error fetching authenticated user:', error.message);
        return null;
    }

    if (user) {
        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('name')
            .eq('email', user.email)
            .single();

        if (profileError) {
            console.error('Error fetching user profile:', profileError.message);
            return null;
        }

        if (profile) {
            return { email: user.email, name: profile.name };
        }
    }
    return null;
};
export const checkAdminRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user && user.email?.endsWith('@gmail.com')) {
        return true;
    } else {
        // @ts-ignore
        if (user && user.email?.endsWith('@student.upt.ro')) {
            return false;
        }
    }
    return null;
};
    