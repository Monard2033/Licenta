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
    DropdownSection, user
} from "@nextui-org/react";
import {SearchIcon} from "@/components/ui/SearchIcon.jsx";
import {createClient} from "@/utils/supabase/client";
import {usePathname, useRouter} from "next/navigation";
import {useTheme} from "next-themes";

export default function NavigationBar(props : any) {
    const { theme, setTheme } = useTheme()
    const supabase = createClient()
    const router = useRouter();
    const logout = () => {
        supabase.auth.signOut();
        router.replace("/login");
    }
    async function displayUserEmail() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user)
        return user?.email || null;
    }
    const profile = () => {
        router.push("/profile");
    }
    const project = () => {
        router.push("/project");
    }
    const setting = () => {
        router.push("/setting");
    }

    const handleLinkClick = () => {
        window.open('https://github.com/Monard2033', '_blank');
    };


    const pathName = usePathname();
    if(pathName != "/login") {
        return (
            <Navbar maxWidth="full" className="h-[53px] bg-content2 border-2">
                <NavbarContent className="flex rounded-3xl">
                    <NavbarBrand className="flex items-center justify-center ml-12">
                        <Link className="hidden sm:block font-bold" href={"/"}>Campus Virtual</Link>
                    </NavbarBrand>
                    <NavbarContent justify="center" className="flex text-default-500 px-56 ml-12">
                        <NavbarItem>
                            <Link  href="#">
                                Features
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/utilizatori" aria-current="page">
                                Utilizatori
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link  href="#">
                                Integrations
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>
                <NavbarContent aria-label={"Profile Button"} className="flex items-center" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon size={18} width={32} height={32}/>}
                        type="search"
                    />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color={"success"}
                                name={user?.name}
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
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
                                    <button onClick={e => profile()}>Profilu Tau</button>
                                </DropdownItem>
                                <DropdownItem
                                    key="projects"
                                >
                                    <button onClick={e => project()}>Proiectele Tale</button>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection aria-label="Preferences" showDivider>
                                <DropdownItem key="quick_search">
                                    Cautare rapida
                                </DropdownItem>
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
                                    <button onClick={e => setting()}>Setari</button>
                                </DropdownItem>
                                <DropdownItem>
                                    <button onClick={e => logout()}>Delogare</button>
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        );
    }
}
