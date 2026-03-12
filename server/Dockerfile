FROM node:18-alpine

# Set folder kerja
WORKDIR /app

# Copy package files dulu agar Docker bisa cache layer node_modules
# Jadi kalau kamu cuma ubah kode, proses build berikutnya akan jauh lebih cepat!
COPY package*.json ./

# Install dependensi (Gunakan 'npm ci' jika ada package-lock.json untuk stabilitas)
RUN npm install

# Baru copy seluruh kode program
COPY . .

# Expose port yang digunakan backend
EXPOSE 5000

# Jalankan server
CMD ["node", "server.js"]