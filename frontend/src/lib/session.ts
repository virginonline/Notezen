import {parseCookies} from "nookies";
import {User} from "@/lib/types/type";

export function getCurrentUser() {
    const cookies = parseCookies();
    const usr : User = JSON.parse(cookies['_user'])
    return usr;
}