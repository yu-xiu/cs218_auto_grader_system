import React, { useState, useEffect, useContext } from 'react';
import './Result.css';
import ResultContext from "../context/ResultContext";


const Result = () => {
    const { result } = useContext(ResultContext);
    console.log(result)


return (
    <div>
        <div className="result-container">
            <p className="text">Results:</p>
        </div>
    </div>
);
  
}

export default Result;
