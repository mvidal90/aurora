import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getCustomers = async (query: { [key: string]: string | number }) => {
    console.log(query);
    const resp = await axiosInstance.get(`/customers${Object.entries(query).length > 0 
        ? Object.entries(query).reduce((acc, [key, value], i, arr) =>  `${acc}${key}=${value}${arr.length -1 !== i ? "&" : ""}`
        , "?") 
    : ""}`)
    return resp.data;
}

export const createCustomers = async (data: { customers: any[]}) => {
    const resp = await axiosInstance.post("/customers", data)
    return resp.data;
}

export const login = async (data: { username: string, password: string }) => {
    const resp = await axiosInstance.post("/auth/login", data)
    return resp.data;
}

export const getTemplates = async () => {
    const resp = await axiosInstance.get("/templates")
    return resp.data;
}
export const createTemplate = async (data: { name: string, content: string }) => {
    const resp = await axiosInstance.post("/templates", data)
    return resp.data;
}