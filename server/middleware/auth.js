const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Mengambil token dari header Authorization
  const authHeader = req.header('Authorization');
  
  // Cek apakah header ada dan formatnya benar (Bearer <token>)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
  }

  try {
    // Verifikasi token menggunakan SECRET_KEY dari .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan data user ke request agar bisa digunakan di rute selanjutnya
    req.user = verified;
    
    // Lanjut ke fungsi/rute berikutnya
    next();
  } catch (err) {
    // Jika token expired atau secret key tidak cocok
    res.status(403).json({ message: "Token tidak valid atau telah kadaluarsa" });
  }
};