const db = require('./db');
const bcrypt = require('bcryptjs');

async function seedAll() {
  // 1. Seed Admin
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  db.run(
    "INSERT OR IGNORE INTO users (username, password, full_name) VALUES (?, ?, ?)",
    ['admin_psp', hashedPassword, 'Admin Direktorat PSP']
  );

  // 2. Seed Data Layanan & Aplikasi (Contoh)
  const sampleServices = [
    ['DITA', 'Data dan Informasi Terpadu Alat Pertanian', 'aplikasi', '', 'https://google.com'],
    ['Si-Slamet', 'Sertifikasi Alat dan Mesin Pertanian', 'aplikasi', '', 'https://google.com'],
    ['Peta Ditjen PSP', 'Peta Sebaran Kegiatan Strategis', 'layanan', '', 'https://google.com'],
    ['Statistik PSP', 'Data Statistik Prasarana Pertanian', 'layanan', '', 'https://google.com']
  ];

  sampleServices.forEach((s) => {
    db.run(
      "INSERT OR IGNORE INTO services (title, description, category, image_url, link_url) VALUES (?, ?, ?, ?, ?)",
      s
    );
  });

  console.log("Seed Selesai: Admin & Data Layanan berhasil dibuat!");
}

seedAll();