import React, { useState, useEffect } from 'react';
import FileUploadComponent from '../components/FileUploadComponent';
import './SingleFileUpload.css'

const SingleFileUpload = ({user}) => {
  return (
    <div className="file-upload-container">
          <p className="uploadFileText">Auto Grader File Upload</p>
          <FileUploadComponent use={user}/>
        </div>
  )
};

export default SingleFileUpload