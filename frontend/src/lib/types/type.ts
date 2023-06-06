export type User = {
    id:string,
    username:string,
}

export type Project = {
    id: number,
    title:string,
    description:string,
    status:string
    owner:string
}

export type Task = {
    id:number,
    title:string,
    description:string,
    status:string,
    priority?:string,
    project: string,
    author:string,
    assignedTo?:string,
    expirationDate?: Date

}

export type TaskPreview = {
    id:number,
    title:string
    description:string,
    expirationDate?: Date
}

export type ProjectPreview = {
    id:string,
    title:string,
    taskCount:string
}