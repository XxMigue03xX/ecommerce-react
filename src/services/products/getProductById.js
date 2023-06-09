import { axiosInstance } from "../../api/axiosInstance";

export const getProductById = async (id) => {
    try {
        const res = await axiosInstance.get(`products/${id}`)
        return res.data;
    } catch (error) {
        if(error.response) throw error.response.data
        else
            throw new Error(
                `Algo salió mal con la petición del producto con id = ${id}`
            );
    }
}