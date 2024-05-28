'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
const supabase = createClient()


const SessionTable = () => {
    const [grades, setGrades] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [sessionData, setSessionData] = useState([{
        session_id: 0,
        grade: 0,
        attendance: '',
        student_name: '',
        team_name: '',
        project_name: '',
        activity_name: '',
        date: '',
    }])

    const fetchSessions = async () => {
        const { data, error } = await supabase
            .from('sessions')
            .select('*');
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
            <h1 className="flex text-2xl font-bold mb-4 justify-center">Tabela de Sesiuni</h1>
            <Table>
                <TableHeader>
                    {sessionData.map((column) =>
                        <TableColumn key={column.session_id}>{column.session_id}</TableColumn>
                    )}
                </TableHeader>
                <TableBody>
                    {sessionData.map((row) =>
                        <TableRow key={row.session_id}>
                            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default SessionTable;
