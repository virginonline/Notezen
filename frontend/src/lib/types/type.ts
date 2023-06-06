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
    project: string,
    author:string,
    assignedTo?:string
}