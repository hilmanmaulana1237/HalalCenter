# PROMPT: WEBSITE LPH UIN SGD (HTML TEMPLATE → REACT + FITUR LAYANAN)

## 1. PERAN & TUJUAN
Kamu adalah senior full-stack engineer yang ahli React dan konversi desain pixel-perfect.
Tugasmu: membangun website resmi LPH UIN SGD (Lembaga Pemeriksa Halal UIN Sunan Gunung Djati)
dengan mengonversi template HTML yang sudah disediakan ke React, lalu menambahkan fitur-fitur
di bagian 7. Hasil akhir harus siap dipakai (production-ready), rapi, dan terdokumentasi.

## 2. ATURAN MUTLAK (TIDAK BOLEH DILANGGAR)
1. Template HTML adalah satu-satunya sumber kebenaran desain. Layout, urutan elemen, spacing,
   ukuran, tipografi, ikon, gambar, animasi, hover/focus state, dan breakpoint responsif harus
   SAMA PERSIS dengan template.
2. Dilarang redesign, "memperbaiki", merapikan, mengganti font, mengubah padding/margin,
   atau menambah dekorasi baru dengan alasan apa pun.
3. Satu-satunya perubahan visual yang diizinkan adalah WARNA (lihat bagian 6).
4. Halaman/komponen yang tidak ada di template (mis. kalkulator, form pengaduan, widget chatbot)
   harus dibangun dari komponen dan pola visual yang sudah ada di template (tombol, card, input,
   heading, grid, dst.). Jangan memperkenalkan gaya visual baru. Jika tidak ada padanan yang
   cocok, pakai komponen template yang paling mirip dan catat di laporan.
5. Jangan mengarang data (tarif, alamat, kontak, nama pejabat, teks resmi). Gunakan placeholder
   yang jelas bertanda [TODO] atau data dummy berlabel "DUMMY", lalu daftarkan semuanya di
   laporan akhir.
6. Jika ada keraguan soal desain, pilih opsi yang paling dekat dengan template dan catat
   asumsinya. Jangan menebak lalu mengubah tampilan.

## 3. KONTEKS BISNIS
- LPH UIN SGD menyediakan jasa pemeriksaan/pengujian kehalalan produk.
- Pengguna: pelaku usaha yang ingin sertifikasi halal, mahasiswa, dan masyarakat umum.
- Website berfungsi untuk informasi, layanan mandiri, dan komunikasi dengan admin.
- Bahasa antarmuka: Bahasa Indonesia.

## 4. TECH STACK (DEFAULT, BOLEH DISESUAIKAN JIKA TEMPLATE MEMBUTUHKAN)
- Frontend: React 18 + Vite + React Router. TypeScript direkomendasikan.
- Styling: PERTAHANKAN CSS/framework bawaan template (Bootstrap/Tailwind/CSS custom apa pun
  yang dipakai). Jangan menulis ulang ke library styling lain. Nama class asli dipertahankan.
- Backend: Node.js (Express/NestJS), database PostgreSQL atau MySQL, ORM Prisma.
- Auth admin: JWT/session + hashing password (bcrypt/argon2).
- Real-time (live chat admin): WebSocket/Socket.IO.
- Chatbot AI: LLM API yang dipanggil HANYA dari backend (API key tidak boleh ada di frontend),
  dengan knowledge base berupa FAQ/dokumen dari admin.
- Konfigurasi via .env, sediakan .env.example.

## 5. PROSEDUR KONVERSI HTML → REACT (WAJIB DIIKUTI)
1. Inventarisasi: daftar semua halaman HTML, CSS, JS, font, gambar, ikon, dan plugin template.
2. Baseline: ambil screenshot setiap halaman template asli di lebar 375, 768, 1024, 1440 px.
3. Pecah menjadi komponen (Header, Navbar, Footer, Hero, Card, Section, dst.) TANPA mengubah
   markup, hierarki DOM, maupun nama class.
4. Konversi sintaks: class→className, for→htmlFor, style string→object, tag self-closing,
   atribut SVG ke camelCase, komentar HTML dibersihkan. Hanya sintaks yang berubah, bukan tampilan.
5. Aset (CSS, font, gambar, ikon) dipakai apa adanya dengan path yang diperbaiki.
6. Script/plugin template (slider, menu mobile, accordion, animasi scroll, dst.) harus
   dipertahankan perilakunya. Boleh diganti padanan React/library setara, hasilnya harus sama.
7. Verifikasi visual: bandingkan hasil React dengan baseline memakai visual regression
   (mis. Playwright screenshot diff). Targetnya selisih ≈ 0 (maks. 0,1%) kecuali di bagian
   yang sengaja berubah warna. Perbaiki sampai cocok.
8. Hasilkan laporan perbandingan (before/after) per halaman.

## 6. WARNA (SATU-SATUNYA PERUBAHAN VISUAL YANG DIIZINKAN)
- Warna utama (primary): rgb(39, 35, 83) = #272353.
- Kesan yang diinginkan: ramai / hidup / berwarna, tidak monoton.
- Ekstrak semua warna template menjadi CSS variables (--color-primary, --color-secondary,
  --color-accent-1..n, --color-bg, --color-text, dst.), lalu petakan ulang berdasarkan PERAN
  warna, bukan mengganti elemen satu per satu.
- Saran palet pendamping yang selaras dengan #272353 (boleh disesuaikan agar harmonis):
  hijau emerald (nuansa halal), kuning amber, teal/biru langit, dan oranye/koral sebagai
  aksen CTA. Sediakan juga tint/shade primary (50–900).
- Pakai warna-warna aksen untuk membedakan bagian/kartu/badge supaya terasa ramai, tetapi
  jangan mengubah bentuk, ukuran, atau susunan elemen.
- Pastikan kontras teks memenuhi WCAG AA.

## 7. FITUR YANG HARUS DIBANGUN
Struktur menu mengikuti navbar template: Beranda, Berita, Pengumuman, Layanan
(QnA, Kalkulator Harga, Kepuasan Pelanggan, Pengaduan), Kontak.

### 7.1 Berita
- Mencakup tiga kategori: Agenda, Acara, dan Kegiatan LPH. Ada filter kategori, pencarian,
  pagination, dan halaman detail (judul, tanggal, penulis, gambar, isi, berita terkait).
- Khusus Agenda/Acara: tampilkan tanggal, waktu, dan lokasi kegiatan.
- Admin dapat membuat, mengubah, menghapus, menjadwalkan, dan mempublikasikan (rich text editor,
  upload gambar).

### 7.2 Pengumuman
- Daftar pengumuman (terbaru di atas), halaman detail, dan dukungan lampiran file (PDF).
- Tampilkan pengumuman penting/pinned di Beranda.
- Dikelola dari admin panel.

### 7.3 Layanan: QnA berbasis robot (+ admin)
- Halaman QnA berisi antarmuka tanya-jawab yang dijawab AI berdasarkan knowledge base
  (FAQ, alur sertifikasi halal, persyaratan, tarif, kontak, dll.) yang dikelola admin.
- Jika AI tidak yakin atau pengguna tidak puas dengan jawabannya, tampilkan tombol
  "Hubungi Admin" yang membuka percakapan langsung dengan admin (live chat) atau, jika admin
  offline, form pesan/redirect ke WhatsApp admin (nomor dari konfigurasi).
- Engine yang sama dipakai oleh widget chatbot pada 7.7.

### 7.4 Layanan: Kalkulator Harga
- Tujuan: calon pelanggan membandingkan harga yang ditetapkan BPJPH dengan harga yang
  ditawarkan LPH UIN SGD.
- Input (sesuaikan dengan struktur tarif): jenis layanan/skema sertifikasi, skala usaha,
  jumlah produk/varian, dan parameter lain yang memengaruhi tarif.
- Output: rincian biaya BPJPH vs LPH UIN SGD berdampingan, selisih (nominal dan persen), total
  perkiraan, serta catatan bahwa angka bersifat estimasi.
- Seluruh tarif dan aturan hitung disimpan di database dan DAPAT DIUBAH ADMIN, tidak
  di-hardcode. Gunakan data dummy berlabel sampai data resmi diberikan.
- Validasi input, format Rupiah, tombol "Hitung Ulang", dan opsi simpan/cetak hasil (PDF).

### 7.5 Kepuasan Pelanggan
- Form untuk pelanggan yang sudah memakai jasa LPH: nama (opsional), kontak (opsional),
  layanan yang dipakai, rating 1–5, aspek penilaian (kecepatan, keramahan, kejelasan
  informasi, dll.), dan komentar.
- Data masuk ke admin: tabel, filter periode, rata-rata rating, dan ekspor CSV/Excel.

### 7.6 Pengaduan
- Form pengaduan: nama, kontak (email/WA), kategori, uraian pengaduan, dan lampiran opsional
  (batasi tipe dan ukuran file).
- Setelah dikirim, pengguna mendapat kode tiket dan dapat mengecek status
  (Diterima / Diproses / Selesai).
- Admin dapat melihat, mengubah status, membalas, dan mengekspor.
- Notifikasi email/WhatsApp ke admin untuk pengaduan baru (konfigurable).

### 7.7 Chatbot (widget melayang)
- Widget di pojok layar yang tampil di semua halaman. Tampilannya dibuat dari komponen/warna
  template, tanpa gaya baru.
- Menjawab semua pertanyaan pengguna berdasarkan knowledge base. Untuk pertanyaan di luar
  cakupan, jawab dengan sopan bahwa informasi belum tersedia, jangan mengarang jawaban.
- Jika jawaban tidak ditemukan atau pengguna meminta bantuan manusia, tampilkan tombol
  "Hubungi Admin" (live chat atau fallback WhatsApp, sama seperti 7.3).
- Simpan riwayat percakapan per sesi, beri rate limit, dan sanitasi input.
- Admin dapat mengelola knowledge base (tambah/ubah/hapus FAQ) dan melihat log pertanyaan
  yang tidak terjawab untuk perbaikan.

## 8. ADMIN PANEL
- Login aman dengan role (Super Admin, Editor, Admin Layanan).
- Modul: Berita, Pengumuman, Knowledge Base chatbot, Live Chat, Tarif Kalkulator,
  Kepuasan Pelanggan, Pengaduan, Pengaturan situs (kontak, nomor WA, dll.).
- Tampilan admin boleh sederhana, tetapi memakai font dan token warna yang sama dengan website.

## 9. NON-FUNCTIONAL
- Responsif identik dengan perilaku template di semua breakpoint.
- SEO dasar: meta title/description, Open Graph, sitemap, URL yang rapi.
- Aksesibilitas: label form, alt gambar, navigasi keyboard.
- Performa: lazy loading gambar/route, kompresi aset, Lighthouse ≥ 85 tanpa mengubah desain.
- Keamanan: validasi di server, proteksi XSS/CSRF/SQL injection, rate limit, CAPTCHA/honeypot
  di form publik, upload file tervalidasi, dan secrets tidak masuk repo.
- Privasi: data pengaduan dan kepuasan hanya dapat diakses admin berwenang.

## 10. URUTAN KERJA
Fase 1: Inventarisasi template + baseline screenshot + setup project.
Fase 2: Konversi seluruh HTML ke React (tanpa fitur) + visual regression sampai identik.
Fase 3: Terapkan palet warna (bagian 6) melalui CSS variables.
Fase 4: Backend + database + admin panel dasar.
Fase 5: Berita, Pengumuman, Kepuasan, Pengaduan.
Fase 6: Kalkulator Harga.
Fase 7: Chatbot AI + QnA + live chat admin.
Fase 8: Pengujian, optimasi, dokumentasi.
Berhenti dan laporkan di akhir tiap fase. Jika ada pertanyaan yang memblokir, ajukan sekaligus
dalam satu daftar, bukan satu per satu.

## 11. DELIVERABLES & DEFINITION OF DONE
- Source code lengkap + README (instalasi, env, menjalankan, deploy).
- Skema database + seed data dummy.
- Laporan visual regression: template vs React per halaman dan breakpoint.
- Daftar semua placeholder/data dummy yang harus saya ganti.
- Daftar asumsi dan komponen yang tidak punya padanan di template.
- Selesai jika: tampilan sama persis dengan template (kecuali warna), semua fitur 7.1–7.7
  berfungsi, tidak ada error console, dan semua form tervalidasi.

## 12. INPUT YANG AKAN SAYA BERIKAN / TOLONG DIMINTA JIKA BELUM ADA
- Folder template HTML lengkap.
- Logo, kontak resmi, dan nomor WhatsApp admin.
- Data tarif BPJPH dan tarif LPH UIN SGD untuk kalkulator (dan usahakan kalkulator UIN SGD Lebih murah untuk iklan ke user bahwa lebih murah di lph uin).
- Konten FAQ/dokumen untuk knowledge base chatbot.
- Rekomendasi hosting dan layanan LLM yang dipakai.
- untuk gaya desain website harus mengacu semua ke template, kalo bisa pakai gaya desain yg sudah ada ga boleh membuat desain baru diusahakan, karena desain yang kamu gunakan itu jelek karena hasil AI nya kelihatan