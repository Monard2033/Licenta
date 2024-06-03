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
    Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import {fetchUsers, sessioncolumns} from "@/components/data";
import {VerticalDotsIcon} from "@/components/ui/VerticalDotsIcon";
import {deleteUsers} from "@/utils/users";
import InsertData from "@/components/InsertData";
import EditData from "@/components/EditData";

const supabase = createClient();

const SessionTable = () => {
    const [sessionData, setSessionData] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState<number>();
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

    const updateSessions = async () => {
        setSessionData(await fetchUsers())
    }

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
    const renderCell = React.useCallback((user: {
        [x: string]: any;
        id: any;
    }, columnKey: string | number) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className=" flex justify-between items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" width={undefined}
                                                      height={undefined}/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={(e) => deleteUsers(user.id)}>
                                    Sterge
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="p-4">
            <h1 className="flex text-2xl font-bold mb-4 justify-center">Tabela de Sesiuni</h1>
            <EditData updateSessions={updateSessions}/>
            <Tabs
                aria-label="Options"
                selectedKey={String(selectedTab)}
                onSelectionChange={handleTabChange}
            >
                <Tab key="1" title="Session 1">
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
                                    {sessionData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {(columnKey) =>
                                                <TableCell>
                                                    {renderCell(row,columnKey)}
                                                </TableCell>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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
                                    {sessionData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {(columnKey) =>
                                                <TableCell>
                                                    {renderCell(row,columnKey)}
                                                </TableCell>
                                            }
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
                                    {sessionData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {(columnKey) =>
                                                <TableCell>
                                                    {renderCell(row,columnKey)}
                                                </TableCell>
                                            }
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
