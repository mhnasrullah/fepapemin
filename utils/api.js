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
        if(localStorage.getItem("user") !== null){
            const {token} = JSON.parse(localStorage.getItem("user"))
            config.headers = {
                ...config.headers,
                'x-access-token' : token
            }
        }
        return config
    })

    axiosInstance.interceptors.response.use((res)=>res,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                if (localStorage.getItem("user") != null){
                    originalRequest._retry = true;
                    
                    const {refreshToken} = JSON.parse(localStorage.getItem("user"));
                    const base64User = refreshToken.split(".")[1]
                    const {exp, iat , ...userData} = JSON.parse(atob(base64User))
                    const provideData = {
                        ...userData,
                        refreshToken
                    }
                    try{
                        const {data : {token : access_token}} = await axios.post("http://localhost:3000/auth/freshToken",provideData);
                        
                        const newItem = {
                            token : access_token,
                            refreshToken
                        }
                        localStorage.setItem("user", JSON.stringify(newItem));

                        return axiosInstance(originalRequest);
                    }catch(e){
                        localStorage.removeItem("user")
                    }
                }
            }
            return Promise.reject(error);
        }
    )

    return axiosInstance;
}

export default api;