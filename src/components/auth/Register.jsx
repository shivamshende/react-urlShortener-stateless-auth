import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('NORMAL');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role }),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="NORMAL">NORMAL</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <button onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
};

export default Register;



