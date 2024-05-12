import React, { useState, useEffect } from 'react';
import "./HomePage.css"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Heading } from '@aws-amplify/ui-react';


const HomePage = ({user}) => {
    return (
      <div>
        
        <Heading fontSize = '22px' style={{ fontFamily: 'Futura', fontWeight: 100 }} color={'black'} level={1}>Welcom! You've signed in! {user.signInDetails.loginId}</Heading>
        <Display />
      </div>
    );
};

const Display = () => {
  return (
      <div className="display-container">
        <p className="titleText">Welcome to Auto Grader System</p>
        <p className="subTitleText">Here is your question: Knight Attack</p>
        <div className="question-container">
            <p> A knight and a pawn are on a chessboard. Can you figure out the minimum number of moves 
                required for the knight to travel to the same position of the pawn? On a single move, 
                the knight can move in an "L" shape; two spaces in any direction, then one space in a 
                perpendicular direction. This means that on a single move, a knight has eight possible positions 
                it can move to. (see end of document for a picture)
                Write a function, knight_attack, that takes in 5 arguments: n, kr, kc, pr, pc
                n = the length of the chess board
                kr = the starting row of the knight
                kc = the starting column of the knight pr = the row of the pawn
                pc = the column of the pawn
                The function should return a number representing the minimum number of moves required for the knight 
                to land on top of the pawn. The knight cannot move out of bounds of the board. You can assume that rows 
                and columns are 0-indexed. This means that if n = 8, there are 8 rows and 8 columns numbered 0 to 7. 
                If it is not possible for the knight to attack the pawn, then return None.</p>

        </div>
        <Link to="/upload" className='button-style'>Upload your solution</Link>
    </div>
  )
};

export default HomePage;