import React, { useState, useEffect } from "react";
import { today, getLocalTimeZone, } from "@internationalized/date";
import { fetchUser, } from "@/utils/users";
import Link from 'next/link';

const getDotColor = (endDate: string | number | Date) => {
    const daysLeft = (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (daysLeft <= 1) return 'bg-red-600';
    if (daysLeft <= 2) return 'bg-yellow-600';
    if (daysLeft <= 5) return 'bg-green-600';
    return 'bg-gray-500';
};

const MiniCalendar = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>();
    const [todayDate, setTodayDate] = useState(today(getLocalTimeZone()));
    const [meetings, setMeetings] = useState<any>([]);
    const [timer, setTimer] = useState<string>('');
    const currentDate = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // @ts-ignore
                const userInfo = await fetchUser(setUserInfo, setTasks);
                setUserInfo(userInfo)
                // @ts-ignore
                setTasks(userInfo?.tasks);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, []);

    const formattedDate = new Intl.DateTimeFormat('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(currentDate).toUpperCase();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString(['ro-RO'], { hour: 'numeric', minute: '2-digit', month: 'long', day: '2-digit' });
    };
    return (
        <div className="p-4 border rounded shadow-md w-80">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{formattedDate}</h2>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="flex items-center border-1 rounded justify-around mb-2 bg-content2">
                        <Link href={"/projects"} className="text-blue-500">
                            {task.task_name}
                        </Link>
                        <span className={`w-4 h-4 border-1 rounded-2xl ${getDotColor(task.end_time)} mr-3`}/>
                        <span className="flex flex-col items-center">
                            De la: {formatDate(task.start_time)}
                            <span/>
                           Pana la: {formatDate(task.end_time)}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                {meetings.length > 0 && (
                    <div className="flex flex-col items-end p-2 text-large">
                        <p>Urmatoarea Sesiune: {meetings[0].name}</p>
                        <p>Timp ramas pana la urmatoarea sesiune: {timer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiniCalendar;
