import React, { useState, useEffect } from 'react';
import "./DoubleSelect.css";

function DoubleSelect({items}) {
  const [selectedCategory, setSelectedCategory] = useState('fruit');
  const [selectedItem, setSelectedItem] = useState('');
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    setCategoryItems(items.filter((item) => item.category === selectedCategory));
  }, [selectedCategory, items]);

  useEffect(() => {
    if (categoryItems.length > 0) {
      setSelectedItem(categoryItems[0].name);
    } else {
      setSelectedItem('');
    }
  }, [categoryItems]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div className="container">

      {selectedItem && <h1> {selectedItem}</h1>}
      <div className="bottom-container">
        <div className="category-container">
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="fruit">fruit</option>
            <option value="vegetable">vegetable</option>
            <option value="meat">meat</option>
            </select>
        </div>

        <div className="item-container">
            <label htmlFor="item">Item: </label>
            <select name="item" id="item" value={selectedItem} onChange={handleItemChange}>
            {categoryItems.map((item) => (
                <option key={item.name} value={item.name}>
                {item.name}
                </option>
            ))}
            </select>
        </div>
      </div>
    </div>
  );
}

export default DoubleSelect;
