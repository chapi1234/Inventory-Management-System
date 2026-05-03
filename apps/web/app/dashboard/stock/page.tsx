'use client';

import React, { useState, useMemo } from 'react';
import { Boxes, Search, X, AlertTriangle, CheckCircle, XCircle, ArrowUpDown, Edit2 } from 'lucide-react';
import { useStock } from '@repo/stock';
import type { StockItem } from '@repo/types';
import clsx from 'clsx';

function UpdateStockModal({ item, onClose }: { item: StockItem; onClose: () => void }) {
  const [qty, setQty] = useState(item.quantity.toString());
  const [minQty, setMinQty] = useState(item.minQuantity.toString());
  const [warehouse, setWarehouse] = useState(item.warehouse);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="text-lg font-bold text-white">Update Stock</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{item.sku}</p>
          </div>
          <button className="btn-icon" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className="modal-body space-y-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="font-medium text-slate-200">{item.productName}</div>
            <div className="text-xs text-slate-500 mt-0.5">{item.warehouse}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Current Quantity</label>
              <input className="form-input" type="number" min="0" value={qty} onChange={e => setQty(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Minimum Quantity</label>
              <input className="form-input" type="number" min="0" value={minQty} onChange={e => setMinQty(e.target.value)} />
            </div>
            <div className="col-span-2 form-group">
              <label className="form-label">Warehouse</label>
              <select className="form-select" value={warehouse} onChange={e => setWarehouse(e.target.value)}>
                <option>Main Hub</option>
                <option>East Coast Center</option>
                <option>West Coast Center</option>
                <option>Overflow Storage</option>
              </select>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <div className="text-xs text-slate-400 mb-1">Status Preview</div>
            <div className="text-sm font-medium">
              {parseInt(qty) <= 0
                ? <span className="text-red-400 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Will be Out of Stock</span>
                : parseInt(qty) <= parseInt(minQty)
                ? <span className="text-yellow-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />Will be Low Stock</span>
                : <span className="text-green-400 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Will be In Stock</span>}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function StockPage() {
  const { stock, loading } = useStock();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [editItem, setEditItem] = useState<StockItem | null>(null);

  const warehouses = ['All', ...Array.from(new Set(stock.map(s => s.warehouse)))];

  const filtered = useMemo(() =>
    stock.filter(item => {
      const matchSearch = !search || item.productName.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchWarehouse = warehouseFilter === 'All' || item.warehouse === warehouseFilter;
      return matchSearch && matchStatus && matchWarehouse;
    }),
    [stock, search, statusFilter, warehouseFilter]
  );

  const inStock = stock.filter(s => s.status === 'in_stock').length;
  const lowStock = stock.filter(s => s.status === 'low_stock').length;
  const outOfStock = stock.filter(s => s.status === 'out_of_stock').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {editItem && <UpdateStockModal item={editItem} onClose={() => setEditItem(null)} />}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Stock Management</h1>
          <p className="page-subtitle">Monitor inventory levels across all warehouses in real-time.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" /> Transfer Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card border-l-2 border-green-500/40">
          <div className="stat-icon bg-green-500/10 text-green-400"><CheckCircle className="w-5 h-5" /></div>
          <div>
            <div className="stat-value text-green-400">{inStock}</div>
            <div className="stat-label">In Stock</div>
          </div>
        </div>
        <div className="stat-card border-l-2 border-yellow-500/40">
          <div className="stat-icon bg-yellow-500/10 text-yellow-400"><AlertTriangle className="w-5 h-5" /></div>
          <div>
            <div className="stat-value text-yellow-400">{lowStock}</div>
            <div className="stat-label">Low Stock</div>
          </div>
        </div>
        <div className="stat-card border-l-2 border-red-500/40">
          <div className="stat-icon bg-red-500/10 text-red-400"><XCircle className="w-5 h-5" /></div>
          <div>
            <div className="stat-value text-red-400">{outOfStock}</div>
            <div className="stat-label">Out of Stock</div>
          </div>
        </div>
      </div>

      {/* Alert bar for critical items */}
      {(lowStock + outOfStock) > 0 && (
        <div className="glass rounded-xl px-5 py-3.5 flex items-center gap-3 border-yellow-500/20 bg-yellow-500/5">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="text-sm text-yellow-300 font-medium">
            {outOfStock > 0 && `${outOfStock} items are out of stock. `}
            {lowStock > 0 && `${lowStock} items are running low and need replenishment.`}
          </span>
          <button className="ml-auto btn-primary text-xs px-3 py-1.5 shrink-0">Create PO</button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-header">
          <div className="flex flex-wrap gap-3 flex-1">
            <div className="table-search max-w-xs">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or SKU..." />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <select
              className="form-select w-auto text-xs"
              value={warehouseFilter}
              onChange={e => setWarehouseFilter(e.target.value)}
            >
              {warehouses.map(w => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            {['all', 'in_stock', 'low_stock', 'out_of_stock'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  statusFilter === s
                    ? s === 'out_of_stock' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : s === 'low_stock' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : s === 'in_stock' ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/10 text-slate-200 border border-white/10'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5',
                  'capitalize'
                )}
              >
                {s === 'all' ? 'All' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Warehouse</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-20">
                  <div className="empty-state"><div className="spinner" />Loading stock data...</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6}>
                  <div className="empty-state">
                    <Boxes className="w-10 h-10 opacity-30" />
                    <span>No items match your filters</span>
                  </div>
                </td></tr>
              ) : filtered.map(item => {
                const pct = item.minQuantity > 0
                  ? Math.min(100, (item.quantity / (item.minQuantity * 3)) * 100)
                  : 100;
                const barColor = item.status === 'out_of_stock' ? 'bg-red-500'
                  : item.status === 'low_stock' ? 'bg-yellow-500'
                  : 'bg-green-500';
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          'w-10 h-10 rounded-xl border flex items-center justify-center',
                          item.status === 'out_of_stock' ? 'bg-red-500/10 border-red-500/20'
                            : item.status === 'low_stock' ? 'bg-yellow-500/10 border-yellow-500/20'
                            : 'bg-indigo-500/10 border-indigo-500/20'
                        )}>
                          <Boxes className={clsx('w-4 h-4',
                            item.status === 'out_of_stock' ? 'text-red-400'
                              : item.status === 'low_stock' ? 'text-yellow-400'
                              : 'text-indigo-400'
                          )} />
                        </div>
                        <span className="font-medium text-slate-200">{item.productName}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-slate-400">{item.sku}</td>
                    <td className="text-slate-400 text-sm">{item.warehouse}</td>
                    <td>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-slate-200">{item.quantity}</span>
                        <span className="text-xs text-slate-500">/ {item.minQuantity} min</span>
                      </div>
                      <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className={clsx('h-full rounded-full transition-all', barColor)} style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td>
                      {item.status === 'out_of_stock' && (
                        <span className="badge badge-red flex items-center gap-1.5"><XCircle className="w-3 h-3" />Out of Stock</span>
                      )}
                      {item.status === 'low_stock' && (
                        <span className="badge badge-yellow flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" />Low Stock</span>
                      )}
                      {item.status === 'in_stock' && (
                        <span className="badge badge-green flex items-center gap-1.5"><CheckCircle className="w-3 h-3" />In Stock</span>
                      )}
                    </td>
                    <td className="text-right">
                      <button
                        className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5 ml-auto"
                        onClick={() => setEditItem(item)}
                      >
                        <Edit2 className="w-3 h-3" /> Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filtered.length} of {stock.length} items</span>
          <span>{inStock} in stock · {lowStock} low · {outOfStock} empty</span>
        </div>
      </div>
    </div>
  );
}
