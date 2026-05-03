'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Package, LayoutDashboard, ShoppingCart, 
  BarChart3, Boxes, Users, Truck, Bell, Search, Menu
} from 'lucide-react';
import clsx from 'clsx';

const NAVIGATION = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Stock', href: '/dashboard/stock', icon: Boxes },
  { name: 'Sales', href: '/dashboard/sales', icon: ShoppingCart },
  { name: 'Purchases', href: '/dashboard/purchases', icon: Truck },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-[#0B0F19] text-slate-100 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 transition-transform duration-300 md:translate-x-0 md:static md:flex md:flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Turbo IMS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-blue-500/10 text-blue-400" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )}
              >
                <Icon className={clsx("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 w-96">
              <Search className="w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search products, orders..." 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-white/10 cursor-pointer shadow-md"></div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
