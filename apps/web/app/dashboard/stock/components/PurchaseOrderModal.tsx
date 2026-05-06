'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { usePurchases } from '@repo/purchases';
import { StockItem, Supplier } from '@repo/types';

interface PurchaseOrderModalProps {
  item: StockItem;
  suppliers: Supplier[];
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({ item, suppliers, isOpen, onClose }) => {
  const { createPurchaseOrder } = usePurchases();
  const [quantity, setQuantity] = useState(item.minQuantity * 2);
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supplier = suppliers.find(s => s.id === supplierId);
      await createPurchaseOrder({
        poNumber: `PO-${Math.floor(Math.random() * 1000000)}`,
        supplierId,
        supplierName: supplier?.name || 'Unknown',
        items: [
          {
            productId: item.productId,
            productName: item.productName,
            quantity: Number(quantity),
            unitCost: 0, // In real app, fetch from product/supplier agreement
            subtotal: 0
          }
        ],
        status: 'ordered',
        paymentStatus: 'unpaid',
        createdAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      alert('Failed to create PO');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Generate Purchase Order</h2>
        <p className="text-gray-500 mb-6">Create PO for {item.productName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="Order Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Create PO
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
