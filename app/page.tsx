import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";
import DataTable from "@/components/DataTable";



export default async function Index() {

  const supabase = createClient()
  const {data,error} = await supabase.auth.getUser()
  if(error || !data.user) {
    redirect('/login')
  }
  return (
      <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen h-screen">
      <div className="flex flex-col shadow-xl bg-content1 m-2 border-3 rounded-medium hover:m-1 transition-all duration-300">
        <DataTable/>
      </div>
      </main>
  );
}
