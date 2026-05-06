'use client';

import React from 'react';
import { SupplierPerformance } from '@repo/types';
import { TrendingUp, Clock, CheckCircle, DollarSign } from 'lucide-react';

interface PerformanceCardProps {
  metrics: SupplierPerformance;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-green-600 mb-2">
          <CheckCircle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">On-Time Rate</span>
        </div>
        <div className="text-2xl font-bold">{(metrics.onTimeDeliveryRate * 100).toFixed(1)}%</div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-blue-600 mb-2">
          <Clock className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Avg Lead Time</span>
        </div>
        <div className="text-2xl font-bold">{metrics.averageLeadTime} Days</div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-orange-600 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
        </div>
        <div className="text-2xl font-bold">{(metrics.orderAccuracy * 100).toFixed(1)}%</div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-purple-600 mb-2">
          <DollarSign className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Total Volume</span>
        </div>
        <div className="text-2xl font-bold">${metrics.totalSpent.toLocaleString()}</div>
      </div>
    </div>
  );
};
