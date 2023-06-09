import { axiosInstance } from "../../api/axiosInstance";

export const addProductToCart = async ({ token, quantity, productId }) => {
  try {
    const body = {quantity, productId}
    await axiosInstance.post("cart", body, {
        headers: {Authorization: `Bearer ${token}`}
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Algo salió mal con la petición del carrito");
  }
};
