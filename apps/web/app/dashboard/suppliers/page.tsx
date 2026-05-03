'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, X, Star, Mail, Phone, MapPin } from 'lucide-react';
import { useSuppliers } from '@repo/suppliers';
import clsx from 'clsx';

export default function SuppliersPage() {
  const { suppliers, loading } = useSuppliers();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filtered = suppliers.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const active = suppliers.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Suppliers</h1>
          <p className="page-subtitle">Manage your vendor relationships and supplier catalog.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-icon bg-purple-500/10 text-purple-400"><Users className="w-5 h-5" /></div>
          <div><div className="stat-value">{suppliers.length}</div><div className="stat-label">Total Suppliers</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green-500/10 text-green-400"><Users className="w-5 h-5" /></div>
          <div><div className="stat-value">{active}</div><div className="stat-label">Active Suppliers</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-yellow-500/10 text-yellow-400"><Star className="w-5 h-5" /></div>
          <div>
            <div className="stat-value">
              {(suppliers.reduce((s, sup) => s + (sup.rating ?? 0), 0) / suppliers.length).toFixed(1)}
            </div>
            <div className="stat-label">Avg. Supplier Rating</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="table-wrapper">
        <div className="table-header">
          <div className="table-search">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'active', 'inactive'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
                  statusFilter === s
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5'
                )}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Total Orders</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-20 text-center">
                  <div className="empty-state"><div className="spinner" />Loading suppliers...</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state"><Users className="w-10 h-10 opacity-30" /><span>No suppliers found</span></div>
                </td></tr>
              ) : filtered.map(supplier => (
                <tr key={supplier.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{supplier.name}</div>
                        {supplier.contactPerson && (
                          <div className="text-xs text-slate-500">{supplier.contactPerson}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail className="w-3 h-3" /> {supplier.email}
                      </div>
                      {supplier.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone className="w-3 h-3" /> {supplier.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {supplier.address ? (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[140px]">{supplier.address}</span>
                      </div>
                    ) : <span className="text-slate-600">—</span>}
                  </td>
                  <td>
                    <span className={clsx(
                      'badge',
                      supplier.status === 'active' ? 'badge-green' : 'badge-slate'
                    )}>
                      {supplier.status}
                    </span>
                  </td>
                  <td>
                    {supplier.rating && (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={clsx(
                              'w-3.5 h-3.5',
                              star <= supplier.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="text-slate-400">{supplier.totalOrders ?? 0} orders</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn-ghost text-xs px-3 py-1.5">Edit</button>
                      <button className="btn-primary text-xs px-3 py-1.5">New PO</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filtered.length} of {suppliers.length} suppliers</span>
          <span>{active} active</span>
        </div>
      </div>
    </div>
  );
}
