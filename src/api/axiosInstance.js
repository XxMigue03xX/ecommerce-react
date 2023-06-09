import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://e-commerce-api-v2.academlo.tech/api/v1",
});