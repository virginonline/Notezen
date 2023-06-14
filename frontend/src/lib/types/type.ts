import {Icon} from "lucide-react";

export type User = {
    id:string,
    username:string,
    token:string
    createdDate?:Date
}

export type Comment = {
    id:number,
    author:string,
    content:string
}

export type Project = {
    id: number,
    title:string,
    description:string,
    status:string
    owner:string
}

export type ProjectStatus = {
    label:string,
    value:string,
    icon? : Icon
}
export type TaskStatus =  ProjectStatus;
export type Priority = TaskStatus;

export type Task = {
    id:number | null,
    title:string,
    description: string,
    status:string,
    priority:string,
    project: string,
    created_by:string,
    assigned_to?:string,
    expiration_date?: Date

}

export type TaskPreview = {
    id:number,
    title:string
    description:string,
    expirationDate?: Date
}

export type ProjectPreview = {
    id:number,
    title:string,
    taskCount:string
}