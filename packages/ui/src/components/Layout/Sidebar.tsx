import React from 'react';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">IMS Pro</div>
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link">Dashboard</a>
        <a href="#" className="sidebar-link">Products</a>
        <a href="#" className="sidebar-link">Sales</a>
        <a href="#" className="sidebar-link">Stock & Suppliers</a>
        <a href="#" className="sidebar-link">Reports</a>
      </nav>
    </aside>
  );
}
