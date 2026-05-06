import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
  const styles: Record<string, React.CSSProperties> = {
    badge: {
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      display: 'inline-block',
      textTransform: 'capitalize',
    },
    success: { backgroundColor: '#d1fae5', color: '#065f46' },
    warning: { backgroundColor: '#fef3c7', color: '#92400e' },
    danger: { backgroundColor: '#fee2e2', color: '#991b1b' },
    info: { backgroundColor: '#e0f2fe', color: '#075985' },
    neutral: { backgroundColor: '#f3f4f6', color: '#374151' },
  };

  return (
    <span style={{ ...styles.badge, ...styles[variant] }}>
      {children}
    </span>
  );
};
