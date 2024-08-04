// app.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Replace 'YOUR_API_KEY' with your actual Weatherstack API key
const WEATHERSTACK_API_KEY = 'YOUR_API_KEY';
const WEATHERSTACK_API_URL = 'http://api.weatherstack.com/current';

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle weather information requests
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get(WEATHERSTACK_API_URL, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: city
      }
    });

    const data = response.data;

    if (data.error) {
      return res.status(400).json({ error: data.error.info });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Weather service running at http://localhost:${port}`);
});
