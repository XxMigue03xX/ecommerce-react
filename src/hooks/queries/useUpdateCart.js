import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import { updateCart } from "../../services/cart/updateCart";

export const useUpdateCart = () => {
    const token = useSelector((store)=>store.authSlice.token);

    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: ({cartProductId, newQuantity}) =>
            updateCart({cartProductId, newQuantity, token}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    });

    return mutation;
}