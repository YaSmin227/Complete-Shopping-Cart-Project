import React from 'react'
import { useGetAllProductsQuery } from '../features/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
// import { useHistory } from 'react-router-dom';


const Home = () => {
  const { data, error, isloading } = useGetAllProductsQuery();
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cartItems)
  // const history = useHistory()

  return (
    <>
      <h2>New Arrivals</h2>
      <div className="products">
        {data &&
          data?.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={() => {
                dispatch(addToCart(product))
                console.log(cartItems)
              }}>
                Add To Cart
              </button>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home