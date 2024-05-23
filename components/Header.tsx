import React, {useState} from 'react';
import {usePathname} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
import {text} from "node:stream/consumers";

const Header = () => {
    const pathName = usePathname();
    const supabase = createClient()

    async function getUserEmail() {
        const {data: {user}} = await supabase.auth.getUser()
        console.log(user);
        return user?.email || null;
    }
        let text;
        switch (pathName) {
            case '/profile':
                text = "This is the Profile Page"
                break;
            case '/project':
                text = 'This is the Projects Page'
                break;
            default:
                text = "Tablou de Bord"

        }

    if (pathName != "/login") {
        return (
            <header className="py-1.5 px-1.5">
                <div className="rounded-3xl bg-blue-500 hover:mx-1 hover:my-2 h-36 px-10 transition-all duration-300 mx-4 size my-2 pt-4">
                    <div className="flex flex-col text-3xl font-semibold w-fit">
                        {text}
                    </div>
                </div>
            </header>
        );

    } else
        return <></>
};

export default Header;