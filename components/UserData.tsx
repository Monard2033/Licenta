import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

const UserData = ({ userId }: { userId: number }) => {
    const [userData, setUserData] = useState(null);
    const [userTeam, setUserTeam] = useState(null);
    const [userSessions, setUserSessions] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [userFiles, setUserFiles] = useState([]);
    const supabase = createClient()
    useEffect(() => {
        fetchUserData(userId);
        fetchUserTeam(userId);
        fetchUserSessions(userId);
        fetchUserProjects(userId);
        fetchUserComments(userId);
    }, [userId]);

     const fetchUserData = async (userId) => {
        const {data, error} = await supabase
            .from('users')
            .select('* , teams ( team_id) ')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user data:', error);
        } else {
            setUserData(data);
        }
    };

     const fetchUserTeam = async (userId) => {
        const {data, error} = await supabase
            .from('teams')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user team:', error);
        } else {
            setUserTeam(data);
        }
    };

    const fetchUserSessions = async (userId) => {
        const {data, error} = await supabase
            .from('sessions')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user sessions:', error);
        } else {
            setUserSessions(data);
        }
    };

  const fetchUserProjects = async (userId) => {
        const {data, error} = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user projects:', error);
        } else {
            setUserProjects(data);
        }
    };

    const fetchUserComments = async (userId) => {
        const {data, error} = await supabase
            .from('comments')
            .select('*');

        if (error) {
            console.error('Error fetching user comments:', error);
        } else {
            setUserComments(data);
        }
    };
}
export default UserData;