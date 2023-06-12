import {getCookie} from "cookies-next";
import {User} from "@/lib/types/type";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/session";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User>({createdDate: undefined, id: "", token: "", username: ""})
    useEffect(() => {
        setUser(getCurrentUser)
    }, [])
    return {user}
}