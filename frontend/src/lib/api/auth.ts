import {api} from "@/lib/api";
import {User} from "@/lib/types/type";

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