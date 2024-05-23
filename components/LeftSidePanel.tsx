import { Link } from "lucide-react";
import {usePathname} from "next/navigation";
import React from "react";
import { useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";

const LeftSidePanel=()=>{
    const router = useRouter();
    const project = () => {
        router.push("/project");
    }
    const pathName = usePathname();
    if(pathName != "/login")
    {
        return <div className="flex flex-col bg-primary-50 h-full rounded-medium min-h-screen min-w-[330px]">
            <div className="flex flex-col">
                <div className="flex flex-col p-4 h-36 rounded-medium border-3">
                    <div className="bg-blue-500 w-full h-10 rounded-medium text-xl text-white">
                        <h5 className="flex items-center h-full">Meniul Tau</h5>
                    </div>
                    <Button>Profil</Button>
                </div>
                <div className="flex flex-col items-center justify-between min-w-52 my-2 mx-2">
                    <h1>Proiectele Tale</h1>
                        <div className=" my-8 mx-2 h-full items-center justify-between">
                         <div className="my-2">
                         <span>
                             <button onClick={e => project()}>First Project</button>
                         </span>
                           </div>
                         </div>
                </div>
            </div>
        </div>
    }
    else
    return <></>
}
export default LeftSidePanel;