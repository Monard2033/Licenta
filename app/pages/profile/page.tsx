"use client"
import React, { useState } from 'react';
import styles from '@/app/pages/profile/Dashboard.module.css'; // Import CSS module for styling
import { SubmitButton } from "./submit-button";
import { createClient } from '@/utils/supabase/client';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const UpdateUserForm: React.FC = () => {
        const [email, setEmail] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setUserData({...userData, [name]: value});
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const {name, email, password} = userData;
            const supabase = createClient();
            const {data, error} = await supabase
                .from('students')  // Replace 'students' with your table name
                .update({email, password})
                .eq('name', name); // Assuming you use 'name' as a unique identifier

            if (error) {
                console.error('Error updating user:', error);
            } else {
                console.log('User updated successfully:', data);
            }
        };
        const userEmail = localStorage.getItem('userEmail');
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
                        <SubmitButton type="submit" className={styles.submitButton}>Salveaza</SubmitButton>
                    </form>
                </div>
            </div>
        );
    };
}
export default Profile;