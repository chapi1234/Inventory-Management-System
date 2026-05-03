export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  price: number;
  costPrice?: number;
  status: 'active' | 'draft' | 'archived';
  imageUrl?: string;
  createdAt: string;
}

export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  warehouse: string;
  quantity: number;
  minQuantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  items: SaleItem[];
  totalAmount: number;
  taxAmount?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'partial' | 'refunded';
  itemsCount: number;
  shippingAddress?: string;
  notes?: string;
  date: string;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  totalAmount: number;
  status: 'draft' | 'ordered' | 'received' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'partial';
  expectedDeliveryDate?: string;
  notes?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  address?: string;
  taxId?: string;
  status: 'active' | 'inactive';
  rating?: number;
  totalOrders?: number;
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  status: 'active' | 'inactive';
  lastLoginAt?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'purchases' | 'custom';
  createdBy: string;
  lastRunAt?: string;
  schedule?: string;
  createdAt: string;
}
