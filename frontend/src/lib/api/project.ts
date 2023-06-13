import {api, HTTPError} from "@/lib/api";
import {getCurrentUser} from "@/lib/session";
import {Project, ProjectPreview, User} from "@/lib/types/type";

export const addProject = async (title: string, description: string = '', status: string) => {
    const user = getCurrentUser();
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
    const user = getCurrentUser();
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
export const deleteProject = async (taskId:string) => {
    const user = getCurrentUser();
    return api.delete(`projects/delete/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
    })
}
export const getProjects = async () : Promise<Project[]> => {
    const user: User = getCurrentUser();
    const response = await api.get(`projects/user/${user.id}`, {
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
    const user: User = getCurrentUser();
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
