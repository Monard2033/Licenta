"use client"
import SessionTable from "@/components/SessionTable";
import { createClient } from "@/utils/supabase/client";
import {Button, Input, Spinner} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {checkAdminRole} from "@/utils/users";
const supabase = createClient();

const Sessions = () => {
    const [meetingCode, setMeetingCode] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetings, setMeetings] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [zoomLink, setZoomLink] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [timer, setTimer] = useState<string>('');

    const fetchMeetings = async () => {
        const { data, error } = await supabase
            .from('meetings')
            .select('*')
            .order('meeting_date', { ascending: false }); // Fetch meetings ordered by date in descending order
        if (error) {
            console.error(error);
            return [];
        }
        const isAdmin = await checkAdminRole();
        // @ts-ignore
        setIsAdmin(isAdmin);
        setMeetings(data);
        setLoading(false);
        if (data.length > 0) {
            const meetingDate = new Date(Date.parse(data[0].meeting_date));
            setZoomLink(data[0].zoom_link);
            startTimer(meetingDate);
        }
    };

    const formatTime = (created_at: any) => {
        const date = new Date(created_at);
        return date.toLocaleTimeString(["ro-RO"], {day:"2-digit",month:"2-digit", year:"numeric"});
    }

    const handleAddMeeting = async () => {
        if (!meetingCode || !meetingName || !meetingDate || !zoomLink) {
            alert("Toate câmpurile sunt obligatorii!");
            return;
        }

        const {data, error} = await supabase
            .from('meetings')
            .insert([{meet_code: meetingCode, name: meetingName, meeting_date: new Date(meetingName).toISOString(), zoom_link: zoomLink}]);

        if (error) {
            console.error('Error adding session:', error);
            alert('A aparut o eroare');
        } else {
            alert('Sesiunea a fost creată cu succes!');
            setMeetingCode('')
            setMeetingName('');
            setMeetingDate('');
            setZoomLink('');
        }
    }

    const startTimer = (endTime: Date) => {
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
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    };
    useEffect(() => {
        fetchMeetings();

    }, []);

    if (loading) {
        return (
            <main className="w-full flex items-start justify-center">
                <Spinner/>
            </main>
        )
    }

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 gap-3 h-full w-screen">
            {isAdmin && (
                <div className="bg-content1 m-2 p-2 border-3 h-fit rounded-medium hover:m-1 transition-all duration-300">
                    <h2 className="text-xl font-bold mb-2">Adaugă o Sesiune Nouă</h2>
                    <form className="grid gap-4">
                        <Input
                            isClearable
                            label="Cod Intalnire"
                            placeholder="S******"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                        />
                        <Input
                            isClearable
                            label="Nume Sesiune"
                            placeholder="Sesiunea 1,2,3,4"
                            value={meetingName}
                            onChange={(e) => setMeetingName(e.target.value)}
                        />
                        <Input
                            isClearable
                            type="date"
                            label="Data Sesiunii"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                        />
                        <Input
                            isClearable
                            label="Zoom Link"
                            placeholder="Introduceti linkul de Zoom"
                            onChange={(e) => setZoomLink(e.target.value)}
                        />
                        <Button onPress={handleAddMeeting} className="w-fit" color="primary">Adaugă Sesiune</Button>
                    </form>
                </div>
            )}
            <div className="bg-content1 m-2 border-3 h-fit rounded-medium hover:m-1 transition-all duration-300">
                <div className="mb-4">
                    {meetings.length > 0 && (
                        <div className="flex flex-col items-end p-2 text-large">
                            <p>Urmatoarea Sesiune: {formatTime(meetings[0].meeting_date)}</p>
                            <p>Timp ramas pana la urmatoarea sesiune: {timer}</p>
                            <a href={zoomLink} target="_blank" rel="noopener noreferrer" className="flex text-blue-500 w-fit underline gap-2">
                                Link Zoom
                            </a>
                        </div>
                    )}
                </div>
                <h1 className="flex text-2xl font-bold mb-4 justify-center">Tabela de Sesiuni</h1>
                <SessionTable/>
            </div>
        </main>
    );
};

export default Sessions;