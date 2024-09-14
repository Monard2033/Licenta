import React, { useState, useEffect } from "react";
import { today, getLocalTimeZone, } from "@internationalized/date";
import { fetchUser, } from "@/utils/users";
import Link from 'next/link';

const getDotColor = (endDate: string | number | Date) => {
    const daysLeft = (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (daysLeft <= 1) return 'bg-red-600';
    if (daysLeft <= 2) return 'bg-yellow-600';
    if (daysLeft <= 5) return 'bg-green-600';
    return 'bg-cyan-500';
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
        return date.toLocaleString(['ro-RO'], { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' });
    };
    return (
        <div className="p-4 border rounded shadow-md w-80">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{formattedDate}</h2>
            </div>
            <div>
                {userInfo && tasks
                    .sort((a, b) => a.task_name.localeCompare(b.task_name))
                    .map((task, index) => (
                    <div key={index} className="flex flex-row gap-6 items-center border-1 rounded justify-evenly mb-2 bg-content2">
                        <Link href={"/projects"} className="text-blue-500 min-w-fit">
                            {task.task_name}
                        </Link>
                        <span className={`w-5 h-5 rounded-[100%] ${getDotColor(task.end_time)}`}/>
                        <span className="flex flex-col items-start justify-evenly gap-1">
                            <p>De la: {formatDate(task.start_time)}</p>
                            <p>Pana la: {formatDate(task.end_time)}</p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniCalendar;
