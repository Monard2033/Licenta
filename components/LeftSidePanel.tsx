
import {usePathname} from "next/navigation";
import React from "react";
import { useRouter} from "next/navigation";


const LeftSidePanel=()=>{
    const router = useRouter();
    const project = () => {
        router.push("/project");
    }
    const pathName = usePathname();
    if(pathName != "/login")
    {
        return <div className="flex flex-col rounded-medium min-h-full min-w-[330px] ">
            <div className="flex flex-col">
                <div className="flex flex-col m-0.5 p-2 h-48 bg-content1 hover:my-0 hover:mx-0 transition-all duration-300 rounded-medium border-3">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Meniul Tau</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center p-2 border-3 justify-between hover:my-3 hover:mx-0 transition-all duration-300 m-0.5 mt-4 bg-content1 rounded-medium">
                    <div className="bg-blue-500 my-2 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center mx-2 h-full">Navigare</h5>
                    </div>
                    <div className=" my-8 mx-2 flex flex-col h-full items-center justify-between">
                        <div className="my-2">
                         <span>
                             <button onClick={e => project()}>First Project</button>
                         </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else
        return <></>
}
export default LeftSidePanel;