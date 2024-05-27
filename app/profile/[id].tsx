import React from 'react';
import { useRouter } from 'next/router';
import ProfilePage from '@/components/ProfilePage';

const UserProfile = (props : number) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen">
        <div>
            {id && <ProfilePage userId={id} />}
        </div>
        </main>
    );
};

export default UserProfile;
