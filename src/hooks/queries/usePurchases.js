import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { getAllPurchases } from "../../services/purchases/getAllPurchases";

export const usePurchases = () => {
    const token = useSelector(store => store.authSlice.token);
    const query = useQuery({
        queryKey: ["purchases"],
        queryFn: () => getAllPurchases(token)
    });
    return query;
}