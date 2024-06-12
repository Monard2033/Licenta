"use client"
import { createClient } from "@/utils/supabase/client";
import {redirect} from "next/navigation";
import React, {useEffect, useState} from "react";
import DataTable from "@/components/DataTable";
import {checkAdminRole} from "@/utils/users";
import {Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import Image from "next/image"

export default function Index() {

    const supabase = createClient()
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const fetchUser = async () => {
            const {data: {user}, error} = await supabase.auth.getUser();

            if (error || !user) {
                redirect('/login');
            }

            const isAdmin = await checkAdminRole();
            // @ts-ignore
            setIsAdmin(isAdmin);
            setLoading(false);
        };

        fetchUser();
    }, [isAdmin]);

    if (loading) {
        return (
            <main className="w-full flex items-center justify-center">
                <Spinner/>
            </main>
        )
    }
    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 w-screen h-[110vh]">
            {isAdmin && (
                <div className=" p-1 shadow-xl bg-content1 m-2 border-3 rounded-medium hover:m-1 transition-all duration-300">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">
                            Lista Studentilor Inregistrati la Practica de Vara
                        </h5>
                    </div>
                    <DataTable/>
                </div>
            )}
            <div className="flex flex-col p-2 min-h-fit h-fit shadow-xl bg-content1 m-2 border-3 rounded-medium hover:mx-1 transition-all duration-300">
                <div className="bg-blue-500 my-1 w-full h-12 rounded-medium text-xl text-white">
                    <h5 className="flex items-center mx-2 h-full">
                        Pagini Accesibile Pentru Student
                    </h5>
                </div>
                <div className="flex flex-row w-full h-full items-center justify-evenly mt-2">
                    <div id="SessiuniTile" className="w-[25%] h-full shadow-xl bg-content1 border-3 rounded-medium flex flex-col">
                        <div className="h-[80%] rounded-medium">
                            <a href="/main/sessions" className="flex items-center justify-center h-full">
                                <Image alt={"Sesiuni"} className="w-full rounded-medium h-full object-cover" src={"/main/TileImage.png"} width={512} height={512}/>
                            </a>
                        </div>
                        <div className="flex items-center justify-around h-[25%] border-2 rounded-medium mt-auto">
                            <button className="text-blue-600 hover:text-blue-800" onClick={e => router.push("/sessions")}>Sesiuni</button>
                        </div>
                    </div>
                    <div id="ProiecteTile" className="w-[25%] h-full shadow-xl bg-content1 border-3 rounded-medium flex flex-col">
                        <div className="h-[80%] rounded-medium">
                            <a href="/main/projects" className="flex items-center justify-center h-full">
                                <Image alt={"Proiecte"} className="w-full h-full rounded-medium object-cover" priority={false} src={"/main/TileImage2.png"} width={512} height={512}/>
                            </a>
                        </div>
                        <div className="flex items-center justify-around h-[25%] bg-content1 border-2 rounded-medium mt-auto">
                            <button className="text-blue-600 hover:text-blue-800" onClick={e => router.push("/projects")}>Proiecte</button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}