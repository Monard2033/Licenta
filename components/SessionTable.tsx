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


const supabase = createClient();

const SessionTable = () => {
    const [sessionData, setSessionData] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [editValue, setEditValue] = useState('');
    const fetchSessionData = async (sessionId: number) => {
        const { data, error } = await supabase
            .from('sessions')  // Assuming 'users' is the table where session data is stored
            .select('*')
            .eq('session_id', sessionId);
        if (error) {
            console.error(error);
            return [];
        }
        return data;
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
        const getSessionData = async () => {
            const data = await fetchSessionData(selectedTab);
            setSessionData(data);
        };
        getSessionData();
    }, [selectedTab]);

    const handleTabChange = (key: any) => {
        setSelectedTab(parseInt(key));
    };

    const handleDoubleClick = (rowIndex:any, columnKey:any) => {
        if (['grade', 'attendance', 'date'].includes(columnKey)) {
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

    return (
        <div className="p-4">
            <h1 className="flex text-2xl font-bold mb-4 justify-center">Tabela de Sesiuni</h1>
            <Tabs
                aria-label="Options"
                selectedKey={String(selectedTab)}
                onSelectionChange={handleTabChange}
            >
                <Tab key="1" title="Session 1">
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
                                                            {['grade', 'attendance', 'date'].includes(column.uid) && (
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
                <Tab key="2" title="Session 2">
                    <Card>
                        <CardBody>
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
                                                            {['grade', 'attendance', 'date'].includes(column.uid) && (
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
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="3" title="Session 3">
                    <Card>
                        <CardBody>
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
                                                            {['grade', 'attendance', 'date'].includes(column.uid) && (
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
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default SessionTable;
