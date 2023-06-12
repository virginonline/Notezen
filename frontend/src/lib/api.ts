import ky from "ky";
import {getCurrentUser} from "@/lib/session";

export  const api = ky.create({
    prefixUrl: 'http://localhost:8083/api/v1/',
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
