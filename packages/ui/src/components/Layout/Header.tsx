import React from 'react';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <input type="text" placeholder="Search inventory..." />
      </div>
      <div className="header-user">
        <div className="user-avatar">A</div>
        <span>Admin User</span>
      </div>
    </header>
  );
}
