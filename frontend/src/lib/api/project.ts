import {api, HTTPError} from "@/lib/api";
import {Project, ProjectPreview, User} from "@/lib/types/type";
import {parseCookies} from "nookies";
import {getCurrentUserFromServer} from "@/lib/session";


//TODO
// rewrite fo store
export const addProject = async (title: string, description: string = '', status: string) => {
    const user = await getCurrentUserFromServer();
    return api.post(`projects/new`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {
            title: title,
            description: description,
            status: status,
            owner: user.username
        }
    })
}
export const editProject = async (title: string, description: string = '', status: string) => {
    const user = await getCurrentUserFromServer();
    return api.patch(`projects/edit`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {
            title: title,
            description: description,
            status: status,
            owner: user.username
        }
    })
}
export const deleteProject = async (projectId:number) => {
    const user = await getCurrentUserFromServer();
    return api.delete(`projects/delete/${projectId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
    })
}
export const getProjects = async (user : User) : Promise<Project[]> => {
    const response = await api.get(`projects/by-user/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return await response.json();

}
export const getPreviewProject = async () : Promise<ProjectPreview[]> => {
    const user = await getCurrentUserFromServer();
    const response = await api.get(`projects/preview/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return await response.json();
}
