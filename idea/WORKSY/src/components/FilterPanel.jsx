import React from 'react';
import { Filter } from 'lucide-react';
import Button from './Button';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onApply }) => {
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <Filter size={18} />
      </div>
      
      {filters.map((group, index) => (
        <div key={index} className="filter-group">
          <h4>{group.title}</h4>
          
          {group.type === 'checkbox' && group.options.map((option, idx) => (
            <label key={idx} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={option.checked}
                onChange={() => onFilterChange(group.id, option.value)}
              /> 
              {option.label}
            </label>
          ))}
          
          {group.type === 'select' && (
            <select 
              className="filter-select"
              onChange={(e) => onFilterChange(group.id, e.target.value)}
            >
              {group.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      <Button variant="primary" className="apply-filter-btn" onClick={onApply}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
