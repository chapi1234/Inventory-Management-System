import { useState, useEffect } from 'react';
import type { SaleOrder } from '@repo/types';

const MOCK_SALES: SaleOrder[] = [
  {
    id: '1', orderNumber: 'ORD-2026-001', customerName: 'Acme Corporation', customerEmail: 'orders@acme.com',
    items: [
      { productId: '1', productName: 'Wireless Noise-Canceling Headphones', quantity: 3, unitPrice: 299.99, subtotal: 899.97 },
      { productId: '7', productName: 'USB-C 7-in-1 Docking Hub', quantity: 5, unitPrice: 59.99, subtotal: 299.95 },
    ],
    totalAmount: 1199.92, taxAmount: 108.00, status: 'delivered', paymentStatus: 'paid',
    itemsCount: 8, shippingAddress: '123 Business Park, New York, NY', date: '2026-05-01T10:00:00Z'
  },
  {
    id: '2', orderNumber: 'ORD-2026-002', customerName: 'TechNova Inc.', customerEmail: 'procurement@technova.com',
    items: [
      { productId: '3', productName: 'Mechanical Keyboard', quantity: 10, unitPrice: 129.00, subtotal: 1290.00 },
      { productId: '2', productName: 'Ergonomic Office Chair Pro', quantity: 5, unitPrice: 549.00, subtotal: 2745.00 },
    ],
    totalAmount: 4035.00, taxAmount: 363.15, status: 'processing', paymentStatus: 'paid',
    itemsCount: 15, shippingAddress: '456 Tech Drive, San Francisco, CA', date: '2026-05-02T09:00:00Z'
  },
  {
    id: '3', orderNumber: 'ORD-2026-003', customerName: 'Global Retailers Ltd', customerEmail: 'supply@globalretailers.com',
    items: [
      { productId: '4', productName: 'Stainless Steel Water Bottle', quantity: 50, unitPrice: 34.99, subtotal: 1749.50 },
      { productId: '8', productName: 'Yoga Mat Premium', quantity: 20, unitPrice: 44.99, subtotal: 899.80 },
    ],
    totalAmount: 2649.30, taxAmount: 238.44, status: 'shipped', paymentStatus: 'paid',
    itemsCount: 70, shippingAddress: '789 Commerce Blvd, Chicago, IL', date: '2026-05-02T14:00:00Z'
  },
  {
    id: '4', orderNumber: 'ORD-2026-004', customerName: 'Jane Smith', customerEmail: 'jane.smith@email.com',
    items: [
      { productId: '5', productName: 'Smart LED Desk Lamp', quantity: 1, unitPrice: 89.99, subtotal: 89.99 },
    ],
    totalAmount: 89.99, taxAmount: 8.10, status: 'pending', paymentStatus: 'unpaid',
    itemsCount: 1, shippingAddress: '321 Elm St, Austin, TX', date: '2026-05-03T08:00:00Z'
  },
  {
    id: '5', orderNumber: 'ORD-2026-005', customerName: 'StartupHub LLC', customerEmail: 'ops@startuphub.io',
    items: [
      { productId: '6', productName: 'Portable Bluetooth Speaker', quantity: 8, unitPrice: 79.95, subtotal: 639.60 },
    ],
    totalAmount: 639.60, taxAmount: 57.56, status: 'pending', paymentStatus: 'partial',
    itemsCount: 8, shippingAddress: '555 Innovation Way, Seattle, WA', date: '2026-05-03T11:00:00Z'
  },
  {
    id: '6', orderNumber: 'ORD-2026-006', customerName: 'Office Solutions Co', customerEmail: 'orders@officesolutions.com',
    items: [
      { productId: '9', productName: 'Standing Desk Converter', quantity: 3, unitPrice: 219.00, subtotal: 657.00 },
    ],
    totalAmount: 657.00, taxAmount: 59.13, status: 'cancelled', paymentStatus: 'refunded',
    itemsCount: 3, shippingAddress: '900 Business Center, Houston, TX', date: '2026-04-28T10:00:00Z'
  },
];

export const useSales = () => {
  const [sales, setSales] = useState<SaleOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSales(MOCK_SALES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { sales, loading };
};
