require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.API_PORT || 5000;

// Enable CORS and parsing middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import serverless functions
const portfolioHandler = require('./api/portfolio');
const loginHandler = require('./api/login');
const uploadHandler = require('./api/upload');

// Map serverless functions to Express routes
app.all('/api/portfolio', (req, res) => portfolioHandler(req, res));
app.all('/api/login', (req, res) => loginHandler(req, res));
app.all('/api/upload', (req, res) => uploadHandler(req, res));

// Serve React production build statically in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'build');
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Portfolio API Local Server is running. Launch the React dev server (npm start) to view the frontend.');
  });
}

app.listen(PORT, () => {
  console.log(`[Server] Portfolio backend running locally on port ${PORT}`);
});
