import axios from "axios";
const baseURL = "http://192.168.0.196:5000/api/";
const api = axios.create({
    baseURL: baseURL,
})


export default api;