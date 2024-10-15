import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Expense Tracker</h1>
      <p>Manage your finances efficiently by tracking your income and expenses.</p>
      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
