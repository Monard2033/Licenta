import {usePathname} from "next/navigation";
import React from "react";

const LeftSidePanel=()=>{

    const pathName = usePathname();
    if(pathName != "/login")
    {
        return <div className="bg-slate-200 h-screen min-h-screen min-w-[300px] ">
            <div className="flex-1 flex-row items-start h-full my-14 mx-4 font-medium justify-between">
                <div className="flex items-center justify-between min-w-52 my-2 mx-2">
                 Proiectele Tale
                 <button
                    className="flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                     <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                         <path
                        d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"/>
                     </svg>
                New
                </button>
                </div>
                <div className=" my-8 mx-2 h-full items-center justify-between">
                    <div className="my-2">
                        <span>First Project</span>
                    </div>
                    <div>
                       <span> Second Project</span>
                    </div>
                </div>
            </div>
        </div>
    }
    return <></>

}
export default LeftSidePanel;