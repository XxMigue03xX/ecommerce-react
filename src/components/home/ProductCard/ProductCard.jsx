import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useAddProductToCart } from "../../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";

const ProductCard = ({ product }) => {
  // La peticion solo se ejecuta cuando se ejecuta mutate
  const { mutate } = useAddProductToCart();
  const { data, isLoading, isError } = useCart();
  const isLogged = useSelector((store) => store.authSlice.isLogged);
  const navigate = useNavigate();

  const isProductInCart = data?.some(
    cartProduct => cartProduct.productId === product.id
  );

  const isAddVisible = !isLogged || !isProductInCart;

  const handleAdd = (e) => {
    e.preventDefault();

    if(!isLogged) {
      navigate("/login");
    } else {
      mutate({ quantity: 1, productId: product.id})
    }
  };

  return (
    <Link
      style={{ color: "unset", textDecoration: "none" }}
      to={"/product/" + product.id}
    >
      <article className="product-cart">
        <header className="product-cart__header">
          <div className="product-cart__container-img">
            <img
              className="product-cart__img product-cart__container-img--visible"
              src={product.images[0].url}
              alt={product.title + "image 1"}
            />
            <img
              className="product-cart__img product-cart__container-img--hidden"
              src={product.images[1].url}
              alt={product.title + "image 2"}
            />
          </div>
        </header>

        <section className="product-cart__body">
          <p className="product__brand">{product.brand}</p>
          <strong className="product__title">{product.title}</strong>
          <p className="product__price-label">Price</p>
          <strong className="product__price-value">
            <en>$ {product.price}</en>
          </strong>
          {Boolean(isProductInCart) && <p>Already in cart</p>}
        </section>
        {isAddVisible && (
          <button
            className="product-cart__btn"
            onClick={handleAdd}
            disabled={isLoading}
          >
            <i className="bx bxs-cart-add"></i>
          </button>
        )}
      </article>
    </Link>
  );
};

export default ProductCard;
