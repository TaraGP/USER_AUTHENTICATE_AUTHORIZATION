//frontend/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div>
      <h1>Home</h1>
            
        <>
          <p>Please log in or register.</p>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/register">Register</Link>
        </>
  
    </div>
  );
}; 
export default Home;
