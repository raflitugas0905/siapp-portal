require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); // Pastikan package ini sudah ada di package.json
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/auth');

const app = express();

// Konfigurasi CORS yang lebih fleksibel untuk development
app.use(cors({
  origin: '*', // Mengizinkan semua domain (termasuk localhost port berapa pun)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key_default'; 

// --- ROUTES AUTH ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      SECRET_KEY, 
      { expiresIn: '2h' }
    );
    
    res.json({ 
      token, 
      user: { username: user.username, name: user.full_name } 
    });
  });
});

// --- ROUTES SERVICES ---
app.get('/api/services', (req, res) => {
  db.all("SELECT * FROM services ORDER BY category DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/services', authMiddleware, (req, res) => {
  const { title, description, category, image_url, link_url } = req.body;
  if (!title || !category || !link_url) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = `INSERT INTO services (title, description, category, image_url, link_url) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, description, category, image_url, link_url], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: "Layanan berhasil ditambah" });
  });
});

app.put('/api/services/:id', authMiddleware, (req, res) => {
  const { title, description, category, image_url, link_url } = req.body;
  const { id } = req.params;

  const sql = `UPDATE services SET title = ?, description = ?, category = ?, image_url = ?, link_url = ? WHERE id = ?`;
  db.run(sql, [title, description, category, image_url, link_url, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Layanan berhasil diperbarui" });
  });
});

app.delete('/api/services/:id', authMiddleware, (req, res) => {
  db.run("DELETE FROM services WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Layanan berhasil dihapus" });
  });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Server SIAPP running on port ${PORT}`);
});