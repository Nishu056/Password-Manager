import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 



const Login = ({ onClose, onSwitchToSignup }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const UserLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/login', { email, password })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate("/manager");
        onClose();                               // Close the modal after successful login
    
      })
      .catch(err => {
        setError('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div>{error}</div>
      <form onSubmit={UserLogin}>
        <div className="form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account?<span className="link" onClick={onSwitchToSignup}>Signup now</span></p>
      </form>
    </div>
  );
};

export default Login;

