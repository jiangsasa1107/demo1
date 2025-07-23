const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'myapp'
});

//Establish DB connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

//Post a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

//Update and existing user
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id, name });
  });
});

//Delete a user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).json({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});