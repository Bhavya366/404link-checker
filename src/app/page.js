"use client"; // This is a client component
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [brokenLinks, setBrokenLinks] = useState([]);

  const checkLinks = async () => {
    try {
      const response = await axios.get(`/api/checkLinks?url=${url}`);
      const data = response.data;
      setBrokenLinks(data.brokenLinks);
    } catch (error) {
      console.error('Error checking links:', error);
    }
  };

  return (
    <div className='main_page'>
      <h1>Broken Link Checker</h1>
      <div className='input-button'>

      <label>
        <input type="text" className = "input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter URL' />
      </label>
      <button onClick={checkLinks}>Check Links</button>
      </div>
      

      {brokenLinks.length > 0 && (
        <div>
          <h2>Broken Links:</h2>
          <ul>
            {brokenLinks.map((link) => (
              <li key={link.link}>
                {link.link} - Status: {link.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
