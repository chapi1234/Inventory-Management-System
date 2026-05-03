'use client';

import React, { useState, useMemo } from 'react';
import {
  Package, Plus, Search, X, MoreVertical, Filter,
  Edit2, Trash2, Eye, Tag, TrendingUp, Archive
} from 'lucide-react';
import { useProducts } from '@repo/products';
import type { Product } from '@repo/types';
import clsx from 'clsx';

const STATUS_MAP: Record<string, string> = {
  active:   'badge badge-green',
  draft:    'badge badge-slate',
  archived: 'badge badge-red',
};

const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Home Goods', 'Smart Home', 'Sports'];

function ProductModal({
  product,
  onClose,
}: {
  product?: Product;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    category: product?.category ?? 'Electronics',
    price: product?.price?.toString() ?? '',
    costPrice: product?.costPrice?.toString() ?? '',
    description: product?.description ?? '',
    status: product?.status ?? 'active',
  });
  const isEdit = !!product;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{isEdit ? `Editing ${product?.sku}` : 'Fill in the details below'}</p>
          </div>
          <button className="btn-icon" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className="modal-body space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 form-group">
              <label className="form-label">Product Name *</label>
              <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Wireless Headphones" />
            </div>
            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input className="form-input font-mono" value={form.sku} onChange={e => setForm(p => ({ ...p, sku: e.target.value }))} placeholder="AUDIO-001" />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Selling Price *</label>
              <input className="form-input" type="number" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Cost Price</label>
              <input className="form-input" type="number" step="0.01" value={form.costPrice} onChange={e => setForm(p => ({ ...p, costPrice: e.target.value }))} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Product['status'] }))}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="col-span-2 form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input resize-none"
                rows={3}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Brief product description..."
              />
            </div>
          </div>
          {form.price && form.costPrice && (
            <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Estimated Margin</span>
              <span className="text-sm font-bold text-green-400">
                {(((parseFloat(form.price) - parseFloat(form.costPrice)) / parseFloat(form.price)) * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary">{isEdit ? 'Save Changes' : 'Create Product'}</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = useMemo(() =>
    products.filter(p => {
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    }),
    [products, search, categoryFilter, statusFilter]
  );

  const totalValue = products
    .filter(p => p.status === 'active')
    .reduce((s, p) => s + p.price, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(undefined); }}
        />
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your inventory catalog, SKUs, and pricing.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => { setEditProduct(undefined); setShowModal(true); }}>
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500/10 text-blue-400' },
          { label: 'Active SKUs', value: products.filter(p => p.status === 'active').length, icon: Tag, color: 'bg-green-500/10 text-green-400' },
          { label: 'Draft Products', value: products.filter(p => p.status === 'draft').length, icon: Edit2, color: 'bg-yellow-500/10 text-yellow-400' },
          { label: 'Catalog Value', value: `$${totalValue.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-500/10 text-purple-400' },
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

      {/* Table */}
      <div className="table-wrapper">
        {/* Toolbar */}
        <div className="table-header">
          <div className="flex flex-wrap gap-3 flex-1">
            <div className="table-search max-w-xs">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, SKU..."
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 bg-black/20 rounded-xl p-1 border border-white/5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                    categoryFilter === cat
                      ? 'bg-white/10 text-slate-200'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >{cat}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['all', 'active', 'draft', 'archived'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                  statusFilter === s
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5'
                )}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Margin</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-20">
                  <div className="empty-state"><div className="spinner" />Loading products...</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state">
                    <Package className="w-10 h-10 opacity-30" />
                    <span>No products match your filters</span>
                    <button className="btn-ghost text-xs" onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('all'); }}>
                      Clear filters
                    </button>
                  </div>
                </td></tr>
              ) : filtered.map(product => {
                const margin = product.costPrice
                  ? ((product.price - product.costPrice) / product.price * 100)
                  : null;
                return (
                  <tr key={product.id} className="relative">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/5 flex items-center justify-center">
                          <Package className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">{product.name}</div>
                          {product.description && (
                            <div className="text-xs text-slate-500 truncate max-w-[220px]">{product.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-slate-400">{product.sku}</td>
                    <td>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="font-semibold text-slate-200">${product.price.toFixed(2)}</td>
                    <td>
                      {margin !== null ? (
                        <span className={clsx(
                          'text-xs font-medium',
                          margin >= 40 ? 'text-green-400' : margin >= 20 ? 'text-yellow-400' : 'text-red-400'
                        )}>
                          {margin.toFixed(1)}%
                        </span>
                      ) : <span className="text-slate-600">—</span>}
                    </td>
                    <td>
                      <span className={STATUS_MAP[product.status]}>
                        {product.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="btn-icon" onClick={() => { setEditProduct(product); setShowModal(true); }}>
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="btn-icon text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filtered.length} of {products.length} products</span>
          <span>${totalValue.toLocaleString()} catalog value</span>
        </div>
      </div>
    </div>
  );
}
