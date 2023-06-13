import {api} from "@/lib/api";
import {User} from "@/lib/types/type";
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

export const editUser = async (username: string) => {
    const user = getCurrentUser();
    user.username = username;
    const response = await api.patch(`/users/update/${user.id}`, {
        headers: {
            Authorization: `Bearer ${getCurrentUser().token}`
        },
        json: {
            username: username
        }
    });
    return response;
}