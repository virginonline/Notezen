import {User} from "@/lib/types/type";
import {useEffect, useState} from "react";
import {getCurrentUserFromServer} from "@/lib/session";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User>({createdDate: undefined, id: "", token: "", username: ""})
    useEffect(() => {
        (async () => {
            const usr = await getCurrentUserFromServer();
            setUser(usr)
        })();
    }, [])
    return {user}
}