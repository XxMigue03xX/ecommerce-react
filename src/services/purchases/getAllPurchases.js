import { axiosInstance } from "../../api/axiosInstance";

export const getAllPurchases = async (token) => {
    try {
        const res = await axiosInstance.get("purchases",{headers: {Authorization: `Bearer ${token}`}});
        return res.data;
    } catch (error) {
        if (error.response)
          throw typeof error.response.data === "string"
            ? new Error(error.response.data)
            : error.response.data;
        else throw new Error("Algo salio con la petición de comprar");
    }
}