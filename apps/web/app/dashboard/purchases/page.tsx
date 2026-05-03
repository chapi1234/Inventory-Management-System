'use client';

import React, { useState } from 'react';
import { Truck, Plus, Search, X, Package, ChevronDown } from 'lucide-react';
import { usePurchases } from '@repo/purchases';
import clsx from 'clsx';

const STATUS_STYLES: Record<string, string> = {
  draft:     'badge badge-slate',
  ordered:   'badge badge-blue',
  received:  'badge badge-green',
  cancelled: 'badge badge-red',
};
const PAYMENT_STYLES: Record<string, string> = {
  unpaid:  'badge badge-red',
  partial: 'badge badge-yellow',
  paid:    'badge badge-green',
};

export default function PurchasesPage() {
  const { purchases, loading } = usePurchases();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = purchases.filter(p => {
    const matchSearch = !search ||
      p.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalValue = purchases.reduce((s, p) => s + p.totalAmount, 0);
  const ordered = purchases.filter(p => p.status === 'ordered').length;
  const received = purchases.filter(p => p.status === 'received').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Purchase Orders</h1>
          <p className="page-subtitle">Manage supplier orders and stock replenishment.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New PO
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-icon bg-blue-500/10 text-blue-400"><Truck className="w-5 h-5" /></div>
          <div>
            <div className="stat-value">{purchases.length}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-yellow-500/10 text-yellow-400"><Package className="w-5 h-5" /></div>
          <div>
            <div className="stat-value">{ordered}</div>
            <div className="stat-label">In Transit</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green-500/10 text-green-400"><Package className="w-5 h-5" /></div>
          <div>
            <div className="stat-value">${totalValue.toLocaleString()}</div>
            <div className="stat-label">Total PO Value</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {/* Toolbar */}
        <div className="table-header">
          <div className="table-search">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by PO number or supplier..."
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {['all', 'draft', 'ordered', 'received', 'cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
                  statusFilter === s
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Items</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="py-20 text-center">
                  <div className="empty-state"><div className="spinner" />Loading purchase orders...</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="empty-state"><Truck className="w-10 h-10 opacity-30" /><span>No purchase orders found</span></div>
                </td></tr>
              ) : filtered.map(po => (
                <React.Fragment key={po.id}>
                  <tr
                    className="cursor-pointer"
                    onClick={() => setExpandedId(expandedId === po.id ? null : po.id)}
                  >
                    <td className="w-10">
                      <ChevronDown className={clsx(
                        'w-4 h-4 text-slate-500 transition-transform',
                        expandedId === po.id && 'rotate-180'
                      )} />
                    </td>
                    <td className="font-medium text-slate-200">{po.poNumber}</td>
                    <td>
                      <div className="font-medium text-slate-300">{po.supplierName}</div>
                    </td>
                    <td className="text-slate-400 text-xs">
                      {po.expectedDeliveryDate
                        ? new Date(po.expectedDeliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'}
                    </td>
                    <td><span className={STATUS_STYLES[po.status]}>{po.status}</span></td>
                    <td><span className={PAYMENT_STYLES[po.paymentStatus]}>{po.paymentStatus}</span></td>
                    <td className="text-slate-400">{po.items.reduce((s, i) => s + i.quantity, 0)} units</td>
                    <td className="text-right font-bold text-slate-200">${po.totalAmount.toLocaleString()}</td>
                  </tr>
                  {/* Expanded items row */}
                  {expandedId === po.id && (
                    <tr className="bg-blue-500/5">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">Order Items</div>
                        <div className="space-y-2">
                          {po.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-black/20 border border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center">
                                  <Package className="w-3.5 h-3.5 text-blue-400" />
                                </div>
                                <span className="text-sm text-slate-300">{item.productName}</span>
                              </div>
                              <div className="flex items-center gap-8 text-sm">
                                <span className="text-slate-500">Qty: <span className="text-slate-300 font-medium">{item.quantity}</span></span>
                                <span className="text-slate-500">Unit: <span className="text-slate-300 font-medium">${item.unitCost.toFixed(2)}</span></span>
                                <span className="text-white font-semibold">${item.subtotal.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-end gap-3">
                          {po.status === 'ordered' && (
                            <button className="btn-primary text-xs px-4 py-2">Mark as Received</button>
                          )}
                          {po.status === 'draft' && (
                            <button className="btn-secondary text-xs px-4 py-2">Submit PO</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filtered.length} of {purchases.length} purchase orders</span>
          <span>{received} received · {ordered} in transit</span>
        </div>
      </div>
    </div>
  );
}
