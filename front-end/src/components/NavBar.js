import React, { useState, useEffect } from 'react';
import "./NavBar.css"
import {Link } from 'react-router-dom';


const Navbar = ({user,signOut}) => {
    return (
      <nav className="nav">
        <a href="/" className="logo">Auto Grader</a>
        <ul>
            <li><a className="button" onClick={signOut}>Sign Out</a></li>
        </ul>
      </nav>
    );
};

export default Navbar;