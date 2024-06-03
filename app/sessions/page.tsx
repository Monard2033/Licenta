import React from 'react';
import DataTable from "@/components/DataTable";
import SessionTable from "@/components/SessionTable";

const Sessions = () => {


    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between h-screen w-screen">
            <div
                className="bg-content1 m-2 border-3 h-fit rounded-medium hover:m-1 transition-all duration-300">
                <SessionTable/>
            </div>
        </main>
    );
};

export default Sessions;