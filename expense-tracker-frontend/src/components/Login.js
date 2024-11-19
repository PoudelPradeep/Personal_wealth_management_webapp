// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Login() {
  console.log('Login component rendered'); // Initial render check

  const { setAuth } = useContext(AuthContext);
  console.log('AuthContext initialized', setAuth); // Debug AuthContext

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  console.log('Initial formData state', formData); // Debug initial form data state

  const { username, password } = formData;

  const onChange = (e) => {
    console.log(`onChange triggered for ${e.target.name}`, e.target.value); // Log input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('Updated formData state', formData); // Debug updated form data
  };

  const onSubmit = async (e) => {
    console.log('Form submission initiated'); // Form submission check
    e.preventDefault();
    try {
      console.log('Sending login request to API with data:', formData); // Log API request data
      console.log('API URL:', process.env.REACT_APP_API_URL); // Log API URL
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log('Login response received:', res); // Log API response

      localStorage.setItem('userId', res.data.userId);
      console.log('userId saved to localStorage:', res.data.userId); // Confirm localStorage save

      setAuth({ token: 'logged_in', userId: res.data.userId });
      console.log('AuthContext updated with token and userId'); // Debug AuthContext update

      window.location.href = '/dashboard';
      console.log('Redirecting to /dashboard'); // Confirm redirection
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message); // Log API errors
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={onChange}
              type="text"
              placeholder="Enter your username"
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <a href="/register" className="text-primary">
            Register here
          </a>
          .
        </p>
      </Card>
    </Container>
  );
}

export default Login;
