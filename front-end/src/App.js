import './App.css';
import HomePage from './pages/HomePage';
import SingleFileUpload from './pages/SingleFileUpload';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/NavBar';

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import config from './amplifyconfiguration.json';
Amplify.configure(config);


function App({signOut, user}) {
  console.log(user)
  const [selectedFile, setSelectedFile] = useState(null);
  const handleItemClick = (file) => {
    setSelectedFile(file);
  };

  return (
    
    <Router>
      <Navbar signOut={signOut} user={user}/>
      <Routes>
        <Route exact path="/" element={<HomePage user={user}/>} />
        <Route exact path="/home" element={<HomePage user={user}/>} />
        <Route exact path="/upload" element={<SingleFileUpload />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);