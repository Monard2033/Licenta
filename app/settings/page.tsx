"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button, Input } from '@nextui-org/react';

const supabase = createClient();

const Settings = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    // Check if it's the user's own profile
    async function checkOwnProfile() {
        const { data: { user }, error } = await supabase.auth.getUser();
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
        setUserData({ ...userData, email });
        setLoading(false);
    };

    // Handle form submission to update user credentials
    const handleSubmit = async () => {
        try {
            const { data: { user }, error } = await supabase.auth.updateUser({
                email: userData.email,
                password: userData.password
            });

            alert('Credentials updated successfully');
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
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <Input
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
                        label="Password:"
                        type="password"
                        placeholder="Password"
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
                        Save Changes
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Settings;
