import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { Product } from '@repo/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const createProduct = async (product) => {
    try {
        const response = await apiClient.post('/products', product);
        return response.data;
    } catch (error) {
        console.error('Failed to create product:', error);
    }
};

const updateProduct = async (id, product) => {
    try {
        const response = await apiClient.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to update product:', error);
    }
};

const deleteProduct = async (id) => {
    try {
        await apiClient.delete(`/products/${id}`);
    } catch (error) {
        console.error('Failed to delete product:', error);
    }
};

const fetchProducts = async () => {
      try {
        const data = await apiClient.get<Product[]>('/products');
        if (mounted) setProducts(data ?? []);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  return { products, loading };
};
