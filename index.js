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

//membuat method GET dan POST

//GET
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing query:0', err.stack);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.json(results);
  });
});

//POST
app.post('/api/users', (req, res) => {
  const { nama, nim, kelas } = req.body;
   if (!nama || !nim || !kelas) {
    return res.status(400).json({ error: 'nama, nim, kelas wajib diisi' });
  }
  db.query('INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)', 
    [nama, nim, kelas], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database Error' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

//PUT
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { nama, nim, kelas } = req.body;
  db.query('UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?', 
    [nama, nim, kelas, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database Error' });
    }
    res.json({ message: 'User updated successfully' });
  });
});
