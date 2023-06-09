import { usePurchases } from "../../../hooks/queries/usePurchases"
import "./PurchasesList.css"

const PurchasesList = () => {
    const { data, isLoading, isError, error } = usePurchases();

    console.log(data);

    if(isLoading) return <p>Loading purchases...</p>

    if(isError) return <p>{error.message ?? "No se pudo cargar la lista de compras"}</p>

    return (
        <ul className="purchases-list">
            {data.map(purchase => (
                <li key={purchase.id} className="purchases-list__item">
                    <article className="purchase-container">
                        <div className="purchase-img-container">
                            <img src={purchase.product.images[0].url} alt={purchase.product.title} />
                        </div>
                        <h5 className="purchase-title">{purchase.product.title}</h5>
                        <p className="purchase-date">{purchase.createdAt}</p>
                        <div className="purchase-quantity-container">
                            <p className="purchase-quantity">{purchase.quantity}</p>
                        </div>
                        <h5 className="purchase-price">$ {(purchase.quantity*purchase.product.price).toFixed(2)}</h5>
                    </article>
                </li>
            ))}
        </ul>
    )
}

export default PurchasesList