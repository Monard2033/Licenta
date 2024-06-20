"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {Button, Input, Spinner} from '@nextui-org/react';
import {useRouter} from "next/navigation";

const supabase = createClient();

const Settings = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    // Check if it's the user's own profile
    async function checkOwnProfile() {
        const {data: {user}, error} = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user profile:', error.message);
            return null;
        }
        if (user?.email) {
            setIsOwnProfile(true);
            return user.email;
        }
        return null;
    }

    // Fetch the user data
    const fetchUserData = async (email: string) => {
        setUserData({...userData, email});
        setLoading(false);
    };

    // Handle form submission to update user credentials
    const handleSubmit = async () => {
        try {
            const { data: { user }, error } = await supabase.auth.updateUser({
                email: userData.email,
                password: userData.password
            });

            if (error) {
                alert('Error updating credentials');
            } else {
                alert('Credentials updated successfully');
                if (userData.email !== user?.email) {
                    // Redirect to login page if the email was changed
                    router.push('/login');
                }
            }
        } catch (error) {
            alert('Error updating credentials');
        }
    };
    // Effect to initialize data on component mount
    useEffect(() => {
        const initialize = async () => {
            const email = await checkOwnProfile();
            if (email) {
                await fetchUserData(email);
            }
        };
        initialize();
    }, []);

    if (loading) {
        return (
            <main className="w-full flex items-center justify-center">
                <Spinner/>
            </main>
        )
    }

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen h-screen">
            <div className="flex flex-row h-fit justify-between bg-content1 p-2 mb-4 border-3 rounded-medium">
                <div
                    className="w-[30%] border-3 rounded-medium h-fit p-3 shadow-2xl bg-content1 hover:m-0.5 transition-all duration-300">
                    <h1>Editeaza Datele Personale:</h1>
                    <form onSubmit={handleSubmit} className="grid gap-3">
                        <Input
                            isReadOnly
                            isDisabled
                            label="Email:"
                            placeholder="email@example.com"
                            value={userData.email}
                            onChange={(e) => {
                                setUserData((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }));
                            }}
                        />
                        {isOwnProfile && (
                            <Input
                                label="Parola:"
                                type="password"
                                placeholder="Parola"
                                value={userData.password}
                                onChange={(e) => {
                                    setUserData((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }));
                                }}
                            />
                        )}
                        {isOwnProfile && (
                            <Button type="button" onClick={handleSubmit}>
                                Salveaza Modificarile
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Settings;
