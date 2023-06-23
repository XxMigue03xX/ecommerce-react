import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import { useCreatePurchase } from "../../../hooks/queries/useCreatePurchase";
import CartProduct from "../CartProduct/CartProduct";
import emptyCart from "../../../assets/images/empty-cart.png"
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

  return (
    <div className={toggleCart}>
      <aside className="cart">
        {isLoading && (
          <p>Loading Cart...</p>
        )}
        {isError && (
          <p>{error.message ?? "No se pudo cargar el estado del carrito"}</p>
        )}
        {!isLoading && !isError && (
                  <>
                  <h2 className="cart__title">Shopping Cart</h2>
                {!data.length && (
                  <div className="empty-container">
                    <p className="empty-cart">Add products</p>
                    <div className="empty-cart__img">
                      <img src={emptyCart} alt="empty-cart" />
                    </div>
                  </div>
                )}
                {Boolean(data.length) && (
                  <div className="cart__container-list">
                    <ul className="cart-list">
                      {data.map((cartProduct) => (
                        <li key={cartProduct.id}>
                          <CartProduct cartProduct={cartProduct} />
                        </li>
                      ))}
                    </ul>
                    <div className="cart__checkout-section">
                        <p className="cart__checkout-section__total">
                          <span>Total:</span>
                          <en className="cart__checkout-section__total__value">${total.toFixed(2)}</en>
                        </p>
                        <button onClick={handleCheckout} disabled={createPurchaseMutation.isLoading || isLoading} className="cart__checkout-btn">Checkout</button>
                    </div>
                  </div>
                )}
                </>
        )}
      </aside>
    </div>
  );
}

export default Cart