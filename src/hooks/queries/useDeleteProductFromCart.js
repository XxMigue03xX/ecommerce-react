import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { deleteProductFromCart } from "../../services/cart/deleteProductFromCart";

export const useDeleteProductFromCart = () => {
    const token = useSelector((store) => store.authSlice.token);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (cartProductId) => deleteProductFromCart(cartProductId, token),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    });
    return mutation;
}