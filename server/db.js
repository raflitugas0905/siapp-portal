const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./siapp.db');

db.serialize(() => {
  // Tabel Users untuk Admin
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    full_name TEXT
  )`);

  // Tabel Services untuk Layanan (Dinamis)
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    category TEXT, 
    image_url TEXT,
    link_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;