import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { Product } from '@repo/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Product[]>('/products');
      setProducts(data ?? []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (product: Partial<Product>) => {
    try {
      const response = await apiClient.post<Product>('/products', product);
      await fetchProducts();
      return response;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const response = await apiClient.post<Product>(`/products/${id}`, product);
      await fetchProducts();
      return response;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await apiClient.post(`/products/${id}/delete`, {});
      await fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  return { 
    products, 
    loading, 
    refresh: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
