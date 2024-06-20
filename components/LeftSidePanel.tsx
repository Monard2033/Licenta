"use client"
import {usePathname} from "next/navigation";
import React from "react";
import { useRouter} from "next/navigation";
import Calendar from "@/components/Calendar";


const LeftSidePanel=()=> {
    const router = useRouter();

    const pathName = usePathname();
    if (pathName != "/login") {
        return <div className="flex flex-col rounded min-h-screen min-w-[330px] border-2">
            <div className="flex flex-col gap-4">
                <div
                    className="flex flex-col shadow-xl m-1 p-2 h-48 bg-content1 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Meniul Tau</h5>
                    </div>
                    <span className="flex flex-col gap-1">
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/profile")}>Profil</button>
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/sessions")}>Sesiuni</button>
                        <button className="flex justify-center bg-content2 hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/projects")}>Proiecte</button>
                    </span>
                </div>
                <div
                    className="flex flex-col shadow-xl m-1 p-2 bg-content1 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Calendarul Evenimentelor</h5>
                    </div>
                    <div className=" flex flex-col h-full w-full my-2 items-center justify-between">
                        <div className="">
                            <Calendar/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else
        return <></>
}
export default LeftSidePanel;