import React from 'react';
import arrowDownIcon from '../img/arrow-down.png';
import closeIcon from '../img/close.png';
import { useMultiSelect } from '../hooks/useMultiSelect';
import './MultiSelect.css';

export default function MultiSelect({ options }) {

  const {
    selectedOptions,
    filteredOptions,
    showOptions,
    searchTerm,
    inputRef,
    handleFocus,
    handleOptionClick,
    handleRemoveOption,
    handleDeleteAll,
    handleInputChange,
    handleInputKeyDown,
    isOptionSelected,
  } = useMultiSelect(options);

  return (
    // tabIndex= 0 allows elements besides links and form elements to receive keyboard focus
    <div className="multi-select-container" ref={inputRef} tabIndex={0}>
      {selectedOptions.map(option => (
        <div key={option} className="selected-option">
          {option}
          <button className="delete-button" onClick={() => handleRemoveOption(option)}><img src={closeIcon} alt="delete" className="delete-icon"/></button>
        </div>
      ))}
      <input
       type="text"
       value={searchTerm}
       onChange={handleInputChange}
       onKeyDown={handleInputKeyDown}
       placeholder={selectedOptions.length === 0 ? 'Select...' : ''}
       onFocus={handleFocus}
      />
      {selectedOptions.length > 0 && (
        <div className="clear-all-container">
          <button className="delete-all-button" onClick={handleDeleteAll}><img src={closeIcon} alt="delete-all" className="delete-all-icon"/></button>
        </div>
      )}
      <button className="dropdown-toggle" onClick={handleInputKeyDown}>
        <img src={arrowDownIcon} alt="arrow-down" className="dropdown-icon"/>
      </button>
      {showOptions && (
        <ul className="options-menu">
          {filteredOptions.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={isOptionSelected(option) ? 'selected' : 'not-selected'}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
