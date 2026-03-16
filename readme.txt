SIAPP PORTAL - DIREKTORAT JENDERAL PSP KEMENTAN
SIAPP (Sistem Informasi Aplikasi dan Pelayanan PSP) adalah platform portal terpadu untuk mengakses layanan aplikasi operasional dan data informasi di lingkungan Direktorat Jenderal Prasarana dan Sarana Pertanian, Kementerian Pertanian Republik Indonesia.

FITUR UTAMA
Pengelompokan Layanan: Pemisahan otomatis antara Layanan Aplikasi (Internal Systems) dan Layanan Data (Statistics & Geographic Data).

Antarmuka Modern: Desain responsif menggunakan React.js dan Tailwind CSS.

Konsol Admin: Dashboard manajemen data untuk operasi Tambah, Edit, dan Hapus layanan.

Fitur Pencarian: Pencarian aplikasi dan layanan secara real-time.

Kontainerisasi: Deployment menggunakan Docker dan Docker Compose untuk konsistensi lingkungan.

TEKNOLOGI YANG DIGUNAKAN
Frontend: React.js, Tailwind CSS, Lucide Icons.

Backend: Node.js, Express.js.

Database: SQLite3.

DevOps: Docker & Docker Compose.

CARA MENJALANKAN PROYEK
Pastikan sistem Anda sudah terinstal Docker dan Docker Compose.

Persiapan Repositori
Masuk ke direktori utama proyek:
cd SIAPP

Konfigurasi Environment
Pastikan file .env tersedia di dalam folder server/ dengan konfigurasi berikut:
JWT_SECRET=rahasia_anda
PORT=5000

Menjalankan Aplikasi dengan Docker
Gunakan perintah berikut untuk membangun dan menjalankan kontainer:
docker compose up -d --build

Inisialisasi Data (Seeding)
Untuk membuat akun Admin dan memasukkan data contoh awal (Aplikasi & Layanan), jalankan perintah berikut:
docker exec -it siapp-backend node seed.js

Akses Aplikasi

Frontend: http://localhost

Backend API: http://localhost:5000

Dashboard Admin: Pilih menu Console Admin pada halaman utama.

STRUKTUR DIREKTORI
/server: Source code backend, API routes, dan konfigurasi database.

/client: Source code frontend (React/Vite).

./siapp.db: File database SQLite (Persistent melalui Docker Volumes).

CATATAN TEKNIS
Pemisahan section pada halaman utama bergantung pada kolom 'category' di database. Pastikan setiap data memiliki label 'aplikasi' atau 'layanan' agar muncul di kelompok yang sesuai.

Hak Cipta 2026 Direktorat Jenderal PSP - Kementerian Pertanian RI.
