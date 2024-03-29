import { useState } from "react";
import "./CartProduct.css";
import { useUpdateCart } from "../../../hooks/queries/useUpdateCart";
import { useSelector } from "react-redux";
import { useDeleteProductFromCart } from "../../../hooks/queries/useDeleteProductFromCart";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = Number(cartProduct.product.price);
  const deleteMutation = useDeleteProductFromCart();
  const { mutate, isLoading } = useUpdateCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const isLogged = useSelector((store) => store.authSlice.isLogged);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if (newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };
  const decrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  const handleUpdate = () => {
    if (isLogged) {
      mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
    }
  };
  const handleDelete = () => {
    if (isLogged) {
      deleteMutation.mutate(cartProduct.id);
    }
  };

  return (
    <article className="cart-product">
      <div className="cart-product__img-section">
        <div className="cart-product__img">
          <img
            src={cartProduct.product.images?.[0]?.url}
            alt={cartProduct.product.title}
          />
        </div>
      </div>
      <div className="cart-product__details">
        <header className="cart-product__header">
          <h4 className="cart-product__title">{cartProduct.product.title}</h4>
          <button
            className="cart-product__btn"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            <i className="bx bx-trash"></i>
          </button>
        </header>
        <div className="cart-product__controls-container">
          <div className="cart-product__controls">
            <button onClick={decrement} className="cart-product__btns-">
              -
            </button>
            <div className="cart-product__quantity-container">{quantity}</div>
            <button onClick={increment} className="cart-product__btns-">
              +
            </button>
          </div>
          {initialQuantity !== quantity && (
            <button onClick={handleUpdate} disabled={isLoading} className="cart-product__update-btn">
              Update cart
            </button>
          )}
        </div>
        <div className="cart-product__total-container">
          <h5>Total:</h5>
          <p>
            $ {(initialQuantity * price).toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
