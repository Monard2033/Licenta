// pages/dashboard.tsx
"use client"
import { useState } from 'react';
import styles from '@/app/dashboard/Dashboard.module.css'; // Import CSS module for styling


const Dashboard = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to update user data
        console.log('User data updated:', userData);
    };
    const userEmail = localStorage.getItem('userEmail');
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h1>Dashboard</h1>
                <span>Opinca Mihail</span>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Name:</label>
                        <input type="text" placeholder={"Change Your Name"} name="name" value={userData.name}
                               onChange={handleChange}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input type="email" placeholder={"Change Your Email"} name="email" value={userData.email}
                               onChange={handleChange}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input type="password" placeholder={"Change Your Password"} name="password"
                               value={userData.password} onChange={handleChange}/>
                    </div>
                    <button type="submit" className={styles.submitButton}>Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
