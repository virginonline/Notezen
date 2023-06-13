import {Task} from "@/lib/types/type";
import {api, HTTPError} from "@/lib/api";
import {getCurrentUser} from "@/lib/session";

export const addTask = async (task: Task) => {
    const user = getCurrentUser();
    const response = await api.post(`tasks/new`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {
            title: task.title,
            description : task.description,
            status : task.status,
            priority: task.priority
        }
    })
}
export const editTask = async (task: Task) => {

}
export const deleteTask = async (taskId: string) => {
    const user = getCurrentUser();
    return api.delete(`/task/delete/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}
export const delegateTask = async (taskId: string, assignedUsername: string) => {
    const user = getCurrentUser();
    return api.patch(`/tasks/delegate/${taskId}?username=${assignedUsername}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}
export const getTasksOfProject = async (projectId: string) => {

}
export const getTasksOfUser = async (): Promise<Task[]> => {
    const user = getCurrentUser();
    const response = await api.get(`/tasks/user/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return await response.json();
}
export const getTasks = async (userId: string) => {

}
export const getPreviewTasks = async (userId: string) => {

}

