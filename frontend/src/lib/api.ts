import ky from "ky";

export  const api = ky.create({
    prefixUrl: 'http:localhost:8083/api/v1/',

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
export  const apiSecure = api.extend({
    headers: {

    }
})