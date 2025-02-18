// Load environment variables from .env
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const authenticateToken = require('./middleware/auth'); // Middleware for token authentication

// Create an instance of Express
const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log('Database Host:', process.env.DB_HOST); // Debug log to confirm environment variables

// Basic route for API status
app.get('/', (req, res) => {
  res.send('Welcome to the Rose City Rewards API!');
});

// Test database connection route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected!', serverTime: result.rows[0] });
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// User Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query for user based on email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // If user doesn't exist or password doesn't match, return unauthorized
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected Route: Create an event
app.post('/api/events', authenticateToken, async (req, res) => {
  const { name, date, description } = req.body;

  try {
    // Insert event into database
    const result = await pool.query(
      'INSERT INTO events (name, date, description) VALUES ($1, $2, $3) RETURNING *',
      [name, date, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Event creation error:', err.message);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Protected Route: Log volunteer activity
app.post('/api/volunteer-logs', authenticateToken, async (req, res) => {
  const { user_id, event_id, hours_volunteered } = req.body;

  try {
    // Insert volunteer log into database
    const result = await pool.query(
      'INSERT INTO volunteer_logs (user_id, event_id, hours_volunteered) VALUES ($1, $2, $3) RETURNING *',
      [user_id, event_id, hours_volunteered]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Volunteer log error:', err.message);
    res.status(500).json({ error: 'Failed to log volunteer activity' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err.message);
});
