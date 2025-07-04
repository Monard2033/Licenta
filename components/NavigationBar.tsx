"use client"
import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownSection, Button,
    Switch, Badge
} from "@nextui-org/react";
import {createClient} from "@/utils/supabase/client";
import {usePathname, useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {MessageIcon} from "@/components/ui/MessageIcon";
import Chat from "@/components/Chat";
import {CircleUserIcon, MoonIcon, SunIcon} from "lucide-react";
import {displayUserEmail} from "@/utils/users";
import {useMessageContext} from "@/components/MessageContext";


export default function NavigationBar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { unseenMessages } = useMessageContext();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [isSelected, setIsSelected] = React.useState(true);
    const [user, setUser] = useState({name: ''});
    const supabase = createClient()
    const router = useRouter()

    const SignOut = async () =>{
        await supabase.auth.signOut()
        router.replace('/login')
    }
    useEffect(() => {
        // Apply the system theme on initial render
        if (theme === 'system') {
            setSelectedTheme(resolvedTheme);
        }
    }, [theme, resolvedTheme]);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const { data } = await supabase
                    .from('user_themes')
                    .select('theme')
                    .eq('user_name', user.name)
                    .single();

                if (data?.theme) {
                    setTheme(data.theme);
                    setSelectedTheme(data.theme);
                }
            } catch (error) {
                console.error('Error fetching theme:', error);
            }
        };

        fetchTheme();
    }, [user.name]);



    const handleThemeChange = async (e: any) => {
        const newTheme = e.target.checked ? 'light' : 'dark'; // Toggling light/dark
        setSelectedTheme(newTheme);
        setTheme(newTheme);

        try {
            await supabase
                .from('user_themes')
                .upsert([{ id: 1, user_name: user.name, theme: newTheme }]);

            console.log(`Theme changed for user ${user.name} to ${newTheme}`);
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = await displayUserEmail();
            if (userData) {
                // @ts-ignore
                setUser(userData);
            }
        };
        fetchData();
    }, []);

    const pathName = usePathname();
    if (pathName != "/login") {
        return (
            <Navbar maxWidth="full" className="h-[53px] bg-content2 border-2">
                <NavbarContent className="flex rounded-3xl">
                    <NavbarBrand aria-label="link-pagina" className="flex justify-start ml-2">
                        <Button aria-label="main-button" title="Pagina Principala"  radius="full" size="md">
                        <Link className="text-xl p-1 m-2 font-bold rounded-medium" title="Pagina Principala"
                              href={"/main"}>PAGINA PRINCIPALA</Link>
                        </Button>
                    </NavbarBrand>
                <NavbarContent aria-label={"Profile Content"} className="flex items-center rounded-3xl mr-2" justify="end">
                    <Badge color="danger" content={unseenMessages} isInvisible={unseenMessages === 0} shape="circle">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button aria-label="chat-button" title="Chat" isIconOnly radius="full" size="md">
                                <MessageIcon size={"28"} height={undefined} width={undefined}/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Chat Section" className=" w-[350px] h-full bg-content1 dark:bg-default-50">
                            <DropdownItem aria-label="Chat" isReadOnly={true} className="bg-content3 cursor-default">
                                <Chat isVisible/>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </Badge>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button
                                aria-label="profile-button"
                                isIconOnly
                                as="button"
                                title="Profil"
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
                                    key="user"
                                    className="h-14 gap-2 opacity-100"
                                >
                                    <p className="font-semibold">Sunteti Conectat Ca:</p>
                                    <p className="font-semibold">{user?.name} </p>
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
                                >
                                    <Switch
                                        isSelected={isSelected}
                                        onValueChange={setIsSelected}
                                        checked={selectedTheme === "light"}
                                        size="md"
                                        color="success"
                                        className="flex flex-row-reverse font-thin gap-2 items-center"
                                        startContent={<SunIcon/>}
                                        endContent={<MoonIcon/>}
                                        onChange={handleThemeChange}
                                    >
                                        Schimba Tema
                                    </Switch>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection aria-label="Setari si Delogare">
                                <DropdownItem key="settings">
                                    <button onClick={e => router.push("/settings")}>Setari</button>
                                </DropdownItem>
                                <DropdownItem>
                                    <button onClick={e =>SignOut()}>Delogare</button>
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                </NavbarContent>
            </Navbar>
        );
    }
}
