const db = require('./db');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt); // Ganti sesuai keinginan

  db.run(
    "INSERT OR IGNORE INTO users (username, password, full_name) VALUES (?, ?, ?)",
    ['admin_psp', hashedPassword, 'Admin Direktorat PSP'],
    (err) => {
      if (err) console.log(err.message);
      else console.log("Admin berhasil dibuat! Username: admin_psp, Pass: admin123");
    }
  );
}

seedAdmin();