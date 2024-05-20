'use client'
import {Button, buttonVariants} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@supabase/auth-js";

interface UserButtonProps {
    userName: string;
}

export function ProfileComponent() {
    const supabase = createClient()
    const router = useRouter()
    const logout = ()=> {
        supabase.auth.signOut();
        router.replace("/login");
    }
    //const [user, setUser] = useState<User | null>();

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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-blue-300 text-gray-950 border-1">
                        Contul Meu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <p></p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <button onClick={e => profile()}>Profil</button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <button onClick={handleLinkClick}>GitHub</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button onClick={e => setting()}>Setari</button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <button onClick={e => logout()}>Delogare</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}

export default ProfileComponent;