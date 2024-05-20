'use client'
import React, {useState} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User} from "@nextui-org/react";
import {PlusIcon} from "@/components/ui/PlusIcon.jsx";
import {useRouter} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
export default function ProfileComponent() {
    const supabase = createClient()
    const router = useRouter();
    const logout = () => {
        supabase.auth.signOut();
        router.replace("/login");
    }

    const profile = () => {
        router.push("/dashboard");
    }
    const setting = () => {
        router.push("/setting");
    }

    const handleLinkClick = () => {
        window.open('https://github.com/Monard2033', '_blank');
    };

    return (
        <Dropdown
            showArrow
            radius="sm"
            classNames={{
                base: "before:bg-red-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
            }}
        >
            <DropdownTrigger>
                <Button variant="ghost"
                        className="text-large"
                        disableRipple
                >
                    Meniu
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-accent"
                         viewBox="0 0 22 22">
                        <path d="M4 18h16v-2H4v2zM4 13h16v-2H4v2zM4 6v2h16V6H4z"/>
                    </svg>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3"
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
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
                        <User

                            name="Junior Garcia"
                            description="@jrgarciadev"
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            avatarProps={{
                                size: "sm",
                                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                            }}
                        />
                    </DropdownItem>
                    <DropdownItem key="dashboard">
                        <button onClick={e => profile()}>Profil</button>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        <button onClick={e => setting()}>Setari</button>
                    </DropdownItem>
                    <DropdownItem
                        key="new_project"
                        endContent={<PlusIcon className="text-large" width={undefined} height={undefined}/>}
                    >
                        New Project
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Preferences" showDivider>
                    <DropdownItem key="quick_search" shortcut="⌘K">
                        Quick search
                    </DropdownItem>
                    <DropdownItem
                        isReadOnly
                        key="theme"
                        className="cursor-default"
                        endContent={
                            <select
                                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                                id="theme"
                                name="theme"
                            >
                                <option>System</option>
                                <option>Dark</option>
                                <option>Light</option>
                            </select>
                        }
                    >
                        Theme
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem>
                        <button onClick={e => logout()}>Delogare</button>
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}