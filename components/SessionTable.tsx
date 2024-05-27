'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient()


const SessionTable = () => {
    const [grades, setGrades] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [sessionData, setSessionData] = useState([{
        id: 0,
        grade: 0,
        attendance: '',
        student_name: '',
        activity_name: '',
        date: '',
    }])

    const fetchSessions = async () => {
        const { data, error } = await supabase
            .from('sessions')
            .select('*, users(id), projects(id)');
        if (error) console.log(error);
        return data;
    };


    const updateSession = async (sessionId: number, grade: any, isAttended: any) => {
        const { data } = await supabase
            .from('sessions')
            .update(sessionData)
    };

    useEffect(() => {
        const getSessions = async () => {
            const sessionsData = await fetchSessions();
            setSessionData(sessionsData || []);
        };
        getSessions();
    }, []);

    const handleSubmit1 = async () => {
        const { data,error } = await supabase
            .from('users')
            .insert(sessionData)
        if(!error)
        {
            alert("Adaugat")
            //updateUsers()
        }
    };

    const handleSubmit = (sessionId: number) => {
        const grade = grades[sessionId];
        const isAttended = attendance[sessionId];
        updateSession(sessionId, grade, isAttended);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tabela de Sesiuni</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Sesiunea</th>
                    <th className="py-2 px-4 border-b">Data</th>
                    <th className="py-2 px-4 border-b">Nota</th>
                    <th className="py-2 px-4 border-b">Prezenta</th>
                    <th className="py-2 px-4 border-b">Actiuni</th>
                </tr>
                </thead>
                <tbody>
                {sessionData.map(session => (
                    <tr key={session.id}>
                        <td className="py-2 px-4 border-b">{session.id}</td>
                        <td className="py-2 px-4 border-b">{session.date}</td>
                        <td className="py-2 px-4 border-b">
                            <input
                                type="number"
                                value={grades[session.id] || ''}
                                onChange={(e)=>{
                                    setGrades((prev)=>{
                                        return {
                                            ...prev,
                                            grade:e.target.value
                                        }
                                    })
                                }}
                                className="border px-2 py-1"
                            />
                        </td>
                        <td className="py-2 px-4 border-b">
                            <input
                                type="checkbox"
                                checked={attendance[session.id] || false}
                                onChange={(e)=>{
                                    setAttendance((prev)=>{
                                        return {
                                            ...prev,
                                            attendance:e.target.checked
                                        }
                                    })
                                }}
                                className="border px-2 py-1"
                            />
                        </td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => handleSubmit(session.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SessionTable;
