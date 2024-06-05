import {createClient} from "@/utils/supabase/client";
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
    task_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
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

export const fetchUsersProjects = async (userId: any) => {
    const {data, error} = await supabase
        .from('tasks')
        .select('*')
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
export const fetchUsersComments = async (userId: any) => {
    const {data, error} = await supabase
        .from('comments')
        .select('*, projects(id)')
        .eq('id', userId);
    return {data, error}
};
