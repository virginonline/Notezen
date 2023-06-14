import {Comment} from "@/lib/types/type";
import {getCurrentUserFromServer} from "@/lib/session";
import {api, HTTPError} from "@/lib/api";

export const getComments = async (taskId: number) : Promise<Comment[]> => {
    const user = await getCurrentUserFromServer();
    const response = await api.get(`tasks/${taskId}/comments`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return [];
}

export const addComment = async (taskId : number, content : string) => {
    const user = await getCurrentUserFromServer();
    const response = await api.post(`tasks/${taskId}/add-comment`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {
            author: user.username,
            content: content
        }
    });

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return await response.json();
}