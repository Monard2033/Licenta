"use client"
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import { useRouter} from "next/navigation";
import Calendar from "@/components/Calendar";
import {createClient} from "@/utils/supabase/client";
import {user} from "@nextui-org/theme";

const LeftSidePanel=()=> {
    const router = useRouter();
    const pathName = usePathname();
    const supabase = createClient();
    const [userName,setUserName] = useState<any[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    useEffect(() => {
        const fetchUser = async () => {
            const {data: {user}, error} = await supabase.auth.getUser();

            if (error || !user) {
                router.replace('/login');
            }
        };
        fetchUser()
    }, []);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('is_online', true);

                if (error) {
                    console.error('Error fetching online users:', error);
                } else {
                    setOnlineUsers(data);
                    setUserName(userName);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOnlineUsers();

        // Set up real-time subscription to get updates for online users
        const subscription = supabase
            .channel('realtime:public:users')
            .on(
                "postgres_changes",
                {event: "*", schema: "public", table: "users"},
                (payload) => {
                fetchOnlineUsers(); // Re-fetch when there's a change
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription); // Clean up subscription on component unmount
        };
    }, []);
    const updateUserActivity = async (userName: any[]) => {
        try {
            await supabase
                .from('users')
                .upsert([{
                    name: user.name,
                    is_online: true
                }]);
        } catch (error) {
            console.error('Error updating user activity:', error);
        }
    };


    if (pathName != "/login") {
        return <div className="flex flex-col bg-content2 rounded min-h-fit min-w-[330px] border-2">
            <div className="flex flex-col gap-4">
                <div
                    className="flex flex-col shadow-xl m-1 p-2 h-48 bg-content1 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Meniul Tau</h5>
                    </div>
                    <span className="flex flex-col gap-1">
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/profile")}>Profil</button>
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/sessions")}>Sesiuni</button>
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/projects")}>Proiecte</button>
                    </span>
                </div>
                <div
                    className="flex flex-col shadow-xl m-1 p-2 bg-content1 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Calendarul Evenimentelor</h5>
                    </div>
                    <div className=" flex flex-col h-full w-full my-2 items-center justify-between">
                            <Calendar/>
                    </div>
                    <div className=" flex flex-col h-full w-full my-2 items-center justify-between">
                        <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                            <h5 className="flex items-center mx-2 h-full">Utilizatori Online</h5>
                        </div>
                        <ul className="w-full gap-2 flex flex-col">
                            {onlineUsers.length > 0 ? (
                                onlineUsers.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)).map((user:any,index:any) => (
                                    <li className="gap-2 border-2 rounded-medium w-full p-2" key={`${user.name}-${user.team}-${index}`}>
                                       <a>{user.name} - Echipa {user.team}</a>
                                    </li>
                                ))
                            ) : (
                                <p>Nu exista utilizatori Online</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    } else
        return <></>
}
export default LeftSidePanel;