import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
