import './App.css';
import HomePage from './pages/HomePage';
import SingleFileUpload from './pages/SingleFileUpload';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './components/NavBar';


function App({signOut, user}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleItemClick = (file) => {
    setSelectedFile(file);
  };

  return (
    
    <Router>
      <Navbar signOut={signOut} user={user}/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/upload" element={<SingleFileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;