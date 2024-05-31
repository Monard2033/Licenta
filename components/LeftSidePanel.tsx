
import {usePathname} from "next/navigation";
import React from "react";
import { useRouter} from "next/navigation";
import Calendar from "@/components/Calendar";


const LeftSidePanel=()=>{
    const router = useRouter();

    const pathName = usePathname();
    if(pathName != "/login")
    {
        return <div className="flex flex-col rounded min-h-full min-w-[330px] border-2">
            <div className="flex flex-col">
                <div
                    className="flex flex-col shadow-xl m-1 p-2 h-48 bg-content1 hover:m-0.5 transition-all duration-300 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Meniul Tau</h5>
                    </div>
                    <span className="flex flex-col gap-1">
                        <button className="flex justify-center hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/profile")}>Profil</button>
                        <button className="flex justify-center hover:text-blue-800 border-1 p-1 rounded-3xl"
                                onClick={e => router.push("/sessions")}>Sesiuni</button>
                        <button className="flex justify-center hover:text-blue-800 border-1 p-1 rounded-3xl"
                            onClick={e => router.push("/projects")}>Proiecte</button>
                    </span>
                </div>
                <div
                    className="flex flex-col shadow-xl p-2 border-3 justify-between hover:my-3 hover:mx-0 transition-all duration-300 m-0.5 mt-4 bg-content1 rounded-medium">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Navigare</h5>
                    </div>
                    <div className=" my-8 mx-2 flex flex-col h-full items-center justify-between">
                        <div className="my-2">
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