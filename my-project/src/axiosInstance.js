import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "https://collection-server-n34s.onrender.com"
    baseURL: "http://192.168.0.139"
})

export {axiosInstance}