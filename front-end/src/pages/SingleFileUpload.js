import React, { useState, useEffect } from 'react';
import FileUploadComponent from '../components/FileUploadComponent';
import './SingleFileUpload.css'

const SingleFileUpload = () => {
  return (
    <div className="file-upload-container">
          <p className="uploadFileText">Auto Grader File Upload</p>
          <FileUploadComponent />
        </div>
  )
};

export default SingleFileUpload