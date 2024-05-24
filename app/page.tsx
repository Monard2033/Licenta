import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";
import DataTable from "@/components/DataTable";
import Calendar from "@/components/Calendar";
import Header from "@/components/Header";


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient()
  const {data,error} = await supabase.auth.getUser()
  if(error || !data.user) {
    redirect('/login')
  }
  console.log(data);

  return (
      <main className="m-2 flex flex-col justify-between w-screen hover:my-1 hover:mx-1 transition-all duration-300">
      <div className="flex h-fit">
        <DataTable />
      </div>
      </main>
  );
}
