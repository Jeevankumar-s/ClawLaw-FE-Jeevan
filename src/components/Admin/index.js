import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

const AddProductForm = () => {
    const categories = [
        "Fruits & Vegetables",
        "Cold Drinks & Juices",
        "Beverages",
        "Foodgrains, Oil & Masala",
        "Bakery, Cakes & Dairy",
        "Snacks & Branded Foods",
        "Eggs, Meat & Fish",
        "Gourmet & World Food",
        "Baby Care",
        "Cleaning & Household",
        "Beauty & Hygiene",
        "Kitchen, Garden & Pets",
        "Chocolates & Candies",
        "Dry Fruits",
        "Indian Mithai"
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [product, setProduct] = useState({
        id: '',
        name: '',
        weight: '',
        price: '',
        image: ''
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = Cookies.get('jwt_token')
        try {
            const response = await axios.post(`https://clawlaw-be-jeevan.onrender.com/products/category/${selectedCategory}/product`, product, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setInfo("Product added successfully");
            console.log('Product added:', response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Category:</label>
                <select value={selectedCategory} onChange={handleCategoryChange} required>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>ID:</label>
                <input type="text" name="id" value={product.id} onChange={handleChange} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Weight:</label>
                <input type="text" name="weight" value={product.weight} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="text" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" name="image" value={product.image} onChange={handleChange} required />
            </div>
            <button type="submit">Add Product</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {info && <p style={{ color: 'green' }}>{info}</p>}
        </form>
        <Footer/>
        </>
    );
};

export default AddProductForm;
