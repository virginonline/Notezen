import ky from "ky";
import {getCurrentUser} from "@/lib/session";

export  const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
export const secureApi = api.extend({
    headers:{
//        Authorization: `Bearer ${getCurrentUser()?.token}`
    }
})
