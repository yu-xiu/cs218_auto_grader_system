import React, { useState, useEffect } from 'react';
import FileUploadComponent from '../components/FileUploadComponent';
import './SingleFileUpload.css'
import Result from '../components/Result';
// import './ResultPage.css'

const ResultPage = ({user}) => {
  return (
    <div>
          
          <Result user={user}/>
    </div>
  )
};

export default ResultPage