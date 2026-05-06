import React, { useState } from 'react';
import { useProducts } from '@repo/products'; // Adjust path as necessary
import { apiClient } from '@repo/api-client';

const Checkout = () => {
    const { products } = useProducts();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const handleSelectProduct = (product) => {
        // Logic to add product to selectedProducts
        setSelectedProducts((prev) => [...prev, product]);
        setTotal((prev) => prev + product.price);
    };

    const handleCheckout = async () => {
        try {
            const response = await apiClient.post('/sales', { products: selectedProducts });
            // Handle successful checkout, e.g., generate invoice
            console.log('Checkout successful:', response.data);
        } catch (error) {
            console.error('Checkout failed:', error);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleSelectProduct(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Total: ${total}</h2>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Checkout;
