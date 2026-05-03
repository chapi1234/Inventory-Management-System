import { useState, useEffect } from 'react';
import type { StockItem } from '@repo/types';

const MOCK_STOCK: StockItem[] = [
  { id: '1', productId: '1', productName: 'Wireless Noise-Canceling Headphones', sku: 'AUDIO-001', warehouse: 'Main Hub', quantity: 45, minQuantity: 20, status: 'in_stock', lastUpdated: '2025-05-01T10:00:00Z' },
  { id: '2', productId: '2', productName: 'Ergonomic Office Chair Pro', sku: 'FURN-042', warehouse: 'East Coast Center', quantity: 8, minQuantity: 15, status: 'low_stock', lastUpdated: '2025-05-02T09:00:00Z' },
  { id: '3', productId: '3', productName: 'Mechanical Keyboard (Cherry MX Red)', sku: 'COMP-105', warehouse: 'Main Hub', quantity: 0, minQuantity: 10, status: 'out_of_stock', lastUpdated: '2025-04-28T12:00:00Z' },
  { id: '4', productId: '4', productName: 'Stainless Steel Water Bottle 32oz', sku: 'HOME-088', warehouse: 'West Coast Center', quantity: 215, minQuantity: 50, status: 'in_stock', lastUpdated: '2025-05-01T08:00:00Z' },
  { id: '5', productId: '5', productName: 'Smart LED Desk Lamp (Color)', sku: 'SMART-201', warehouse: 'Main Hub', quantity: 6, minQuantity: 30, status: 'low_stock', lastUpdated: '2025-04-30T15:00:00Z' },
  { id: '6', productId: '6', productName: 'Portable Bluetooth Speaker', sku: 'AUDIO-015', warehouse: 'Main Hub', quantity: 72, minQuantity: 25, status: 'in_stock', lastUpdated: '2025-05-02T11:00:00Z' },
  { id: '7', productId: '7', productName: 'USB-C 7-in-1 Docking Hub', sku: 'COMP-220', warehouse: 'East Coast Center', quantity: 33, minQuantity: 20, status: 'in_stock', lastUpdated: '2025-05-01T14:00:00Z' },
  { id: '8', productId: '8', productName: 'Yoga Mat Premium (6mm)', sku: 'SPORT-011', warehouse: 'West Coast Center', quantity: 3, minQuantity: 20, status: 'low_stock', lastUpdated: '2025-04-29T10:00:00Z' },
];

export const useStock = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStock(MOCK_STOCK);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { stock, loading };
};
