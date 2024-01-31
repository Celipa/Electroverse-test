import React from 'react'
import { ShoppingCart } from "../components/ShoppingCart"
import { useCart } from "../contexts/cartContext"
import { useNavigate } from 'react-router-dom'
import './CheckoutPage.css'

function CheckoutPage() {

  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
   console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  const checkout = async () => {
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Error: ${data.message}`); // Use server response for error message
      }
  
      const data = await response.json();
      console.log(data); // log the response data
      alert('Your order has been completed');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="Checkout">
      <div className="CheckoutPage">
        <ShoppingCart isCheckoutPage onCheckout={checkout} />
      </div>
    </div>
  )
}
export default CheckoutPage