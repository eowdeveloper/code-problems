import { useState, useEffect, useRef } from 'react';

export const useMultiSelect = (options) => {
  const [selectedOptions, setSelectedOptions] = useState([]); // hold options that have been selected by the user
  const [filteredOptions, setFilteredOptions] = useState([]); // filter the options that match the user's search term
  const [showOptions, setShowOptions] = useState(false); // controls whether the dropdown list is displayed or hidden
  const [searchTerm, setSearchTerm] = useState(''); // hold user's search term to filter
  const inputRef = useRef(); // detect whether the user clicks outside the component

  // sets the filteredOptions state to the initial options prop value and render everytime 
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // detect the click outside of the container (element)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // if the searchTerm cannot be found
        if (filteredOptions.length === 0) {
          setFilteredOptions([]);
        // if searchTerm is still there and searchTerm is in options
        } else if (options.includes(searchTerm)) {
          setFilteredOptions(selectedOptions);
        // if searchTerm is not empty, filter the options by searchTerm
        } else if (searchTerm.trim !== '') {
          const filtered = options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredOptions(filtered);
        } // user clicks outside the component and then back inside, if they had previously typed a search term, the filtered options will still be displayed
        setShowOptions(false);
      }
    };    
      
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, options, filteredOptions, selectedOptions, searchTerm]);
  
  
  // detect when user focus on the container to show the options
  const handleFocus = () => {
    setShowOptions(true);
  };

  // detect when user select an option and add the selected option to the array SelectedOptions and remove the option from the SearchTerm
  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setSearchTerm('');
  };
  
  // remove the options that are clicked to remove
  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter(option => option !== optionToRemove));
  };

  // remove all the options at once and empties the SelectedOptions and SearchTerm
  const handleDeleteAll = () => {
    setSelectedOptions([]);
    setSearchTerm('');
  };

// detect changes in input and filter accordingly
const handleInputChange = (event) => {
    const value = event.target.value;
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSearchTerm(value);
  
    if (filtered.length === 0) {
      setFilteredOptions([]);
      setShowOptions(!showOptions);
    } else {
      setFilteredOptions(filtered);
      setShowOptions(!showOptions);
    }
  };
  
  
  // allow user to press a key while the search input is focused 
  const handleInputKeyDown = () => {
      setShowOptions(!showOptions);
  };

  // detect the selected options
  const isOptionSelected = (option) => selectedOptions.includes(option);

  return {
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
  };
};
