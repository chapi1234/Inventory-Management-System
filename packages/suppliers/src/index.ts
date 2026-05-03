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

  return { suppliers, loading };
};
