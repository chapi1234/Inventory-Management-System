import { useState, useEffect } from 'react';
import { apiClient } from '@repo/api-client';
import type { StockItem, StockMovement } from '@repo/types';

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

  const updateStock = async (id: string, quantity: number) => {
    try {
      await apiClient.patch(`/stock/${id}`, { quantity });
      setStock(prev => prev.map(item => 
        item.id === id ? { ...item, quantity, lastUpdated: new Date().toISOString() } : item
      ));
    } catch (error) {
      console.error('Failed to update stock:', error);
      throw error;
    }
  };

  return { stock, loading, updateStock };
};

export const useLowStockAlerts = () => {
  const { stock, loading } = useStock();
  const alerts = stock.filter(item => item.quantity <= item.minQuantity);
  
  return { alerts, loading, hasAlerts: alerts.length > 0 };
};

export const useStockHistory = (productId?: string) => {
  const [history, setHistory] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchHistory = async () => {
      try {
        const endpoint = productId ? `/stock/history?productId=${productId}` : '/stock/history';
        const data = await apiClient.get<StockMovement[]>(endpoint);
        if (mounted) setHistory(data ?? []);
      } catch (error) {
        console.error('Failed to load stock history:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHistory();
    return () => { mounted = false; };
  }, [productId]);

  return { history, loading };
};
