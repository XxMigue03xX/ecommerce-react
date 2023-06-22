import { usePurchases } from "../../../hooks/queries/usePurchases"
import "./PurchasesList.css"

const PurchasesList = () => {
    const { data, isLoading, isError, error } = usePurchases();

    console.log(data);

    if(isLoading) return <p>Loading purchases...</p>

    if(isError) return <p>{error.message ?? "No se pudo cargar la lista de compras"}</p>

    function purchaseDate(date) {
        const objectDate = new Date(date);
        const day = objectDate.getDate();
        const month = objectDate.getMonth() + 1;
        const year = objectDate.getFullYear();
      
        const formatDay = day < 10 ? `0${day}` : day;
        const formatMonth = month < 10 ? `0${month}` : month;
      
        return `${formatDay}/${formatMonth}/${year}`;
    }

    return (
        <ul className="purchases-list">
            {data.map(purchase => (
                <li key={purchase.id} className="purchases-list__item">
                    <article className="purchase-container">
                        <div className="purchase-img-container">
                            <img src={purchase.product.images[0].url} alt={purchase.product.title} />
                        </div>
                        <h5 className="purchase-title">{purchase.product.title}</h5>
                        <p className="purchase-date">{purchaseDate(purchase.createdAt)}</p>
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