import {Task, User} from "@/lib/types/type";
import {api, HTTPError} from "@/lib/api";
import { getCurrentUserFromServer} from "@/lib/session";

//TODO
// rewrite fo store
export const addTask = async (task: Task) => {
    const user = await getCurrentUserFromServer();
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
    return response;
}
export const editTask = async (task: Task) => {
    const user = await getCurrentUserFromServer();
    const response = await api.patch(`tasks/edit/${task.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        json: {

        }
    })
}
export const deleteTask = async (taskId: string) => {
    const user = await getCurrentUserFromServer();
    return api.delete(`/task/delete/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}
export const delegateTask = async (taskId: number, assignedUsername: string) => {
    const user = await getCurrentUserFromServer();
    return api.patch(`/tasks/delegate/${taskId}?username=${assignedUsername}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}

export const getTasksOfUser = async (): Promise<Task[]> => {
    const user = await getCurrentUserFromServer();
    const response = await api.get(`tasks/by-user/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return await response.json();
}
export const getTask = async (taskId : string) : Promise<Task> => {
    const user = await getCurrentUserFromServer();
    console.log(taskId)
    const response = await api.get(`tasks/info/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    if (!response.ok) {
        new HTTPError(`Failed fetch task with id: ${taskId}`)
    }
    return await response.json();
}
export const getPreviewTasks = async (userId: string) => {

}

