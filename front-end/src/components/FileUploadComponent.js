import React, { useState } from 'react';
import { useContext} from "react";
import ResultContext from "../context/ResultContext";
import { Pane, FileUploader, Card, Spinner } from 'evergreen-ui';
import "./FileUploadComponent.css"
import AWS from 'aws-sdk'


function FileUploadComponent(props) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const { setResult } = useContext(ResultContext);
  const [results, setResult] = useState([]);

  const ping_python = async (filename, userid) => {
    console.log("in ping python")
    console.log(userid);
    // setResult("Processing Upload")
    const response = await fetch('http://localhost:80/grade_s3_file_save_to_dynamodb')
    //const response = await fetch('http://localhost:80/test');

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResult(data);
    }
 }
  const update = async () => {
    try{
      const response = await fetch('http://localhost:80/grade_s3_file_save_to_dynamodb')
      if(!response.ok){
        throw new Error('Network response is not working');
      }
      const data = await response.json();
      setResult(data.grade);
    }catch (error){
      console.error('Error:', error);
    }
  }

  const handleUploadFile = () => {
    // restrict to .py extension
    if (!file.name.endsWith('.py')) {
      alert('Only Python files .py are allowed');
      return;
    }
    if (file) {
      setIsUploading(true);

      // Perform file upload here, e.g., using an API call
      console.log('Uploading file:', file.name);
      console.log("Current User:", props.username)
      
      uploadFile(file, props.username).then(() => {
        setIsUploading(false);
      });
    }
  };

  const handleFileAccepted = (files) => {
    // Assuming you accept only the first file for upload
    const fileToUpload = files[0];
    setFile(fileToUpload);

    // Here, you would typically call your file upload function, passing the selected file
    console.log('Uploading file:', fileToUpload.name);
    // For example: uploadFile(fileToUpload);
  };
  
  // Function to upload file to s3; reference: https://medium.com/how-to-react/how-to-upload-files-on-an-s3-bucket-in-react-js-97a3ccd519d1
  const uploadFile = async (file, username) => {
    // S3 Bucket Name
    const S3_BUCKET ='autograder-bucket'; 
    const REGION ='us-east-1';

    console.log("in upload_file: ", username)
        
    // s3 credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID, 
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    })

    // create a s3 client
    const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    // generate unique file name to store in the bucket, then there would be no replacements for the file with same name
    const file_name_w_id = (Math.floor(100000000 + Math.random() * 900000000).toString()) + "_" + file.name;

    // Files Parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: file_name_w_id,
      Body: file,
    };

    // Uploading file to s3
    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
      ping_python(file_name_w_id, username)
      update()
      console.log(results)
    });
  };

    const handleFileRemoved = () => {
      // Reset file state if the user removes the file
      setFile(null);
  };

  return (
    <Pane style={{ width: '1000px', height: '300px'}}>
      <FileUploader
        description={<span style={{ color: '#D8D8D8' }}>Submit your solution here. Only one .py file can be uploaded</span>} 
        className="custom-file-uploader"
        onChange={handleFileAccepted} 
        onRemove={handleFileRemoved}
        maxSizeInBytes={300 * 1024 * 1024}
        maxFiles={1} 
        accept="application/x-python-code,.py"
     />
      <Card className='custom-card'>
        {isUploading ? (
          <div>
            <Spinner size={24} marginRight={8} /> Uploading...
          </div>
        ): file ? (
        <>
            <h5>File Details</h5>
            <p>File Name: {file.name}</p>
            <p>File Size: {file.size} bytes</p>
            <button style={{ fontSize: '18px', padding: '5px 15px' }} onClick={handleUploadFile}>Submit</button>
        </>
        ) : (
            <div>
                <h5 className='no-file-selected-message'>No file selected</h5>
            </div>
        )}
      </Card>
    </Pane>
  );
}

export default FileUploadComponent;
