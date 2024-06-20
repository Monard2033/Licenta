import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";
import {cn} from "@/lib/utils";
import LeftSidePanel from "@/components/LeftSidePanel";
import Header from "@/components/Header";
import {redirect} from "next/navigation";
import { MessageProvider } from "@/components/MessageContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000/main";


export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
        <head>
            <title>IBM Nexus: Centrul Studentesc</title>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body className={cn("relative h-full font-sans antialiasing bg-content2")}>
        <NextUIProvider>
            <NextThemesProvider attribute="class">
                <main className="flex flex-col min-w-screen h-[180vh]">
                    <MessageProvider>
                    <NavigationBar/>
                    </MessageProvider>
                    <div className="static">
                        <Header/>
                    </div>
                    <div className="flex flex-row ml-4 min-h-full">
                        <div>
                            <LeftSidePanel/>
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