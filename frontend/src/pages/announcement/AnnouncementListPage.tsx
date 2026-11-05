import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatDate } from '../../services/api';
import type { AnnouncementItem } from '../../types';

// Helper to strip any raw HTML tags (e.g. <p>, </p>, &nbsp;) so excerpts are clean
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
};

export const AnnouncementListPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [pinned, setPinned] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await api.get('/announcements');
        if (res.data.success) {
          setAnnouncements(res.data.data);
          setPinned(res.data.pinned || []);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      stripHtml(item.content).toLowerCase().includes(query)
    );
  });

  return (
    <main className="site-main" id="main">
      <div id="floating-whatsapp">
        <a
          aria-label="WhatsApp Button"
          className="whatsapp-button-container"
          href="https://wa.me/628111148696"
          rel="noopener"
          target="_blank"
        >
          <div className="whatsapp-button">
            <svg className="icon icon-whatsapp" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"></path>
            </svg>
          </div>
        </a>
      </div>

      {/* HERO BANNER STYLE 2 FROM TEMPLATE */}
      <section
        className="hero-banner hero-banner-style2"
        id="hero"
        style={{ backgroundImage: "url('/assets/images/hero_tentang.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading">
              <em>Pengumuman &amp; Regulasi Resmi</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Surat Edaran, Jadwal Sidang Fatwa, dan Petunjuk Teknis LPH UIN Sunan Gunung Djati Bandung
            </p>
            <a className="btn btn-large btn-icon btn-style4 hero-banner-btn" href="#pengumuman">
              Lihat Pengumuman <i className="custom-icon icon-arrow-down"></i>
            </a>
          </div>
        </div>

        {/* DIVIDER BOXES FROM TEMPLATE */}
        <div className="divider">
          <div className="divider-box box-primary-500 rounded-0"></div>
          <div className="divider-box box-primary-600"></div>
          <div className="divider-box box-primary-400"></div>
          <div className="divider-box box-secondary-300"></div>
          <div className="divider-box box-secondary-400"></div>
          <div className="divider-box box-secondary-500"></div>
          <div className="divider-box box-secondary-600 rounded-0"></div>
        </div>
      </section>

      {/* ANNOUNCEMENT CONTENT SECTION */}
      <section className="announcement-section-theme" id="pengumuman">
        <div className="container">
          {/* 1. PINNED / PRIORITY ANNOUNCEMENTS */}
          {pinned.length > 0 && (
            <div className="mb-5">
              <div className="mb-4">
                <div className="news-badge-outline">PENGUMUMAN PENTING</div>
                <h2 className="news-main-title">
                  <span className="news-title-badge-green">PEMBERITAHUAN UTAMA</span>
                  <span className="news-title-text">LPH &amp; LP3H UIN SUNAN GUNUNG DJATI</span>
                </h2>
              </div>

              <div className="row">
                {pinned.map((item) => (
                  <div key={item.id} className="col-12 mb-4">
                    <div className="announcement-featured-card">
                      <div className="announcement-meta-row">
                        <span className="chip-date-green">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {formatDate(item.publishedAt)}
                        </span>
                        <div className="d-flex align-items-center gap-2">
                          {item.attachmentUrl && (
                            <span className="chip-pdf">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                              </svg>
                              PDF Lampiran
                            </span>
                          )}
                          <span className="chip-priority">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            PENTING / SEGERA
                          </span>
                        </div>
                      </div>

                      <h3 className="announcement-featured-title">
                        <Link to={`/pengumuman/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p className="announcement-featured-desc">
                        {stripHtml(item.content).substring(0, 240)}...
                      </p>

                      <div className="announcement-featured-footer">
                        <div className="d-flex align-items-center text-muted" style={{ fontSize: '13px' }}>
                          <span className="badge badge-green mr-2" style={{ padding: '4px 10px', fontSize: '11px' }}>RESMI</span>
                          Pusat Kajian Halal (Halal Center) UIN Sunan Gunung Djati Bandung
                        </div>
                        <Link to={`/pengumuman/${item.slug}`} className="btn btn-style1">
                          <span>Buka Dokumen Lengkap &rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ALL ANNOUNCEMENTS / ARSIP RESMI */}
          <div className="row align-items-center mb-4 mt-2">
            <div className="col-lg-7 mb-3 mb-lg-0">
              <div className="news-badge-outline">ARSIP &amp; EDARAN RESMI</div>
              <h2 className="news-main-title">
                <span className="news-title-badge-green" style={{ background: '#1874A5' }}>ARSIP RESMI</span>
                <span className="news-title-text">DAFTAR PENGUMUMAN TERBARU</span>
              </h2>
            </div>
            <div className="col-lg-5 text-lg-right">
              <div className="input-group" style={{ maxWidth: '340px', marginLeft: 'auto' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari pengumuman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderRadius: '8px 0 0 8px',
                    fontSize: '13.5px',
                    border: '1.5px solid #CBD5E1',
                    padding: '8px 14px',
                  }}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderRadius: '0 8px 8px 0',
                      border: '1.5px solid #CBD5E1',
                      borderLeft: 'none',
                      color: '#64748B',
                    }}
                  >
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border text-success mb-2" role="status"></div>
              <div>Memuat arsip pengumuman resmi...</div>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="card bg-white p-5 text-center shadow-sm" style={{ borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div className="mb-3" style={{ fontSize: '32px' }}>📭</div>
              <h5 className="heading heading-dark heading-small mb-2">Tidak ada pengumuman ditemukan</h5>
              <p className="wysiwyg-text text-muted mb-0">
                {searchQuery ? `Tidak ada pengumuman dengan kata kunci "${searchQuery}". Coba kata kunci lain.` : 'Belum ada pengumuman yang dipublikasikan.'}
              </p>
            </div>
          ) : (
            <div className="row">
              {filteredAnnouncements.map((item) => (
                <div key={item.id} className="col-lg-6 mb-4">
                  <div className="announcement-item-card">
                    <div>
                      <div className="announcement-meta-row">
                        <span className="chip-date-green">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {formatDate(item.publishedAt)}
                        </span>
                        {item.attachmentUrl && (
                          <span className="chip-pdf">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            PDF Terlampir
                          </span>
                        )}
                      </div>

                      <h4 className="announcement-item-title">
                        <Link to={`/pengumuman/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>

                      <p className="announcement-item-desc">
                        {stripHtml(item.content).substring(0, 160)}...
                      </p>
                    </div>

                    <div className="announcement-item-footer">
                      <span className="text-muted" style={{ fontSize: '12px' }}>
                        Surat Edaran LPH UIN SGD
                      </span>
                      <Link to={`/pengumuman/${item.slug}`} className="announcement-action-btn">
                        Baca Selengkapnya <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
