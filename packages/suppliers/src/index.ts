import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { Supplier } from '@repo/types';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchSuppliers = async () => {
      try {
        const data = await apiClient.get<Supplier[]>('/suppliers');
        if (mounted) setSuppliers(data ?? []);
      } catch (error) {
        console.error('Failed to load suppliers:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSuppliers();
    return () => { mounted = false; };
  }, []);

  const addSupplier = async (supplier: Omit<Supplier, 'id' | 'createdAt'>) => {
    try {
      const newSupplier = await apiClient.post<Supplier>('/suppliers', supplier);
      if (newSupplier) setSuppliers(prev => [...prev, newSupplier]);
    } catch (error) {
      console.error('Failed to add supplier:', error);
      throw error;
    }
  };

  const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
    try {
      await apiClient.patch(`/suppliers/${id}`, updates);
      setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    } catch (error) {
      console.error('Failed to update supplier:', error);
      throw error;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await apiClient.delete(`/suppliers/${id}`);
      setSuppliers(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete supplier:', error);
      throw error;
    }
  };

  return { suppliers, loading, addSupplier, updateSupplier, deleteSupplier };
};
