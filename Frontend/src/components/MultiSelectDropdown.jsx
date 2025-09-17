import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder = "Select options...", 
  label,
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOption = (option) => {
    const isSelected = selectedValues.includes(option);
    if (isSelected) {
      onChange(selectedValues.filter(item => item !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleRemoveOption = (option) => {
    onChange(selectedValues.filter(item => item !== option));
  };

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className="multi-select-wrapper">
        <div 
          className="multi-select-input"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="selected-items">
            {selectedValues.length === 0 ? (
              <span className="placeholder">{placeholder}</span>
            ) : (
              selectedValues.map((item, index) => (
                <span key={index} className="selected-item">
                  {item}
                  <button
                    type="button"
                    className="remove-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(item);
                    }}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
          <div className="dropdown-arrow">
            {isOpen ? '▲' : '▼'}
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-options">
            {options.map((option, index) => (
              <div
                key={index}
                className={`dropdown-option ${selectedValues.includes(option) ? 'selected' : ''}`}
                onClick={() => handleToggleOption(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => {}} // Handled by parent onClick
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
