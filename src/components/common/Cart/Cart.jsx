import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import { useCreatePurchase } from "../../../hooks/queries/useCreatePurchase";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css"

const Cart = ({ isVisible }) => {
  const isLogged = useSelector(store => store.authSlice.isLogged);
  const { data, isLoading, isError, error } = useCart();
  const createPurchaseMutation = useCreatePurchase();

  const reducer = (acc, cartProduct) => {
    const quantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    return acc + quantity * price;
  }

  const total = data?.reduce(reducer, 0) ?? 0;

  const toggleCart = isVisible ? "wrapper-cart" : "wrapper-cart hidden";

  const handleCheckout = () => {
    if(isLogged) createPurchaseMutation.mutate();
  }

  if (isLoading) return <p>Loading Cart...</p>;

  if (isError)
    return <p>{error.message ?? "No se pudo cargar el estado del carrito"}</p>;

  return (
    <div className={toggleCart}>
      <aside className="cart">
        <h2 className="cart__title">Shopping Cart</h2>
        {!data.length && <p>Tu carrito está vacío</p>}
        {Boolean(data.length) && (
          <div className="cart__container-list">
            <ul className="cart-list">
              {data.map((cartProduct) => (
                <li key={cartProduct.id}>
                  <CartProduct cartProduct={cartProduct} />
                </li>
              ))}
            </ul>
            <div>
                <p>
                  <span>Total</span>
                  <en>$ {total.toFixed(2)}</en>
                </p>
                <button onClick={handleCheckout} disabled={createPurchaseMutation.isLoading || isLoading}>Checkout</button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Cart