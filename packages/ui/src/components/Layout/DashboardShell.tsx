import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './DashboardShell.css';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
