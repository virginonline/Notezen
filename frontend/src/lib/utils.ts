import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("ru", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export function absoluteUrl(path: string) {
}
export function getGreeting(h: number) {
	if (h < 12) {
		return ("Доброе утро");
	} else if (h < 18) {
		return ("Добрый день");
	} else {
		return "Добрый вечер";
	}
}
export const transformCount = (count: number) => {
	if (count == 0) {
		return 0
	} else if (count <= 10 && count !== 0) {
		return 1
	} else if (count > 10 && count <= 15) {
		return 2
	} else if (count > 15 && count <= 20) {
		return 3
	} else {
		return 4
	}
}

/*
export const transformPixelsToNumber = (pixel: string) => {
	let exp = /-?\d+/g
	return parseInt(exp.exec(pixel.toString())[0])
}*/
