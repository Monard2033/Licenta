import {usePathname} from "next/navigation";

const LeftSidePanel=()=>{

    const pathName = usePathname();
    if(pathName != "/login") {
        return <div className="bg-slate-200  h-screen min-h-full min-w-[300px] ">LeftSidePanel</div>
    } return <></>

}
export default LeftSidePanel;