
import {createClient} from "@/utils/supabase/client";
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
    team: number;
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

const supabase = createClient()
export const fetchUserData = async (userId: any) => {
    const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
    return {data, error}
};

export const fetchUserTeam = async (teamId: any) => {
    const {data, error} = await supabase
        .from('teams')
        .select('*')
        .eq('team_id', teamId)
        .single();
    return {data, error}
};

export const fetchUserSessions = async (userId: any) => {
    const {data, error} = await supabase
        .from('sessions')
        .select('*')
        .eq('student_id', userId)
        .single();
    return {data, error}
};

export const fetchUserProjects = async (userId: any) => {
    const {data, error} = await supabase
        .from('projects')
        .select('*')
        .eq('id', userId)
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
export const fetchUserComments = async (userId: any) => {
    const {data, error} = await supabase
        .from('comments')
        .select('*, projects(id)')
        .eq('id', userId);
    return {data, error}
};