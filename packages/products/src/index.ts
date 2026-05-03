import { useState, useEffect } from 'react';
import type { Product } from '@repo/types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Wireless Noise-Canceling Headphones', sku: 'AUDIO-001', category: 'Electronics', description: 'Premium over-ear headphones with ANC technology.', price: 299.99, costPrice: 180.00, status: 'active', createdAt: '2025-01-15T10:00:00Z' },
  { id: '2', name: 'Ergonomic Office Chair Pro', sku: 'FURN-042', category: 'Furniture', description: 'Lumbar-support mesh chair with adjustable armrests.', price: 549.00, costPrice: 290.00, status: 'active', createdAt: '2025-02-03T09:30:00Z' },
  { id: '3', name: 'Mechanical Keyboard (Cherry MX Red)', sku: 'COMP-105', category: 'Electronics', description: 'TKL layout, RGB backlit, linear switches.', price: 129.00, costPrice: 65.00, status: 'active', createdAt: '2025-02-18T11:00:00Z' },
  { id: '4', name: 'Stainless Steel Water Bottle 32oz', sku: 'HOME-088', category: 'Home Goods', description: 'Double-wall insulated, keeps cold for 24h.', price: 34.99, costPrice: 12.00, status: 'active', createdAt: '2025-03-01T08:00:00Z' },
  { id: '5', name: 'Smart LED Desk Lamp (Color)', sku: 'SMART-201', category: 'Smart Home', description: 'App-controlled, 16M colors, USB-C charging pad.', price: 89.99, costPrice: 38.00, status: 'active', createdAt: '2025-03-12T14:00:00Z' },
  { id: '6', name: 'Portable Bluetooth Speaker', sku: 'AUDIO-015', category: 'Electronics', description: 'IPX7 waterproof, 360° sound, 24h battery.', price: 79.95, costPrice: 40.00, status: 'active', createdAt: '2025-04-05T10:00:00Z' },
  { id: '7', name: 'USB-C 7-in-1 Docking Hub', sku: 'COMP-220', category: 'Electronics', description: '4K HDMI, USB-A x3, SD card reader, PD 100W.', price: 59.99, costPrice: 25.00, status: 'active', createdAt: '2025-04-20T12:00:00Z' },
  { id: '8', name: 'Yoga Mat Premium (6mm)', sku: 'SPORT-011', category: 'Sports', description: 'Non-slip TPE material, carrying strap included.', price: 44.99, costPrice: 18.00, status: 'active', createdAt: '2025-05-01T09:00:00Z' },
  { id: '9', name: 'Standing Desk Converter', sku: 'FURN-099', category: 'Furniture', description: 'Height-adjustable sit-stand converter for any desk.', price: 219.00, costPrice: 110.00, status: 'draft', createdAt: '2025-05-10T15:00:00Z' },
  { id: '10', name: 'Webcam 4K AutoFocus', sku: 'COMP-330', category: 'Electronics', description: '4K 30fps, dual mic noise cancellation, plug & play.', price: 149.99, costPrice: 70.00, status: 'archived', createdAt: '2025-01-01T08:00:00Z' },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
};
