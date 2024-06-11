import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";
import {cn} from "@/lib/utils";
import LeftSidePanel from "@/components/LeftSidePanel";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000/main";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    if (defaultUrl.includes("/main")) {
        return (
            <html>
            <head>
                <title>IBM Nexus: The Student Hub</title>
                <link rel="icon" href="/favicon.ico"/>
            </head>
            <body className={cn("relative h-full font-sans antialiasing bg-content2")}>
            <NextUIProvider>
                <NextThemesProvider attribute="class">
                    <main className="relative flex flex-col min-w-screen min-h-full">
                        <NavigationBar/>
                        <div className="static">
                            <Header/>
                        </div>
                        <div className="flex flex-row ml-4 h-full min-h-screen grow">
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
}