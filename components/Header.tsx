import React from 'react';
import {usePathname} from "next/navigation";

const Header = () => {
    const pathName = usePathname();
    if(pathName != "/login") {
        return (
            <header className="py-1.5 px-1.5">
                <div
                    className="rounded-3xl bg-blue-500 hover:mx-1 hover:my-2 h-36 px-10 transition-all duration-300 mx-4 size my-2 pt-4">
                    <div className="flex flex-col text-3xl font-semibold w-fit">
                        <h2>Tablou de Bord</h2>
                    </div>
                </div>
            </header>
        );

    }
    else
        return <></>
};

export default Header;