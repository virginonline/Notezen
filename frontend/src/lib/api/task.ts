import {Task} from "@/lib/types/type";
import {api} from "@/lib/api";
import {getCurrentUser} from "@/lib/session";

export const addTask = async (task:Task) => {

}
export const editTask = async (task:Task) => {

}
export const deleteTask = async (taskId:string) => {

}
export const delegateTask = async (taskId : string, assignedUsername:string) => {
    const currentUser = getCurrentUser();
    const response = await api.patch(`/tasks/delegate/${taskId}?username=${assignedUsername}`, {
        headers:{
            Authorization: `Bearer ${getCurrentUser().token}`
        }
    });
    return response;
}
export const getTasksOfProject = async (projectId: string) => {

}
export const getTasks = async (userId:string) => {

}
export const getPreviewTasks = async (userId:string) => {

}

