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
import {button} from "@nextui-org/theme";
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
    const profile = () => {
         router.push("/dashboard");
    }

        const handleLinkClick = () => {
            window.open('https://github.com/Monard2033', '_blank');
        };
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild >
                <Button className="bg-blue-300 text-gray-950 border-1  ">
                    Utilizator
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuLabel>Contul Meu</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={e => profile()}>
                        Profil
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <button onClick={handleLinkClick}>GitHub</button>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem>API</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={e => logout()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default ProfileComponent;