"use client"
import React, {useEffect, useState} from 'react';
import styles from '@/app/profile/Profile.module.css';
import { createClient } from '@/utils/supabase/client';
import {Button, Input} from "@nextui-org/react";


const Settings = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const supabase = createClient()
    const handleSubmit = async () => {

        const { data,error } = await supabase
            .from('users')
            .update(userData)
        if(!error)
        {
            alert("Modificat")
            handleSubmit()
        }
        else{
            alert("Eroare")
        }
    };
    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen h-screen">
            <div className=" bg-content1 m-2 border-3 rounded-medium hover:my-1 hover:mx-1 transition-all duration-300 ">
                <div className="w-[30%] border-3 rounded-medium bg-content1">
                    <h1>Editeaza Datele Personale:</h1>
                    <form onSubmit={handleSubmit} className="grid gap-3">
                        <Input label={"NUME:"} placeholder={"Nume Prenume"}  onChange={(e)=>{
                            setUserData((prev)=>{
                                return {
                                    ...prev,
                                    name:e.target.value
                                }
                            })
                        }}/>
                        <Input label={"EMAIL:"} placeholder={"adresa@student.upt.ro"}  onChange={(e)=>{
                            setUserData((prev)=>{
                                return {
                                    ...prev,
                                    email:e.target.value
                                }
                            })
                        }}/>
                        <Input label={"PAROLA:"} type="password" placeholder={"Parola"}  onChange={(e)=>{
                            setUserData((prev)=>{
                                return {
                                    ...prev,
                                    password:e.target.value
                                }
                            })
                        }}/>
                        <Button type="button" onClick={handleSubmit}> Salveaza Modificarile</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
export default Settings;
