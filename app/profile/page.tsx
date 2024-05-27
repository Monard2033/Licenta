"use client"
import React, {useEffect, useState} from 'react';

import { createClient } from '@/utils/supabase/client';
import {Button, Input} from "@nextui-org/react";


const Profile = () => {
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
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen">
        <div className="flex flex-col bg-content1 m-2 border-3 rounded-medium hover:my-1 hover:mx-1 transition-all duration-300 ">
            <div className="w-[30%] border-3 rounded-medium bg-content1">

            </div>
        </div>
        </main>
    );
}
export default Profile;
