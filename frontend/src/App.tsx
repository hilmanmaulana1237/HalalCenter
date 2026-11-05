import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { NewsListPage } from './pages/news/NewsListPage';
import { NewsDetailPage } from './pages/news/NewsDetailPage';
import { AnnouncementListPage } from './pages/announcement/AnnouncementListPage';
import { AnnouncementDetailPage } from './pages/announcement/AnnouncementDetailPage';
import { QnaPage } from './pages/services/QnaPage';
import { PriceCalculatorPage } from './pages/services/PriceCalculatorPage';
import { SatisfactionPage } from './pages/services/SatisfactionPage';
import { ComplaintPage } from './pages/services/ComplaintPage';
import { ContactPage } from './pages/contact/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website with Header, Footer, and Floating WhatsApp */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/tentang-lppom" element={<Navigate to="/tentang" replace />} />
          <Route path="/berita" element={<NewsListPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/pengumuman" element={<AnnouncementListPage />} />
          <Route path="/pengumuman/:slug" element={<AnnouncementDetailPage />} />
          
          {/* Layanan */}
          <Route path="/layanan/qna" element={<QnaPage />} />
          <Route path="/faq" element={<Navigate to="/layanan/qna" replace />} />
          <Route path="/layanan/kalkulator" element={<PriceCalculatorPage />} />
          <Route path="/layanan/kalkulator-harga" element={<PriceCalculatorPage />} />
          <Route path="/layanan/kepuasan" element={<SatisfactionPage />} />
          <Route path="/layanan/kepuasan-pelanggan" element={<SatisfactionPage />} />
          <Route path="/layanan/pengaduan" element={<ComplaintPage />} />
          
          {/* Kontak */}
          <Route path="/kontak" element={<ContactPage />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                <h1 style={{ fontSize: '72px', fontWeight: 800, color: '#1874A5' }}>404</h1>
                <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Halaman Tidak Ditemukan</h3>
                <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                  Halaman yang Anda tuju mungkin salah ketik atau telah dipindahkan.
                </p>
                <a href="/" className="btn btn-style1">
                  <span>Kembali ke Beranda</span>
                </a>
              </div>
            }
          />
        </Route>

        {/* Admin Portal (Isolated Layout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
