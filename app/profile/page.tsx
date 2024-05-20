"use client"
import React, { useState } from 'react';
import styles from '@/app/profile/Dashboard.module.css';
import { createClient } from '@/utils/supabase/client';

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, email, password} = userData;
        const supabase = createClient();
        const {data, error} = await supabase
            .from('students')
            .update({email, password})
            .eq('name', name);

        if (error) {
            console.error('Error updating user:', error);
        } else {
            console.log('User updated successfully:', data);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h1>Dashboard</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Nume:</label>
                        <input type="text" placeholder={"Adaugati Un Nume"} name="name" value={userData.name}
                               onChange={handleChange}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input type="email" placeholder={"Modifica Email"} name="email" value={userData.email}
                               onChange={handleChange}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Parola:</label>
                        <input type="password" placeholder={"Schimba Parola"} name="password"
                               value={userData.password} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="bg-blue-700 py-[10px] px-5 border cursor-pointer transition rounded">Salveaza Modificarile</button>
                </form>
            </div>
        </div>
    );
}
export default Profile;