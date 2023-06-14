import ky from "ky";

export  const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export class HTTPError extends Error {
}
