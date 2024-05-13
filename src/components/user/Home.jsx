import React, { useState, useEffect } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home({ id, name, role }) {
  const navigate = useNavigate();

  // const [userUrls, setUserUrls] = useState([]);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [shortenedOperation, setShortenedOperation] = useState(false)

  const seeUsers = () => {
    if (role === 'ADMIN') {
      navigate('/users');
    }
    else {
      alert("Your role is 'NORMAL' so you do not have permission to visit users list. Make 'ADMIN' account.")
    }
  }

  const shortenUrl = async () => {
    const originalUrl = document.getElementById('url-input').value;
    const userId = id;

    if (!originalUrl.trim()) {
      alert('Please enter a URL first.');
      return;
    }

    try {
      const response = await fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/shortenUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl, userId }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setShortenedUrl(data.shortUrl);
        setShortenedOperation(true);
      } else {
        console.error('Error shortening URL:', data.error);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const Logout = async () => {
    try {
      const response = await fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        console.log('Logged out successfully');
        window.location.reload();
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert('URL copied to clipboard!');
  }

  return (
    <>
      <div>
        <header>
          <div className="logo">
            <h2>URL Shortener with User Authentication</h2>
          </div>
          <div className="buttons">
            <a onClick={seeUsers}>Users</a>
            <a onClick={Logout}>Logout</a>
          </div>
        </header>
        <main>
          <div className="hero">
            <h3>Shorten Your Loooong Links :)</h3>
            <div className="shorten-container">
              <input type="text" id="url-input" placeholder="Enter the link here" />
              <button id="shorten-copy-btn" onClick={shortenUrl}>Shorten Now!</button>
            </div>
            {shortenedOperation && <div className="shortened-url-container">
              <p>Shortened URL:</p>
              <p className="shortened-url">{shortenedUrl}</p>
              <button id='shorten-copy-btn' onClick={copyUrl}>Copy</button>
              <p className='tip'>Tip: Refresh the page to update the url history data in the table</p>
            </div>}
          </div>
          <div className="info">
            <p>Complete backend from scratch with database for user data and stateless authentication!</p>
            <p>You can get your history if you logout and loggin next time again!</p>
          </div>
          <div className="history">
            <h2 className='user'>WELCOME {name.toUpperCase()}!</h2>
            <h3>Your History</h3>
            <p className='tip'>Open as a desktop to better explore the table</p>
            {/* <h2>Name: {name}</h2> */}
            {/* <h2>Role: {role}</h2> */}
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '45%' }}>Original Link</th>
                    <th style={{ width: '28%' }}>Short Link</th>
                    <th style={{ width: '7%' }}>Total visits</th>
                    <th style={{ width: '20%' }}>Last visit</th>
                  </tr>
                </thead>
                <tbody>
                 
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;

