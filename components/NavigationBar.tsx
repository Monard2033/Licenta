"use client"
import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    DropdownSection, user, Button, Textarea
} from "@nextui-org/react";
import {createClient} from "@/utils/supabase/client";
import {usePathname, useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {MessageIcon} from "@/components/ui/MessageIcon";
import Chat from "@/components/Chat";
import {CircleUserIcon} from "lucide-react";
;

export default function NavigationBar(props : any) {
    const {theme, setTheme} = useTheme()
    const supabase = createClient()
    const router = useRouter();


    async function displayUserEmail() {
        const {data: {user}} = await supabase.auth.getUser()
        return user?.email || null;
    }

    const pathName = usePathname();
    if (pathName != "/login") {
        return (
            <Navbar maxWidth="full" className="h-[53px] bg-content2 border-2">
                <NavbarContent className="flex rounded-3xl">
                    <NavbarBrand aria-label="link-pagina" className="flex justify-start">
                        <Link className="text-xl p-1 m-2 font-bold hover:border-3 rounded-medium duration-100 transition-all"
                              href={"/main"}>PAGINA PRINCIPALA</Link>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent aria-label={"Profile Button"} className="flex items-center" justify="end">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button aria-label="chat-button" isIconOnly radius="full" size="md">
                                <MessageIcon size={"28"} height={undefined} width={undefined}/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Chat Section" className=" w-[350px] h-full bg-content1 dark:bg-default-50">
                           <DropdownItem aria-label="Chat" isReadOnly={true} className="bg-content3 cursor-default ">
                                  <Chat isVisible />
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button
                                aria-label="profile-button"
                                isIconOnly
                                as="button"
                                className="transition-transform"
                                color="default"
                                name={user?.name}
                                radius="full"
                                size="md"
                            >
                                <CircleUserIcon size={"36"} fill="none"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Custom item styles"
                            className="p-3"
                            itemClasses={{
                                base: [
                                    "rounded-md",
                                    "text-primary-900",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[hover=true]:bg-default-100",
                                    "dark:data-[hover=true]:bg-default-50",
                                    "data-[selectable=true]:focus:bg-default-50",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                            }}
                        >
                            <DropdownSection aria-label="Profile & Actions" showDivider>
                                <DropdownItem
                                    isReadOnly
                                    key="profile"
                                    className="h-14 gap-2 opacity-100"
                                >
                                    <p className="font-semibold">Sunteti Conectat Ca:</p>
                                    <p className="font-semibold">{displayUserEmail()}</p>
                                </DropdownItem>
                                <DropdownItem key="profile">
                                    <button onClick={e => router.push("/profile")}>Profilu Tau</button>
                                </DropdownItem>
                                <DropdownItem
                                    key="projects"
                                >
                                    <button onClick={e => router.push("/projects")}>Proiectele Tale</button>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection aria-label="Preferences" showDivider>
                                <DropdownItem
                                    isReadOnly
                                    key="theme"
                                    className="cursor-default"
                                    endContent={
                                        <select
                                            className="z-10 text-primary-900 w-16 py-0.5 rounded-md text-xs border-small dark:border-default-200 bg-default-400/20 dark:bg-content2"
                                            id="theme"
                                            name="theme"
                                            onChange={e => {
                                                if (e.target.value === "Dark") {
                                                    setTheme("dark");
                                                } else if (e.target.value === "Light") {
                                                    setTheme("light");
                                                } else if (e.target.value === "System") {
                                                    setTheme("system");
                                                }
                                            }}
                                        >
                                            <option value="System">System</option>
                                            <option value="Dark">Dark</option>
                                            <option value="Light">Light</option>
                                        </select>

                                    }
                                >
                                    Theme
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection aria-label="Setari si Delogare">
                                <DropdownItem key="settings">
                                    <button onClick={e => router.push("/settings")}>Setari</button>
                                </DropdownItem>
                                <DropdownItem>
                                    <button onClick={e => router.replace("/login")}>Delogare</button>
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        );
    }
}
