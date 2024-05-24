"use client"
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";
import {cn} from "@/lib/utils";
import LeftSidePanel from "@/components/LeftSidePanel";
import DataTable from "@/components/DataTable";
import Header from "@/components/Header";


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
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body className={cn("relative h-full font-sans antialiasing bg-content2")}>
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
            <main className="relative flex flex-col min-w-screen min-h-screen">
                <NavigationBar />
                <Header/>
                <div className="flex flex-row ml-4 grow">
                    <div className="">
                        <LeftSidePanel />
                    </div>
                    {children}
                </div>
            </main>
            </NextThemesProvider>
        </NextUIProvider>
        </body>
        </html>
    );
}
