import {parseCookies} from "nookies";
import {User} from "@/lib/types/type";

export function getCurrentUser() {
    const {_user} = parseCookies();
    const usr : User = JSON.parse(_user)
    return usr;
}