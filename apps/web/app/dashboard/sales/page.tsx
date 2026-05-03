'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, Search, X, Plus, CheckCircle2, Clock,
  Truck, XCircle, Eye, DollarSign, Package, TrendingUp
} from 'lucide-react';
import { useSales } from '@repo/sales';
import type { SaleOrder } from '@repo/types';
import clsx from 'clsx';

const STATUS_CONFIG = {
  pending:    { class: 'badge badge-yellow', icon: Clock },
  processing: { class: 'badge badge-blue', icon: Package },
  shipped:    { class: 'badge badge-purple', icon: Truck },
  delivered:  { class: 'badge badge-green', icon: CheckCircle2 },
  cancelled:  { class: 'badge badge-red', icon: XCircle },
};
const PAYMENT_CONFIG = {
  unpaid:   'badge badge-red',
  partial:  'badge badge-yellow',
  paid:     'badge badge-green',
  refunded: 'badge badge-slate',
};

function OrderDetailModal({ order, onClose }: { order: SaleOrder; onClose: () => void }) {
  const cfg = STATUS_CONFIG[order.status];
  const StatusIcon = cfg.icon;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="text-lg font-bold text-white">{order.orderNumber}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{new Date(order.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={cfg.class}><StatusIcon className="w-3 h-3" /> {order.status}</span>
            <button className="btn-icon" onClick={onClose}><X className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="modal-body space-y-5">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/20 border border-white/5">
              <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Customer</div>
              <div className="font-semibold text-slate-200">{order.customerName}</div>
              {order.customerEmail && <div className="text-xs text-slate-400 mt-0.5">{order.customerEmail}</div>}
            </div>
            <div className="p-4 rounded-xl bg-black/20 border border-white/5">
              <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Payment</div>
              <span className={PAYMENT_CONFIG[order.paymentStatus]}>{order.paymentStatus}</span>
            </div>
            {order.shippingAddress && (
              <div className="col-span-2 p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Shipping Address</div>
                <div className="text-sm text-slate-300">{order.shippingAddress}</div>
              </div>
            )}
          </div>

          {/* Items */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Order Items</div>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Package className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">{item.productName}</div>
                      <div className="text-xs text-slate-500">Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-slate-200">${item.subtotal.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-white/5 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Subtotal</span>
              <span>${(order.totalAmount - (order.taxAmount ?? 0)).toFixed(2)}</span>
            </div>
            {order.taxAmount && (
              <div className="flex justify-between text-sm text-slate-400">
                <span>Tax</span>
                <span>${order.taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white border-t border-white/5 pt-2">
              <span>Total</span>
              <span className="text-green-400">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {order.status === 'pending' && <button className="btn-primary text-sm">Mark Processing</button>}
          {order.status === 'processing' && <button className="btn-primary text-sm">Mark Shipped</button>}
          {order.status === 'shipped' && <button className="btn-primary text-sm">Mark Delivered</button>}
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function SalesPage() {
  const { sales, loading } = useSales();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);

  const filtered = useMemo(() =>
    sales.filter(s => {
      const matchSearch = !search ||
        s.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchStatus;
    }),
    [sales, search, statusFilter]
  );

  const totalRevenue = sales.filter(s => s.status !== 'cancelled').reduce((sum, s) => sum + s.totalAmount, 0);
  const pendingOrders = sales.filter(s => s.status === 'pending' || s.status === 'processing').length;
  const deliveredOrders = sales.filter(s => s.status === 'delivered').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales Orders</h1>
          <p className="page-subtitle">Track customer orders, fulfillment pipeline, and revenue.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500/10 text-green-400' },
          { label: 'Total Orders', value: sales.length, icon: ShoppingCart, color: 'bg-blue-500/10 text-blue-400' },
          { label: 'To Fulfill', value: pendingOrders, icon: Clock, color: 'bg-yellow-500/10 text-yellow-400' },
          { label: 'Delivered', value: deliveredOrders, icon: CheckCircle2, color: 'bg-purple-500/10 text-purple-400' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card">
              <div className={clsx('stat-icon', stat.color)}><Icon className="w-5 h-5" /></div>
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kanban-style pipeline summary */}
      <div className="grid grid-cols-5 gap-3">
        {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(status => {
          const count = sales.filter(s => s.status === status).length;
          const revenue = sales.filter(s => s.status === status).reduce((s, o) => s + o.totalAmount, 0);
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              className={clsx(
                'glass rounded-xl p-4 text-left transition-all duration-200 hover:bg-white/10 border',
                statusFilter === status ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/5'
              )}
            >
              <div className={clsx('badge mb-3 text-[10px]', cfg.class)}>
                <Icon className="w-3 h-3" /> {status}
              </div>
              <div className="text-xl font-bold text-white">{count}</div>
              <div className="text-xs text-slate-500">${revenue.toLocaleString()}</div>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-header">
          <div className="table-search max-w-xs">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Order number or customer..." />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {statusFilter !== 'all' && (
            <button className="badge badge-blue cursor-pointer hover:bg-blue-500/20" onClick={() => setStatusFilter('all')}>
              {statusFilter} <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Items</th>
                <th className="text-right">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="py-20">
                  <div className="empty-state"><div className="spinner" />Loading orders...</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="empty-state">
                    <ShoppingCart className="w-10 h-10 opacity-30" />
                    <span>No orders found</span>
                  </div>
                </td></tr>
              ) : filtered.map(sale => {
                const cfg = STATUS_CONFIG[sale.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={sale.id}>
                    <td className="font-medium text-slate-200">{sale.orderNumber}</td>
                    <td className="text-slate-400 text-sm">
                      {new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td>
                      <div className="font-medium text-slate-300">{sale.customerName}</div>
                      {sale.customerEmail && <div className="text-xs text-slate-500">{sale.customerEmail}</div>}
                    </td>
                    <td>
                      <span className={clsx(cfg.class, 'flex items-center gap-1.5 w-fit')}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{sale.status}</span>
                      </span>
                    </td>
                    <td>
                      <span className={PAYMENT_CONFIG[sale.paymentStatus]}>{sale.paymentStatus}</span>
                    </td>
                    <td className="text-slate-400">{sale.itemsCount} items</td>
                    <td className="text-right font-bold text-slate-200">${sale.totalAmount.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-icon"
                        onClick={() => setSelectedOrder(sale)}
                        title="View order details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filtered.length} of {sales.length} orders</span>
          <span>Revenue: ${totalRevenue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
