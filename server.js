const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
  console.log('Received form data:', req.body);
  
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzeChQOEkT7gLHA_5v9Y4SNR7YBD41Se3QLt90rwI165vXjVOFIO92FZX2OEVoeR6Ws/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('Google Script response status:', response.status);
    console.log('Google Script response headers:', response.headers);

    const text = await response.text();
    console.log('Google Script response text:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log('Could not parse response as JSON, using raw text');
      data = { message: text };
    }

    res.json(data);
  } catch (error) {
    console.error('Proxy error details:', error);
    res.status(500).json({ 
      error: 'Failed to submit form',
      details: error.message,
      stack: error.stack
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
}); 