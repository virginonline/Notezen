import {api} from "@/lib/api";
import {User} from "@/lib/types/type";
import {cookies} from "next/headers";
import {getCookie, removeCookies} from "cookies-next";
import {getCurrentUser} from "@/lib/session";
import {destroyCookie} from "nookies";

export const login = async (username:string, password :string) : Promise<User> => {
    return (await api.post('auth/login', {json: {
        username:username,
        password:password
    }}).json())
}
export const registerUser = async (username:string, password :string) : Promise<User>=> {
    return (await api.post('auth/register', {json: {
            username:username,
            password:password
        }}).json())
}

export const logout = async () =>  {
    const user = getCurrentUser();
    if(user) {
        destroyCookie(null,'_user')
    }
}