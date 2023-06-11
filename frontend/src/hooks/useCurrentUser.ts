import {getCookie} from "cookies-next";
import {User} from "@/lib/types/type";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const currentUser = getCookie('_user')
        if(currentUser) {
            setUser(JSON.parse(currentUser as string))
        } else {
            redirect('/login')
        }
    }, [])
    return {user}
}