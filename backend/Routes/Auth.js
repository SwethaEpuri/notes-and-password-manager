const express = require('express');
const mysql = require('mysql');
const router = express.Router();
// const User = require('../model/Usermodel');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'NP_VAULT'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Register endpoint
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Check if username or password is missing
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
    }

    // Check if the username already exists in the database
    let checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUsernameQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Insert the new user into the database
        let insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [username, email, password], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if username or password is missing
    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    // Validate the user credentials
    let loginQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(loginQuery, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    });
});

// Define the API endpoint for getting employees
router.get('/employees', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


router.post('/addnote', (req, res) => {
    const { note } = req.body;
    // Check if username or password is missing
    if (!note) {
        return res.status(400).json({ message: 'Please write something to add....' });
    }

    // Insert the new user into the database
    let insertUserQuery = 'INSERT INTO notes (note) VALUES (?)';
    db.query(insertUserQuery, [note], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ message: 'Note added..' });
    });
});


router.get('/shownotes', (req, res) => {
    let sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

module.exports = router;
