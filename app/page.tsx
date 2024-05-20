import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";


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
        <div>

        </div>
      </div>
  );
}
