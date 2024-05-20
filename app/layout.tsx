"use client"
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import {NextUIProvider} from "@nextui-org/react";
import React from "react";
import {cn} from "@/lib/utils";
import LeftSidePanel from "@/components/LeftSidePanel";
import DataTable from "@/components/DataTable";


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
    <head>
        <title>IBM Dashboard</title>
    </head>
    <NextUIProvider>
        <body className={cn("relative h-full font-sans antialiasing")}>
        <main className="relative flex flex-col min-w-screen min-h-screen">
            <NavigationBar/>
            <div className="w-full flex flex-row">
                <LeftSidePanel/>
                <DataTable/>
                {children}
            </div>

        </main>
        </body>
    </NextUIProvider>
    </html>
  );
}
