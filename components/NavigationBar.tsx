import React from "react";
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

export default function NavigationBar() {
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
    function onThemeChange() {

    }
    const pathName = usePathname();
    if(pathName != "/login") {
        return (
            <Navbar maxWidth="full" className="h-16 bg-primary-50">
                <NavbarContent className="flex rounded-3xl">
                    <NavbarBrand className="flex items-center justify-center ml-12">
                        <Link className="hidden sm:block font-bold" href={"/"}>Campus Virtual</Link>
                    </NavbarBrand>
                    <NavbarContent justify="center" className="flex rounded-3xl border-1 px-56 ml-12">
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Features
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link href="/utilizatori" aria-current="page" color="secondary">
                                Utilizatori
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Integrations
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent className="flex items-center" justify="end">
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
                                color="secondary"
                                name={user.name}
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
                                            className="z-10 text-primary-900 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent"
                                            id="theme"
                                            name="theme"
                                            onChange={onThemeChange}
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
