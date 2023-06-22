import PurchasesList from "../../components/purchases/PurchasesList/PurchasesList"
import "./Purchases.css"

const Purchases = () => {
    return (
        <div className="purchases">
            <h1>Purchases</h1>
            <PurchasesList/>
        </div>
    )
}

export default Purchases