import './App.css';
import HomePage from './pages/HomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  // const files = [
  //   { name: 'File 1', /* additional file information */ },
  //   { name: 'File 2', /* additional file information */ },
  // ];
  const handleItemClick = (file) => {
    setSelectedFile(file);
  };

  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;