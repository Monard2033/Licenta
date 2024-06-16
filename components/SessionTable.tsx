'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    Card,
    CardBody,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    Tab, Input, getKeyValue,
    Tooltip
} from "@nextui-org/react";
import { sessioncolumns} from "@/components/data";
import {checkAdminRole} from "@/utils/users";

const supabase = createClient();

const SessionTable = () => {
    const [sessionData, setSessionData] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [editValue, setEditValue] = useState('');
    const [userTeams, setUserTeams] = useState<string[]>([]);
    const [meetings, setMeetings] = useState<any[]>([]);

    useEffect(() => {
        const checkAdminRole = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error checking user role:', error);
                return;
            }
            // @ts-ignore
            const isAdmin = await checkAdminRole();
            // @ts-ignore
            setIsAdmin(isAdmin);

            const { data: teamData, error: teamError } = await supabase
                .from('users')
                .select('team')
                .eq('email', user?.email);
            if (teamError) {
                console.error('Error fetching team data:', teamError);
                return;
            }

            const teams = teamData.map((team: { team: string }) => team.team);
            setUserTeams(teams);
        };
        fetchMeetings();
        checkAdminRole();
    }, []);

    const fetchSessionData = async (sessionId: number) => {
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .eq('session_id', sessionId)

        if (error) {
            console.error(error);
            return [];
        }
        return data;
    };

    const fetchMeetings = async () => {
        const { data, error } = await supabase
            .from('meetings')
            .select('*');
        if (error) {
            console.error(error);
            return [];
        }
        setMeetings(data);
    };

    const updateSession = async (userId:any, updatedField: any) => {
        const { data, error } = await supabase
            .from('sessions')
            .update(updatedField)
            .eq('student_id', userId);
        if (error) console.log(error);
        return data;
    };

    useEffect(() => {
        if (userTeams) {
            const getSessionData = async () => {
                const data = await fetchSessionData(selectedTab);
                setSessionData(data);
            };
            getSessionData();
        }
    }, [selectedTab, userTeams]);

    const handleTabChange = (key: any) => {
        setSelectedTab(parseInt(key));
    };

    const handleDoubleClick = (rowIndex:any, columnKey:any) => {
        if (isAdmin && ['grade', 'attendance', 'date'].includes(columnKey)) {
            setEditingCell({ row: rowIndex, column: columnKey });
            setEditValue(sessionData[rowIndex][columnKey]);
        }
    };

    const handleBlur = async () => {
        const updatedData = [...sessionData];
        // @ts-ignore
        const updatedRow = { ...updatedData[editingCell.row], [editingCell.column]: editValue };
        // @ts-ignore
        updatedData[editingCell.row] = updatedRow;
        // @ts-ignore
        await updateSession(updatedRow.student_id, { [editingCell.column]: editValue });
        setSessionData(updatedData);
        setEditingCell({ row: null, column: null });
    };

    const handleKeyDown = async (e:any) => {
        if (e.key === 'Enter') {
            await handleBlur();
        }
    };
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    };


    return (
        <div className="p-4">
            <Tabs
                aria-label="Options"
                selectedKey={String(selectedTab)}
                onSelectionChange={handleTabChange}
            >
                {meetings.map((meeting, index) => (
                    <Tab key={index +1} title={meeting.name}>
                        <Card>
                            <CardBody>
                                <Tooltip content="Prin dublu click puteti modifica notele, prezenta si data">
                                    <Table
                                        isHeaderSticky
                                        classNames={{
                                            wrapper: "max-h-[382px]",
                                        }}
                                    >
                                        <TableHeader columns={sessioncolumns}>
                                            {(column) => (
                                                <TableColumn
                                                    key={column.uid}
                                                    align={column.uid === "actions" ? "center" : "start"}
                                                >
                                                    {column.name}
                                                </TableColumn>
                                            )}
                                        </TableHeader>
                                        <TableBody>
                                            {sessionData.map((row: any, rowIndex: React.Key | null | undefined) => (
                                                <TableRow key={rowIndex}>
                                                    {sessioncolumns.map((column) => (
                                                        <TableCell key={column.uid} onDoubleClick={() => handleDoubleClick(rowIndex, column.uid)}>
                                                            {editingCell.row === rowIndex && editingCell.column === column.uid ? (
                                                                <Input
                                                                    value={editValue}
                                                                    onChange={(e) => setEditValue(e.target.value)}
                                                                    onBlur={handleBlur}
                                                                    onKeyDown={handleKeyDown}
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <div>
                                                                    {getKeyValue(row, column.uid)}
                                                                    {isAdmin && ['grade', 'attendance', 'date'].includes(column.uid) && (
                                                                        <span style={{ marginLeft: 5, color: '#888' }}>(dbl-click pt edit)</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Tooltip>
                            </CardBody>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default SessionTable;
