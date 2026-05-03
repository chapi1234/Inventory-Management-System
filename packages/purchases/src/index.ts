import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { PurchaseOrder } from '@repo/types';

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPurchases = async () => {
      try {
        const data = await apiClient.get<PurchaseOrder[]>('/purchases');
        if (mounted) setPurchases(data ?? []);
      } catch (error) {
        console.error('Failed to load purchases:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPurchases();
    return () => { mounted = false; };
  }, []);

  return { purchases, loading };
};
