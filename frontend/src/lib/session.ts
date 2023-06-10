import {getCookie} from "cookies-next";

export async function getCurrentUser() {
    const session = getCookie('token')
    return session
}