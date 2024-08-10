import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { ProductList } from './ProductList';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://js2-ecommerce-api.vercel.app/api/products?category=${selectedCategory}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <Navbar setSelectedCategory={setSelectedCategory} />
      <ProductList products={products} />
    </div>
  );
};

export default Categories;