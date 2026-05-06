import React, { SelectHTMLAttributes } from 'react';
import './Select.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className={`select-container ${className}`}>
        {label && <label className="select-label">{label}</label>}
        <select 
          ref={ref} 
          className={`select-field ${error ? 'has-error' : ''}`} 
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="select-error">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
