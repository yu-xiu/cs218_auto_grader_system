import React, { useState, useEffect } from 'react';
import FileUploadComponent from '../components/FileUploadComponent';
import './SingleFileUpload.css'
import Result from '../components/Result';

const SingleFileUpload = ({user}) => {
  return (
    <div className="file-upload-container">
          <p className="uploadFileText">Auto Grader File Upload</p>
          <FileUploadComponent user={user}/>
          <Result user={user}/>
        </div>
  )
};

export default SingleFileUpload