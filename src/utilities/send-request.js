import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null, containsFile = false) {
    const options = { method };
    if (payload && containsFile) {
        options.headers = { 'Content-Type': 'multipart/form-data' };
        options.body = payload
    } else if(payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}