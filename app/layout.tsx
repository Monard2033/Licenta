"use client"
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import {NextUIProvider} from "@nextui-org/react";
import Login from "@/app/login/page";
import {create} from "node:domain";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";
import DataTable from "@/components/DataTable";
import {cn} from "@/lib/utils";
import LeftSidePanel from "@/components/LeftSidePanel";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="h-full">
    <header>
        <title>IBM Dashboard</title>
    </header>
    <NextUIProvider>
        <body className={cn("relative h-full font-sans antialiasing")}>
        <main className="relative flex flex-col min-w-screen min-h-screen">
            <NavigationBar/>
            <div className="w-full flex flex-row">
                <LeftSidePanel/>
                {children}
            </div>
        </main>
        </body>
    </NextUIProvider>
    </html>
  );
}
