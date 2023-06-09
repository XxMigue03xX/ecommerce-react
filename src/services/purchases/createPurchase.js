import { axiosInstance } from "../../api/axiosInstance";

export const createPurchase = async (token) => {
  try {
    await axiosInstance.post("purchases", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Algo salio con la petición de comprar");
  }
};
