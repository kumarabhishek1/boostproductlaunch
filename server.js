import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
  try {
    const GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL;
    
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Google Apps Script URL is not configured in .env file');
    }

    console.log('Submitting to Google Script URL:', GOOGLE_SCRIPT_URL);
    console.log('Form data:', req.body);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('Google response status:', response.status);
    const text = await response.text();
    console.log('Google response text:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
      data = { message: text };
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Server encountered an error while processing the request'
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
  console.log('Environment variables loaded:', {
    GOOGLE_SCRIPT_URL: process.env.VITE_GOOGLE_SCRIPT_URL ? 'Set' : 'Not set'
  });
}); 