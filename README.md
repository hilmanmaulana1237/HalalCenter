# Website Resmi LPH UIN SGD (Lembaga Pemeriksa Halal)

Website resmi Lembaga Pemeriksa Halal Universitas Islam Negeri Sunan Gunung Djati Bandung (LPH UIN SGD), dibangun dengan konversi pixel-perfect dari template HTML ke React 18 + TypeScript + Vite, ditenagai oleh backend Node.js (Express + Prisma ORM + SQLite / PostgreSQL), real-time live chat Socket.IO, dan Asisten Robot AI berbasis Knowledge Base resmi.

---

## 🚀 Fitur Unggulan

1. **Pixel-Perfect Template Conversion**:
   - Mempertahankan 100% hierarki DOM, layout, class, dan breakpoints responsif template asli.
   - Menggunakan palet warna institusi resmi UIN SGD (`#272353`) dipadukan aksen hijau emerald halal (`#059669`) dan oranye koral CTA via CSS variables.

2. **Berita, Agenda & Acara (Publik & Admin)**:
   - Kategori berita: **Agenda**, **Acara**, dan **Kegiatan LPH**.
   - Menampilkan detail tanggal, waktu, dan lokasi acara pada agenda.
   - Filter kategori, pencarian kata kunci, pagination, dan berita terkait.
   - Editor admin lengkap: buat, ubah, hapus, dan jadwalkan rilis.

3. **Pengumuman Resmi**:
   - Pengumuman penting yang dapat disematkan (*Pinned*) di bagian atas Beranda.
   - Dukungan unduhan dokumen lampiran (PDF/surat edaran).

4. **Kalkulator Tarif (BPJPH vs LPH UIN SGD)**:
   - Membandingkan estimasi biaya BPJPH dengan penawaran kompetitif LPH UIN SGD secara berdampingan.
   - Menghitung nominal & persentase penghematan (LPH UIN SGD lebih terjangkau).
   - Validasi input, format mata uang Rupiah, tombol hitung ulang, dan **ekspor hasil ke PDF / cetak**.
   - Seluruh tarif tersimpan di database dan dapat diubah admin kapan saja.

5. **QnA Berbasis Robot AI & Handover Admin**:
   - Menjawab pertanyaan pengguna secara otomatis berdasarkan Knowledge Base resmi.
   - Fitur fallback cerdas: bila AI tidak yakin atau pengguna butuh bantuan manusia, otomatis menyediakan tombol **Live Chat Admin** atau redirect ke **WhatsApp Admin**.

6. **Survei Kepuasan Pelanggan**:
   - Penilaian bintang 1–5 untuk kepuasan umum, kecepatan, keramahan, dan kejelasan informasi.
   - Dashboard analitik rata-rata rating untuk admin & tombol ekspor CSV/Excel.

7. **Pusat Pengaduan & Tracking Tiket**:
   - Form pengaduan publik yang otomatis menghasilkan **Kode Tiket Unik** (`LPH-YYYYMM-XXXX`).
   - Fitur **Cek Status Tiket** (Diterima / Sedang Diproses / Selesai) beserta balasan resmi admin.
   - Notifikasi dan modul tanggapan admin dengan ekspor CSV.

8. **Widget Chatbot Melayang**:
   - Tampil di pojok kanan bawah seluruh halaman website.
   - Terintegrasi dengan basis pengetahuan AI dan Socket.IO untuk live chat admin.

9. **Dashboard Administrasi Terpadu**:
   - Modul: Berita, Pengumuman, Knowledge Base (FAQ), Tarif Kalkulator, Kepuasan, Pengaduan, dan Pengaturan Situs.
   - Log pertanyaan pengguna yang belum terjawab (*unanswered questions*) agar admin dapat terus memperkaya FAQ.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, React Router 6, Zustand, Axios, Socket.IO Client, jsPDF, html2canvas.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, Socket.IO, JWT, bcryptjs, express-rate-limit.
- **Database**: SQLite (default zero-config siap pakai) atau PostgreSQL / MySQL.

---

## 📦 Panduan Instalasi & Menjalankan

### 1. Prasyarat
- Node.js v18+ (direkomendasikan v20 LTS)
- npm v9+

### 2. Setup Backend

```bash
cd backend
npm install

# Setup database dan seed data awal (admin, tarif, berita dummy, FAQ)
npx prisma db push
npx tsx prisma/seed.ts

# Jalankan backend development server (port 5000)
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install

# Jalankan frontend development server (port 5173)
npm run dev
```

Buka peramban di: `http://localhost:5173`

---

## 🔐 Kredensial Default Petugas Admin

- **URL Login Admin**: `http://localhost:5173/admin/login`
- **Email**: `admin@lph-uinsgd.ac.id`
- **Kata Sandi**: `admin123456`

*(Ganti kata sandi ini melalui panel pengaturan setelah sistem dideploy ke lingkungan produksi)*.

---

## 📁 Struktur Direktori

```
HalalCenter/
├── frontend/                     # Aplikasi React 18 + Vite + TypeScript
│   ├── src/
│   │   ├── components/           # Navbar, Footer, ChatbotWidget, Layout
│   │   ├── pages/                # Beranda, Berita, Pengumuman, Layanan, Kontak, Admin
│   │   ├── services/             # Axios API client & utils
│   │   ├── styles/               # CSS Bootstrap, Theme template, Variables warna UIN SGD
│   │   └── types/                # TypeScript Interfaces
│   └── package.json
│
├── backend/                      # API Express + Prisma
│   ├── prisma/
│   │   ├── schema.prisma         # Skema Database
│   │   └── seed.ts               # Data awal (Admin, Tarif, FAQ, Berita)
│   ├── src/
│   │   ├── routes/               # Auth, News, Announcements, Calculator, Satisfaction, Complaints, Chat, Settings
│   │   ├── middleware/           # Auth JWT & Role Guard
│   │   └── index.ts              # Server Express & Socket.IO
│   └── package.json
│
├── TemplateDesain/               # Template HTML Asli (SingleFile Offline Archive)
│   ├── Beranda - LPH LPPOM (1).html
│   ├── FAQ - LPH LPPOM.html
│   └── Tentang LPPOM - LPH LPPOM.html
│
├── BLUEPRINT.MD                  # Spesifikasi & Aturan Mutlak
└── README.md
```

---

## 📄 Lisensi
Hak Cipta © 2026 Lembaga Pemeriksa Halal UIN Sunan Gunung Djati Bandung.

