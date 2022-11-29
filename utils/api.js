import axios from "axios";

const api = (config = {}) => {
    const axiosInstance = axios.create({
		baseURL : 'http://localhost:3000',
		withCredentials: false,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
        ...config
	});
    
    axiosInstance.interceptors.request.use((config)=>{
        const {message : {token}} = JSON.parse(localStorage.getItem("user"))
        config.headers = {
            ...config.headers,
            'x-access-token' : token
        }
        return config
    })

    return axiosInstance;
}

export default api;