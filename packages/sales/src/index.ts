import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { SaleOrder } from '@repo/types';

export const useSales = () => {
  const [sales, setSales] = useState<SaleOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchSales = async () => {
      try {
        const data = await apiClient.get<SaleOrder[]>('/sales');
        if (mounted) setSales(data ?? []);
      } catch (error) {
        console.error('Failed to load sales:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSales();
    return () => { mounted = false; };
  }, []);

  return { sales, loading };
};
