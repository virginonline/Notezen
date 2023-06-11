import {getCookie} from "cookies-next";
import {redirect} from "next/navigation";
import {User} from "@/lib/types/type";

export function getCurrentUser() {

    const user = getCookie('_user')
    console.warn(`user ${user}`)
    if(!user || user === true || user === undefined) {
        return undefined;
    }
    const _user : User = JSON.parse(user);
    return _user;
}