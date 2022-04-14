import axios from 'axios';

export var api = axios.create({
    baseURL: "http://localhost:3000/api",
})