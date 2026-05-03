'use client';

import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, ShoppingCart, Package, Truck,
  Download, Plus, Calendar, RefreshCw
} from 'lucide-react';
import { useSales } from '@repo/sales';
import { useStock } from '@repo/stock';
import { useProducts } from '@repo/products';
import { usePurchases } from '@repo/purchases';
import clsx from 'clsx';

const REPORT_TEMPLATES = [
  {
    id: 'sales-summary',
    name: 'Sales Summary',
    description: 'Revenue breakdown by date range, customer, and product category.',
    type: 'sales',
    icon: ShoppingCart,
    color: 'blue',
    lastRun: '2026-05-02T10:00:00Z',
  },
  {
    id: 'inventory-snapshot',
    name: 'Inventory Snapshot',
    description: 'Current stock levels, low-stock alerts, and warehouse distribution.',
    type: 'inventory',
    icon: Package,
    color: 'indigo',
    lastRun: '2026-05-03T08:00:00Z',
  },
  {
    id: 'purchase-analysis',
    name: 'Purchase Analysis',
    description: 'Spend analysis, supplier performance, and PO fulfillment rates.',
    type: 'purchases',
    icon: Truck,
    color: 'purple',
    lastRun: '2026-05-01T14:00:00Z',
  },
  {
    id: 'profit-margins',
    name: 'Profit Margins',
    description: 'Cost vs. revenue per product to identify best and worst performers.',
    type: 'sales',
    icon: TrendingUp,
    color: 'green',
    lastRun: null,
  },
];

const COLOR_MAP: Record<string, string> = {
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  green:  'bg-green-500/10 text-green-400 border-green-500/20',
};

export default function ReportsPage() {
  const { sales } = useSales();
  const { stock } = useStock();
  const { products } = useProducts();
  const { purchases } = usePurchases();
  const [runningId, setRunningId] = useState<string | null>(null);

  const handleRun = (id: string) => {
    setRunningId(id);
    setTimeout(() => setRunningId(null), 2000);
  };

  const totalRevenue = sales.reduce((s, o) => s + o.totalAmount, 0);
  const totalPurchaseSpend = purchases.reduce((s, p) => s + p.totalAmount, 0);
  const lowStockCount = stock.filter(i => i.status !== 'in_stock').length;
  const deliveredSales = sales.filter(s => s.status === 'delivered').length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate insights and monitor key business metrics.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Custom Report
        </button>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'blue', sub: `${deliveredSales} orders delivered` },
          { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'indigo', sub: `${products.filter(p => p.status === 'active').length} active SKUs` },
          { label: 'Purchase Spend', value: `$${totalPurchaseSpend.toLocaleString()}`, icon: Truck, color: 'purple', sub: `${purchases.length} purchase orders` },
          { label: 'Stock Alerts', value: lowStockCount.toString(), icon: BarChart3, color: 'red', sub: `${stock.filter(i => i.status === 'out_of_stock').length} out of stock` },
        ].map(kpi => {
          const Icon = kpi.icon;
          const colorCls = kpi.color === 'red'
            ? 'bg-red-500/10 text-red-400'
            : kpi.color === 'blue' ? 'bg-blue-500/10 text-blue-400'
            : kpi.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400'
            : 'bg-purple-500/10 text-purple-400';
          return (
            <div key={kpi.label} className="stat-card">
              <div className={clsx('stat-icon', colorCls)}><Icon className="w-5 h-5" /></div>
              <div>
                <div className="stat-value">{kpi.value}</div>
                <div className="stat-label">{kpi.label}</div>
                <div className="stat-change text-slate-500">{kpi.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Breakdown Table */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Sales by Order Status</h3>
          <button className="btn-ghost flex items-center gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="space-y-3">
          {(['delivered', 'processing', 'shipped', 'pending', 'cancelled'] as const).map(status => {
            const count = sales.filter(s => s.status === status).length;
            const revenue = sales.filter(s => s.status === status).reduce((s, o) => s + o.totalAmount, 0);
            const pct = sales.length ? Math.round((count / sales.length) * 100) : 0;
            const barColor = status === 'delivered' ? 'bg-green-500' :
              status === 'processing' ? 'bg-blue-500' :
              status === 'shipped' ? 'bg-purple-500' :
              status === 'pending' ? 'bg-yellow-500' : 'bg-red-500';
            return (
              <div key={status}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="capitalize text-sm font-medium text-slate-300">{status}</span>
                    <span className="text-xs text-slate-500">{count} orders</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">${revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full transition-all duration-700', barColor)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPORT_TEMPLATES.map(report => {
            const Icon = report.icon;
            const isRunning = runningId === report.id;
            return (
              <div key={report.id} className="glass-card-hover flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={clsx('w-11 h-11 rounded-xl border flex items-center justify-center shrink-0', COLOR_MAP[report.color])}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">{report.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{report.description}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {report.lastRun
                      ? `Last run: ${new Date(report.lastRun).toLocaleDateString()}`
                      : 'Never run'}
                  </div>
                  <div className="flex items-center gap-2">
                    {report.lastRun && (
                      <button className="btn-ghost flex items-center gap-1 text-xs">
                        <Download className="w-3 h-3" /> Export
                      </button>
                    )}
                    <button
                      className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"
                      onClick={() => handleRun(report.id)}
                      disabled={isRunning}
                    >
                      <RefreshCw className={clsx('w-3 h-3', isRunning && 'animate-spin')} />
                      {isRunning ? 'Running...' : 'Run Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory Breakdown */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Inventory Health</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'In Stock', value: stock.filter(i => i.status === 'in_stock').length, color: 'text-green-400' },
            { label: 'Low Stock', value: stock.filter(i => i.status === 'low_stock').length, color: 'text-yellow-400' },
            { label: 'Out of Stock', value: stock.filter(i => i.status === 'out_of_stock').length, color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-black/20 border border-white/5">
              <div className={clsx('text-3xl font-bold mb-1', s.color)}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
