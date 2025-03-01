const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Пароль MySQL, если установлен
    database: 'user_registration'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/register', async (req, res) => {
    const { email, username, password, confirmPassword, terms } = req.body;

    if (!email || !username || !password || !confirmPassword || !terms) {
        return res.status(400).send('All fields are required');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username],
            (err, results) => {
                if (err) throw err;

                if (results.length > 0) {
                    return res.status(400).send('User already exists');
                }

                db.query(
                    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
                    [email, username, hashedPassword],
                    (err) => {
                        if (err) throw err;
                        res.status(201).send('User registered successfully');
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});