import React from 'react';
import DataTable from "@/components/DataTable";
import SessionTable from "@/components/SessionTable";

const Sessions = () => {


    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen">
            <div
                className="flex flex-col bg-content1 m-2 border-3 rounded-medium hover:my-1 hover:mx-1 transition-all duration-300">
                <h5> Sesiunile tale</h5>
                <SessionTable/>
            </div>
        </main>
    );
};

export default Sessions;