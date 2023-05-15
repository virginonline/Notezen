export default function welcomeScreen() {
    const date: Date = new Date();
    const h: number = date.getHours();
    const title = getGreeting(h);
    const greeting: string = `${date.toLocaleString('ru', {weekday: 'long'}).charAt(0).toUpperCase() +
    date.toLocaleString('ru', {weekday: 'long'}).slice(1)}, ${date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric'
    })} `
    const welcome: string = `${title}, Ivan`
    return {greeting, welcome}

}

function getGreeting(h: number): string {
    if (h < 12) {
        return ("Доброе утро");
    } else if (h < 18) {
        return ("Добрый день");
    } else {
        return "Добрый вечер";
    }
}