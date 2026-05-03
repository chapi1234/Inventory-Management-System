import { useState, useEffect } from 'react';
import type { PurchaseOrder } from '@repo/types';

const MOCK_PURCHASES: PurchaseOrder[] = [
  {
    id: '1', poNumber: 'PO-2026-001', supplierId: '1', supplierName: 'AudioTech Global',
    items: [
      { productId: '1', productName: 'Wireless Noise-Canceling Headphones', quantity: 50, unitCost: 180.00, subtotal: 9000.00 },
      { productId: '6', productName: 'Portable Bluetooth Speaker', quantity: 30, unitCost: 40.00, subtotal: 1200.00 },
    ],
    totalAmount: 10200.00, status: 'received', paymentStatus: 'paid',
    expectedDeliveryDate: '2026-04-20T00:00:00Z', createdAt: '2026-04-10T10:00:00Z'
  },
  {
    id: '2', poNumber: 'PO-2026-002', supplierId: '2', supplierName: 'ErgoFurniture Co',
    items: [
      { productId: '2', productName: 'Ergonomic Office Chair Pro', quantity: 20, unitCost: 290.00, subtotal: 5800.00 },
      { productId: '9', productName: 'Standing Desk Converter', quantity: 10, unitCost: 110.00, subtotal: 1100.00 },
    ],
    totalAmount: 6900.00, status: 'ordered', paymentStatus: 'partial',
    expectedDeliveryDate: '2026-05-15T00:00:00Z', createdAt: '2026-05-01T09:00:00Z'
  },
  {
    id: '3', poNumber: 'PO-2026-003', supplierId: '3', supplierName: 'TechPeripherals Inc',
    items: [
      { productId: '3', productName: 'Mechanical Keyboard', quantity: 40, unitCost: 65.00, subtotal: 2600.00 },
      { productId: '7', productName: 'USB-C 7-in-1 Docking Hub', quantity: 50, unitCost: 25.00, subtotal: 1250.00 },
    ],
    totalAmount: 3850.00, status: 'ordered', paymentStatus: 'unpaid',
    expectedDeliveryDate: '2026-05-20T00:00:00Z', createdAt: '2026-05-02T11:00:00Z'
  },
  {
    id: '4', poNumber: 'PO-2026-004', supplierId: '4', supplierName: 'HomeGoods Direct',
    items: [
      { productId: '4', productName: 'Stainless Steel Water Bottle', quantity: 100, unitCost: 12.00, subtotal: 1200.00 },
    ],
    totalAmount: 1200.00, status: 'draft', paymentStatus: 'unpaid',
    expectedDeliveryDate: '2026-05-25T00:00:00Z', createdAt: '2026-05-03T08:00:00Z'
  },
];

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPurchases(MOCK_PURCHASES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { purchases, loading };
};
