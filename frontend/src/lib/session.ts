import {parseCookies} from "nookies";
import {User} from "@/lib/types/type";

export function getCurrentUser() {
    const cookies = parseCookies();
    const _user = JSON.parse(cookies['_user'])
    console.log(_user)
    return (_user as User);
}