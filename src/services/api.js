import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
	baseURL: "http://127.0.0.1:3000"
});

api.interceptors.request.use(async config => {
	const token = getToken();
	config.headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
    }
	
	return config;
});

export default api;