import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import FileUpload from '../components/FileUploadComponent';
import "./HomePage.css"


const HomePage = () => {
    return (
      <div>
        <Upload />
      </div>
    );
  };

const Upload = () => {
  return (
      <div className="file-upload-container">
        <p className="uploadFileText">Auto Grader File Upload</p>
        <FileUpload />
      </div>
  )
};
  
export default HomePage;