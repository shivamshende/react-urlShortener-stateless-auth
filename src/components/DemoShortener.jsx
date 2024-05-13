import React from 'react';
import './user/Home.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DemoShortener() {
  const navigate = useNavigate();
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [shortenedOperation, setShortenedOperation] = useState(false)

  const goToLogin = () => {
    navigate('/login');
  }

  const goToRegister = () => {
    navigate('/register');
  }

  const shortenUrl = async () => {
    const originalUrl = document.getElementById('url-input').value;

    if (!originalUrl.trim()) {
      alert('Please enter a URL first.');
      return;
    }

    try {
      const response = await fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/demoShortenUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ demo_originalUrl: originalUrl }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        const shortenedUrl = data.shortUrl;
        console.log('Shortened URL:', shortenedUrl);
        setShortenedUrl(shortenedUrl);
        setShortenedOperation(true)
      } else {
        console.error('Error shortening URL:', data.error);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl)
    alert('URL copied to clipboard!')
  }

  return (
    <>
      <div>
        <header>
          <div className="logo">
            <h2>URL Shortener with User Authentication</h2>
          </div>
          <div className="buttons">
            <a onClick={goToLogin}>Login</a>
            <a onClick={goToRegister}>Register</a>
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
            </div>}
          </div>
          <div className="info">
            <p>Log in or Register now to view your data and activity!</p>
            <p>Complete backend from scratch with database for user data and stateless authentication!</p>
          </div>
          <div className="suggestion">
            <h2>Create account to see profile and history</h2>
          </div>
        </main>
      </div>
    </>
  );
}

export default DemoShortener;