import React, {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

const Header = () => {
    const pathName = usePathname();
    const supabase = createClient()
  const [title, setTitle] = useState <string>()
    useEffect(()=> {
        switch(pathName)
        {
            case "/" : setTitle("Tablou de Bord")
                break
            case "/profile": (async () => {
                const { data: { user } } = await supabase.auth.getUser()
                setTitle("Bun Venit: " + user?.email)
            })()
                break

        }
    },[pathName])
    if (pathName != "/login") {
        return (
            <header className="my-1.5 mx-1.5">
                <div className=" flex flex-col rounded-3xl border-3 bg-blue-500 hover:mx-0.5 h-[150px] px-10 transition-all duration-300 mx-2 size my-2 pt-4">
                    <div className="text-3xl font-semibold w-fit">
                        {title}
                    </div>
                    <div className="mt-14 w-fit">
                        <Breadcrumbs>
                            <BreadcrumbItem>Home</BreadcrumbItem>
                            <BreadcrumbItem>Music</BreadcrumbItem>
                            <BreadcrumbItem>Artist</BreadcrumbItem>
                            <BreadcrumbItem>Album</BreadcrumbItem>
                            <BreadcrumbItem>Song</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </header>
        );

    } else
        return <></>
};

export default Header;