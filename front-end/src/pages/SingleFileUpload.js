import React, { useState, useEffect } from 'react';
import FileUploadComponent from '../components/FileUploadComponent';
import './SingleFileUpload.css'
import Result from '../components/Result';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const SingleFileUpload = ({user}) => {
  return (
    <div className="file-upload-container">
          <p className="uploadFileText">Auto Grader File Upload</p>
          <FileUploadComponent user={user}/>
          <Link to="/result" className='button-style'>Result</Link>
        </div>
  )
};

export default SingleFileUpload