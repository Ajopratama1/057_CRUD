const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  port: 3309,
  user: 'root',
  password: 'Ajo010505',
  database: 'mahasiswa'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MYSQL:' + err.stack);
    return;
  }
    console.log('Connection successfuly!'); 
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing query:0', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.json(results);
  });
});
