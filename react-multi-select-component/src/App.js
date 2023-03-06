import React from 'react';
import MultiSelect from './components/MultiSelect';
import './App.css';


const options = ['Ocean', 'Blue', 'Purple', 'Red', 'Orange', 'Yellow', 'Green', 'Forest', 'Slate', 'Silver'];

function App() {  
  return (
  <div className='App'>
    <h4>Multi</h4>
    <MultiSelect options={options} />
  </div>
  );
}
  
export default App;
  
  
  
  
  
