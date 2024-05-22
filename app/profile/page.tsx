"use client"
import React, {useEffect, useState} from 'react';
import styles from '@/app/profile/Profile.module.css';
import { createClient } from '@/utils/supabase/client';
import {Button, Input, user} from "@nextui-org/react";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };
   useEffect(() => {
       localStorage.setItem("user", JSON.stringify(user))
   }, [/*user*/] )
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const {name, email, password} = userData;
        const supabase = createClient();
        const {data, error} = await supabase
            .from('students')
            .update({name,email, password})
            .eq('name',name)
            .eq('email',email)
            .eq('password',password);

        if (error) {
            console.error('Error updating user:', error);
        } else {
            console.log('User updated successfully:', data);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h1>Editeaza Datele Personale:</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input label={"NUME:"} placeholder={"Nume Prenume"} name={userData.name} onInput={handleChange}/>
                    <Input label={"EMAIL:"} placeholder={"adressa@gmail.com"} name={userData.email} onInput={handleChange}/>
                    <Input label={"PAROLA:"} type="password" placeholder={"Parola"} name={userData.password} onInput={handleChange}/>
                    <Button type="button" onClick={() =>handleSubmit}> Salveaza Modificarile</Button>
                </form>
            </div>
            <div>

            </div>
        </div>
    );
}
export default Profile;