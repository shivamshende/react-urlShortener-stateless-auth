import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './components/DemoShortener';
import Home from './components/user/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/user/Users';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserDetails, setUserDetails] = useState({});

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/isAuthenticated', {
          method: 'GET',
          credentials: 'include',   // Include cookies in the request
        });
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
        if(data.isAuthenticated){
          setUserDetails({userId: data.userId, name: data.name, role: data.role});
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home id={UserDetails.userId} name={UserDetails.name} role={UserDetails.role} /> : <Demo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;