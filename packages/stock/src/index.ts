import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { StockItem } from '@repo/types';

export const useStock = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStock = async () => {
      try {
        const data = await apiClient.get<StockItem[]>('/stock');
        if (mounted) setStock(data ?? []);
      } catch (error) {
        console.error('Failed to load stock:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStock();
    return () => { mounted = false; };
  }, []);

  return { stock, loading };
};
