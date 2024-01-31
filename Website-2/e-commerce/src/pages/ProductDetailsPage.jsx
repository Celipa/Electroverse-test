import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BiSolidCartAdd } from "react-icons/bi"
import { useCart } from "../contexts/cartContext";
import './ProductDetailsPage.css'


function ProductDetailsPage() {

  const { productId } = useParams()

  // const dispatch = useDispatch()

  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`)

        setProduct(res.data)
        setLoading(false)
        
      } catch (err) {
        setError('Something went wrong!')
        console.error(err.message)
      }
    }

    getProduct()
  }, [])
  
  const handleClick = () => {
    // dispatch(addToCart(product))
    addToCart(product)
  }

  if(loading) {
    return (
      <p>Loading...</p>
    )
  }

  if(!product) return null

  return (
    <div className="Product-detail">
      <div className="Product-images">
        <img src={product.images[activeImg]} alt="product image" className="big-image" />
        <div className="Images-small">
          {product.images.map((image, index) => (
            <div key={index} onClick={() => setActiveImg(index)} className="next-img">
              <img src={image} className="product-img"/>
            </div>
          ))}

        </div>
      </div>
      <div className="details">
        <h1 className="product-name">{ product.name }</h1>
        <p>____________________________________________________________________________</p>
        <div className="purchase-details">
          <p className="product-price">Price: <span>{product.price}</span> kr</p>
          <button onClick={handleClick} className="Add-btn">
            Add To Cart 
            <BiSolidCartAdd className="CartIcon" />
          </button>
        </div>
        <p className="product-desc">{product.description}</p>
      </div>
    </div>
  )
}
export default ProductDetailsPage