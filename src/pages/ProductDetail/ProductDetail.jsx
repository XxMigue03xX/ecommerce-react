import { useNavigate, useParams } from 'react-router-dom';
import { useProductById } from '../../hooks/queries/useProductById';
import ProductList from '../../components/home/ProductList/ProductList.jsx';
import { useEffect, useState } from 'react';
import { useAddProductToCart } from '../../hooks/queries/useAddProductToCart';
import { useSelector } from 'react-redux';
import { useCart } from '../../hooks/queries/useCart';
import './ProductDetail.css'

const ProductDetail = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.authSlice.isLogged);
  const { productId } = useParams();
  const { mutate } = useAddProductToCart();
  const cartQuery = useCart();
  const { data, isLoading, isError, error } = useProductById(productId);
  
  const isProductInCart = cartQuery.data?.some(
    cartProduct => cartProduct.productId === data?.id
  ) ?? false;
    
  const quantityInCart = cartQuery.data?.find(cartProduct => Number(cartProduct.productId) === Number(productId))?.quantity ?? 1;
    
  const [quantity, setQuantity] = useState(Number(quantityInCart));

  const increment = () => {
    const newQuantity = quantity+1
    const stock = 10;
    if(newQuantity<=stock){
      setQuantity(newQuantity);
    }
  }
  const decrement = () => {
    const newQuantity = quantity-1;
    if(newQuantity>=1){
      setQuantity(newQuantity);
    }
  }

  const handleAddToCart = () => {
    if(isLogged) mutate({quantity, productId})
    else navigate("/login");
  }

  useEffect(() => {
    setQuantity(Number(quantityInCart));
  }, [quantityInCart])

  if(isLoading) return <p>Loading product</p>;

  if(isError) return <p>{error.message ?? "No se pudo cargar el producto"}</p>
  
  return (
    <section>
      <section>
        <div>
          <img src={data.images[0].url} alt={data.title} />
        </div>
        {productId}

        <div>
          <h3>{data.brand}</h3>
          <h2>{data.title}</h2>

          <p>
            {data.description}
          </p>

          <div>
            <div>
              <h3>Price</h3>
              <p>
                <en>$ {data.price}</en>
              </p>
            </div>
            <div>
              <h3>Quantity</h3>
              <div>
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
              </div>
            </div>
          </div>
          {!isProductInCart && (
            <button onClick={handleAddToCart}>Add to cart</button>
          )}
          {isProductInCart && (
            <button>Update in cart</button>
          )}
        </div>
      </section>

      <ProductList categories={data.categoryId} excludedIds={[Number(productId)]}/>
    </section>
  );
};

export default ProductDetail