import React, { useState, useEffect, useContext } from 'react';
import './Result.css';
import ResultContext from "../context/ResultContext";
import AWS from 'aws-sdk';

const Results = ({user}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY,
      region: 'us-east-1'
    });

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: 'auto-grader-table'
    };

    dynamodb.scan(params, (err, data) => {
      if (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching data:', err);
      } else {
        setItems(data.Items);
        setLoading(false);
        console.log('Data fetched successfully:', data.Items);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const userItem = items.find(item => item.user === user.signInDetails.loginId);

  return (
    <div>
      <h1>DynamoDB Data</h1>
      {userItem ? (
        <div>
          <p>User: {userItem.user}</p>
          <p>Comments: {userItem.Comments}</p>
          <p>Grade: {userItem.Grade}</p>
        </div>
      ) : (
        <p>No data found for the user {user.signInDetails.loginId}</p>
      )}
    </div>
  );
};


export default Results;
