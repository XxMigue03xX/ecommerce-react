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
    <section className='product-detail'>
      <section className='product-detail__info'>
        <div className='product-detail__img-section'>
          <div className='product-detail__img-container'>
            <img src={data.images[0].url} alt={data.title} />
          </div>
        </div>
        <div className='product-detail__details'>
          <h3 className='product-detail__brand'>{data.brand}</h3>
          <h2 className='product-detail__title'>{data.title}</h2>
          <p className='product-detail__description'>
            {data.description}
          </p>
          <div className='product-detail__price-and-quantity'>
            <div className='product-detail__price-section'>
              <h3 className='product-detail__price-label'>Price</h3>
              <p className='product-detail__price-content'>
                <en>$ {data.price}</en>
              </p>
            </div>
            <div className='product-detail__quantity-section'>
              <h3 className='product-detail__quantity-label'>Quantity</h3>
              <div className='product-detail__quantity-container'>
                <button className='product-detail__quantity-btn' onClick={decrement}>-</button>
                <div className='product-detail__quantity-content'>{quantity}</div>
                <button className='product-detail__quantity-btn' onClick={increment}>+</button>
              </div>
            </div>
          </div>
          {!isProductInCart && (
            <button className='product-detail__add-btn' onClick={handleAddToCart}>
              <p>Add to cart</p>
              <i className='bx bx-cart' ></i>
            </button>
          )}
          {isProductInCart && (
            <button className='product-detail__add-btn'>
              <p>Update in cart</p>
              <i className='bx bx-cart' ></i>
            </button>
          )}
        </div>
      </section>
      <h4>Discover similar items</h4>
      <ProductList categories={data.categoryId} excludedIds={[Number(productId)]}/>
    </section>
  );
};

export default ProductDetail