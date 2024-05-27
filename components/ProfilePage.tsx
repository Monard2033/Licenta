import React, {useState, useEffect} from 'react';
import {createClient} from '@/utils/supabase/client';
import {Button, Input} from '@nextui-org/react';

const supabase = createClient();

interface ProfilePageProps {
    userId?: string | string[]
}

const ProfilePage = ({userId}: ProfilePageProps) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function isOwnProfile() {
        const {data: {user}} = await supabase.auth.getUser()
        return user?.email || null;
    }

    const fetchUserData = async () => {
        const {data, error} = await supabase
            .from('users')
            .select('*');

        if (error) {
            console.error('Error fetching user data:', error.message);
        } else {
            setUserData;
        }
    };

    const handleSubmit = async () => {
        const {data, error} = await supabase
            .from('users')
            .update(userData);

        if (!error) {
            alert('Modificat');
            fetchUserData();
        } else {
            alert('Eroare');
        }
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <Input
                    label="Nume:"
                    placeholder="Nume Prenume"
                    onChange={(e) => {
                        setUserData((prev) => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })
                    }}
                />
                <Input
                    label="Email:"
                    placeholder="email@example.com"
                    onChange={(e) => {
                        setUserData((prev) => {
                            return {
                                ...prev,
                                email: e.target.value
                            }
                        })
                    }}
                />
                {(!isOwnProfile && (
                    <Input
                        label="Parola:"
                        type="password"
                        placeholder="Parola"
                        onChange={(e) => {
                            setUserData((prev) => {
                                return {
                                    ...prev,
                                    password: e.target.value
                                }
                            })
                        }}
                    />
                ))}
                {(!isOwnProfile && (
                    <Button type="button" onClick={event => handleSubmit()}>
                        Salveaza Modificarile
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
