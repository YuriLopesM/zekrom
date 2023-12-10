import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user:zekron') || '{}').token

export const api = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}