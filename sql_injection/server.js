const express = require('express');
const sqlite3 = require('sqlite3').verbose();
uuid = require('uuid');
base64 = require('base-64');
const fs = require('fs');

const app = express();

// Create a log file
const logFile = 'log.txt';
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Redirect console.log to the log file
console.log = function (...args) {
  logStream.write(`${args.join(' ')}\n`);
};


// Delete the old database file if it exists
const dbFile = 'vulnerable_db.sqlite';
if (fs.existsSync(dbFile)) {
  fs.unlinkSync(dbFile);
  console.log(`Deleted old database file: ${dbFile}`);
}

// Create a SQLite database connection
const db = new sqlite3.Database(dbFile);

// Create a table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    role TEXT,
    password TEXT
  );
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');

    // Insert some sample data
    db.run(`
      INSERT INTO users (id, name, role, password) VALUES
        ('${uuid.v4()}', 'Alice Smith', 'admin', '${base64.encode('password123')}'),
        ('${uuid.v4()}', 'Bob Johnson', 'user', '${base64.encode('password456')}'),
        ('${uuid.v4()}', 'Charlie Lee', 'user', '${base64.encode('password789')}');
    `, (err) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted successfully');
      }
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Create a vulnerable SQL query endpoint
app.get('/users', (req, res) => {
  const id = req.query.id;
  console.log(`Url: ${req.url}`);
  if (!id) {
    console.log('No user ID provided');
    res.status(400).send('No user ID provided, please provide a valid uuid.');
    return;
  }
  const query = `SELECT * FROM users WHERE id = ${id}`;
  console.log(`Running query: ${query}`);
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error running query:', err);
      res.status(500).send('Error');
    } else if (rows.length === 0) {
      console.log('No user found');
      res.send('No user found');
    } else {
      console.log('User found:', rows[0]);
      res.send(rows[0]);
    }
  });
});

app.listen(3000, () => {
  console.log('Vulnerable web server is running on http://localhost:3000');
});
