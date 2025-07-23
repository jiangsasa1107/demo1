const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

//DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mymovie'
});

//Establish DB connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Get all movies
app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

//Post a new movie
app.post('/movies', (req, res) => {
    const { name, year } = req.body;
    if (!name || !year) {
        return res.status(400).json({ error: 'Name and year are required' });
    }
    db.query('INSERT INTO movies (name, year) VALUES (?, ?)', [name, year], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ id: result.insertId, name, year });
    });
});

//Update an existing movie
app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    const { name, year } = req.body;
    if (!name || !year) {
        return res.status(400).json({ error: 'Name and year are required' });
    }
    db.query('UPDATE movies SET name = ?, year = ? WHERE id = ?', [name, year, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ id, name, year });
    });
});

//Delete a movie
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});