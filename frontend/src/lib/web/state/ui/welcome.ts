import {getGreeting} from "@/lib/utils";

export function welcomeScreen(){

    const date: Date = new Date();
    const h: number = date.getHours();
    const title = getGreeting(h);

    const greeting: string = `${date.toLocaleString('ru', {weekday: 'long'}).charAt(0).toUpperCase() +
    date.toLocaleString('ru', {weekday: 'long'}).slice(1)}, ${date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric'
    })} `
    const welcome = (name:string) => {
        return `${title}, ${name}`
    }

    return {greeting, welcome}
}