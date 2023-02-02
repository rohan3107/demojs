// Establish connection to MySQL database
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'databaseName'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Make request to server for a value
const request = require('request');

request('http://www.example.com/value', (err, response, body) => {
  if (err) throw err;
  const value = body;
  
  // Insert customer into database
  const sql = 'INSERT INTO customers (name, value) VALUES (?, ?)';
  const inserts = ['Tom', value];
  const query = mysql.format(sql, inserts);
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(`Customer inserted with ID: ${result.insertId}`);
  });
});
