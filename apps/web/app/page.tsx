import React from 'react';
import { Package, TrendingUp, Users, ShoppingCart, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <header className="glass sticky top-0 z-50 border-b border-white/5 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Turbo IMS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="btn-primary text-sm px-5 py-2.5">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-blue-500/30 text-blue-400 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v2.0 is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8">
          Next-Generation <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Inventory Management
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Streamline your supply chain, track inventory in real-time, and make data-driven decisions with the most powerful IMS on the market.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
          <button className="btn-secondary w-full sm:w-auto">
            Book a Demo
          </button>
        </div>

        {/* Dashboard Preview Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <div className="glass-card flex flex-col items-start text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Omnichannel Sales</h3>
            <p className="text-slate-400 text-sm">Sync your inventory across all marketplaces and physical stores instantly.</p>
          </div>
          <div className="glass-card flex flex-col items-start text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
            <p className="text-slate-400 text-sm">Get deep insights into your stock levels, fast-moving items, and profitability.</p>
          </div>
          <div className="glass-card flex flex-col items-start text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Automated Ordering</h3>
            <p className="text-slate-400 text-sm">Never run out of stock with smart low-stock alerts and automated purchase orders.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
