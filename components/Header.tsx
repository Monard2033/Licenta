"use client"
import React, {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {fetchUsersData, UserInterface} from "@/utils/users";
import Link from "next/link";

const Header = () => {
    const params = useParams()
    const router = useRouter()
    const pathName = usePathname()
    const supabase = createClient()
    const [title, setTitle] = useState <string>()
    const [breadcrumb, setBreadcrumb] = useState<{ label: string, href: string }[]>([]);
    const [users, setUsers] = useState<UserInterface>();
    const getPath = () => {
        if(pathName.startsWith("/profile/")) return "/profile-user"
        return pathName
    }
    useEffect(()=> {
        const currentPathname = getPath()
        const path = location.pathname;
        const pathSegments = path.split('/').filter(segment => segment !== '');
        const generateContent = async () => {
            switch (currentPathname) {
                case "/":
                    setTitle("Tablou de Bord")
                    break;
                case "/settings":
                    const { data: {user} } = await supabase.auth.getUser();
                    setTitle("Bun Venit " + user?.email);
                    break;
                case "/projects":
                    setTitle("Proiectele Tale")
                    break;
                case "/profile-user":
                    const { data, error } = await fetchUsersData(params.id);
                    if (data) {
                        setUsers(data);
                        setTitle(`Datele Utilizatorului: ${data.name}`);
                    } else {
                        setTitle('Datele Utilizatorului: Not Found');
                    }
                    break;
            }

            // Generate breadcrumb items based on path segments
            const breadcrumbItems = pathSegments.map((segment,index) => {
                let href = '/' + pathSegments.slice(0, index + 1).join('/');
                switch (segment) {
                    case 'main':
                        return { label: "Pagina Principala", href: "/" };
                    case "settings":
                        return { label: "Setarile Tale", href: "/settings" };
                    case "sessions":
                        return { label: "Sesiunile Tale", href: "/sessions" };
                    case "projects":
                        return { label: "Proiectele Tale", href: "/projects" };
                    case "profile":
                        return { label: "Profil", href: "/profile" };
                    default:
                        return { label: segment.charAt(0).toUpperCase() + segment.slice(1), href: href };
                }
            });
        setBreadcrumb(breadcrumbItems);
        };

        generateContent();
    },[router, pathName])
    if (pathName != "/login") {
        return (
            <header className="my-1.5 mx-1.5 p-0 m-0 border-0">
                <div
                    className="flex flex-col rounded-3xl border-3 bg-gradient-to-l bg-blue-600 m-2 dark:bg-blue-900 hover:mx-0.5 h-[150px] px-10 transition-all duration-300 size pt-4">
                    <div className="text-3xl text-blue-100 font-semibold w-fit" >
                        {title}
                    </div>
                    <div className="mt-14 w-fit">
                        <Breadcrumbs>
                            {breadcrumb.map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    <Link className="text-blue-100" href={item.href}>
                                        {item.label}
                                    </Link>
                                </BreadcrumbItem>
                            ))}
                        </Breadcrumbs>
                    </div>
                </div>
            </header>
        );

    } else
        return <></>
};
export default Header;