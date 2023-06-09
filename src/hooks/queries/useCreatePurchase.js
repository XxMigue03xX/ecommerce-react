import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { createPurchase } from "../../services/purchases/createPurchase";

export const useCreatePurchase = () => {
    const token = useSelector(store => store.authSlice.token);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => createPurchase(token),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
            // Invalidar la petición para obtener los purchases
            await queryClient.invalidateQueries({queryKey: ["purchases"]});
        }
    });

    return mutation;
}