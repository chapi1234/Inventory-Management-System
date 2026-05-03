'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package, TrendingUp, AlertTriangle, Activity,
  ShoppingCart, Truck, DollarSign, ArrowRight, CheckCircle
} from 'lucide-react';
import clsx from 'clsx';
import { useSales } from '@repo/sales';
import { useStock } from '@repo/stock';
import { useProducts } from '@repo/products';
import { usePurchases } from '@repo/purchases';

export default function DashboardOverview() {
  const { sales, loading: salesLoading } = useSales();
  const { stock, loading: stockLoading } = useStock();
  const { products, loading: productsLoading } = useProducts();
  const { purchases, loading: purchasesLoading } = usePurchases();

  const loading = salesLoading || stockLoading || productsLoading || purchasesLoading;

  const lowStockItems = stock.filter(s => s.status === 'low_stock' || s.status === 'out_of_stock');
  const recentSales = [...sales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  const totalRevenue = sales.filter(s => s.status !== 'cancelled').reduce((sum, s) => sum + s.totalAmount, 0);
  const pendingOrders = sales.filter(s => s.status === 'pending' || s.status === 'processing').length;
  const openPOs = purchases.filter(p => p.status === 'ordered').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <span className="text-sm text-slate-500">Loading your dashboard...</span>
      </div>
    );
  }

  const STATUS_BADGE: Record<string, string> = {
    pending:    'badge badge-yellow',
    processing: 'badge badge-blue',
    shipped:    'badge badge-purple',
    delivered:  'badge badge-green',
    cancelled:  'badge badge-red',
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">
            Here&apos;s what&apos;s happening across your inventory today.
          </p>
        </div>
        <span className="text-xs text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
            icon: DollarSign,
            color: 'bg-green-500/10 text-green-400',
            sub: <span className="text-green-400 flex items-center gap-1"><Activity className="w-3 h-3" /> +12.5% this week</span>,
          },
          {
            label: 'Total Products',
            value: products.length,
            icon: Package,
            color: 'bg-blue-500/10 text-blue-400',
            sub: <span className="text-slate-500">{products.filter(p => p.status === 'active').length} active SKUs</span>,
          },
          {
            label: 'Stock Alerts',
            value: lowStockItems.length,
            icon: AlertTriangle,
            color: lowStockItems.length > 0 ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400',
            sub: <span className={lowStockItems.length > 0 ? 'text-red-400' : 'text-slate-500'}>
              {stock.filter(s => s.status === 'out_of_stock').length} out of stock
            </span>,
          },
          {
            label: 'Open Orders',
            value: pendingOrders,
            icon: ShoppingCart,
            color: 'bg-yellow-500/10 text-yellow-400',
            sub: <span className="text-slate-500">{openPOs} POs in transit</span>,
          },
        ].map(kpi => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className={clsx('stat-icon', kpi.color)}><Icon className="w-5 h-5" /></div>
              </div>
              <div className="stat-value">{kpi.value}</div>
              <div className="stat-label mb-1">{kpi.label}</div>
              <div className="stat-change">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Add Product', href: '/dashboard/products', color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
          { label: 'New Sale', href: '/dashboard/sales', color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/20', text: 'text-green-400' },
          { label: 'Create PO', href: '/dashboard/purchases', color: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
          { label: 'View Reports', href: '/dashboard/reports', color: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
        ].map(action => (
          <Link
            key={action.label}
            href={action.href}
            className={clsx(
              'rounded-xl p-4 border bg-gradient-to-br flex items-center justify-between transition-all duration-200 hover:scale-[1.02] hover:brightness-110',
              action.color, action.border
            )}
          >
            <span className={clsx('text-sm font-medium', action.text)}>{action.label}</span>
            <ArrowRight className={clsx('w-4 h-4', action.text)} />
          </Link>
        ))}
      </div>

      {/* Bottom Section: Recent Sales + Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="glass-card lg:col-span-2 p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h3 className="text-base font-bold text-white">Recent Orders</h3>
            <Link href="/dashboard/sales" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map(sale => (
                  <tr key={sale.id}>
                    <td className="font-medium text-slate-300">{sale.orderNumber}</td>
                    <td className="text-slate-400">{sale.customerName}</td>
                    <td>
                      <span className={STATUS_BADGE[sale.status]}>
                        <span className="capitalize">{sale.status}</span>
                      </span>
                    </td>
                    <td className="text-right font-semibold text-slate-200">
                      ${sale.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="glass-card overflow-hidden p-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h3 className="text-base font-bold text-white">Inventory Status</h3>
            <Link href="/dashboard/stock" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {stock.map(item => (
              <div key={item.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-300 truncate">{item.productName}</div>
                  <div className="text-xs text-slate-600">{item.warehouse}</div>
                </div>
                <div className="flex flex-col items-end ml-4 shrink-0">
                  <div className={clsx(
                    'text-sm font-bold',
                    item.status === 'out_of_stock' ? 'text-red-400'
                      : item.status === 'low_stock' ? 'text-yellow-400'
                      : 'text-green-400'
                  )}>
                    {item.quantity}
                  </div>
                  <div className="text-xs text-slate-600">/ {item.minQuantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Orders Summary */}
      {openPOs > 0 && (
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-400" /> Open Purchase Orders
            </h3>
            <Link href="/dashboard/purchases" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {purchases.filter(p => p.status === 'ordered').slice(0, 4).map(po => (
              <div key={po.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                <div>
                  <div className="text-sm font-medium text-slate-300">{po.poNumber}</div>
                  <div className="text-xs text-slate-500">{po.supplierName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-200">${po.totalAmount.toLocaleString()}</div>
                  {po.expectedDeliveryDate && (
                    <div className="text-xs text-blue-400">
                      ETA {new Date(po.expectedDeliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
