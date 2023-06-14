import {parseCookies} from "nookies";
import {User} from "@/lib/types/type";
import {cookies} from "next/headers";


export function getCurrentUser() {
    const cookies = parseCookies();
    console.warn(`TOKENS : ${cookies['_user']}`)
    const _user = JSON.parse(cookies['_user'])

    console.log(_user)
    return (_user as User);
}

'use server'
export async function getCurrentUserFromServer() {
    const _user = cookies().get('_user')
    if(typeof _user?.value == undefined) {
        throw new Error('Cookie _user on server not found')
    }
    const user : User = await JSON.parse(_user!.value)
    return user;
}