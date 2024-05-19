import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";
import DataTable from "@/components/DataTable";


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
      <div>
        <DataTable/>
        <div>
        </div>
        <button
            className="border border-solid group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
          <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"/>
          </svg>
          New
        </button>
      </div>
  );
}
