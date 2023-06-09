import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../services/products/getProductById";

export const useProductById = (productId) => {
    const query = useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProductById(productId)
    });
    return query;
}