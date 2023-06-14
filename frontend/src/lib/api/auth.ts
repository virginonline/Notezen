import {api} from "@/lib/api";
import {User} from "@/lib/types/type";
import {destroyCookie} from "nookies";
import {getCurrentUserFromServer} from "@/lib/session";

export const login = async (username:string, password :string) : Promise<User> => {
    return (await api.post('auth/login', {json: {
        username:username,
        password:password
    }}).json())
}
export const registerUser = async (username:string, password :string) : Promise<User> => {
    return (await api.post('auth/register', {json: {
            username:username,
            password:password
        }}).json())
}

export const logout = async () =>  {
    const user = await getCurrentUserFromServer();
    if(user) {
        destroyCookie(null,'_user')
    }
}

export const editUser = async (username: string) => {
    const user = await getCurrentUserFromServer();
    user.username = username;
    return api.patch(`/users/update/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {
            username: username
        }
    });
}