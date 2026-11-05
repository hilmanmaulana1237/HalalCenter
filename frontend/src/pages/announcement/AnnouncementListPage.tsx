import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatDate } from '../../services/api';
import type { AnnouncementItem } from '../../types';

export const AnnouncementListPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [pinned, setPinned] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

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
              <em>Pengumuman Resmi</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Surat Edaran, Regulasi Halal, dan Jadwal Sidang Komite Fatwa LPH UIN SGD Bandung
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

      {/* CONTENT SECTION */}
      <section className="py-5" id="pengumuman">
        <div className="container">
          {/* PINNED ANNOUNCEMENTS */}
          {pinned.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <span className="badge badge-green mr-2">PENGUMUMAN PENTING</span>
                <h4 className="heading heading-dark heading-medium mb-0">Pemberitahuan Utama</h4>
              </div>

              <div className="row">
                {pinned.map((item) => (
                  <div key={item.id} className="col-lg-12 mb-3">
                    <div className="card card-custom p-4" style={{ borderLeft: '4px solid #059669' }}>
                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                        <div>
                          <span className="badge badge-light-green mb-2">{formatDate(item.publishedAt)}</span>
                          <h5 className="font-weight-bold mb-2">
                            <Link to={`/pengumuman/${item.slug}`} style={{ color: '#1874A5' }}>
                              {item.title}
                            </Link>
                          </h5>
                          <p className="text-muted mb-3">{item.content.substring(0, 200)}...</p>
                        </div>
                        <Link to={`/pengumuman/${item.slug}`} className="btn btn-style2">
                          <span>Buka Dokumen</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALL ANNOUNCEMENTS */}
          <div className="d-flex align-items-center mb-3">
            <span className="badge badge-blue mr-2">ARSIP RESMI</span>
            <h4 className="heading heading-dark heading-medium mb-0">Daftar Pengumuman Terbaru</h4>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Memuat...</span>
              </div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="card card-custom p-4 text-center">
              <p className="text-muted mb-0">Belum ada pengumuman yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="row">
              {announcements.map((item) => (
                <div key={item.id} className="col-md-6 mb-4">
                  <div className="card card-custom p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge badge-light-green">{formatDate(item.publishedAt)}</span>
                        {item.attachmentUrl && (
                          <span className="badge badge-secondary">PDF Terlampir</span>
                        )}
                      </div>
                      <h5 className="font-weight-bold mb-2">
                        <Link to={`/pengumuman/${item.slug}`} style={{ color: '#111827' }}>
                          {item.title}
                        </Link>
                      </h5>
                      <p className="text-muted" style={{ fontSize: '14px' }}>
                        {item.content.substring(0, 150)}...
                      </p>
                    </div>
                    <div className="mt-3">
                      <Link to={`/pengumuman/${item.slug}`} className="btn btn-text p-0">
                        Baca Selengkapnya <i className="custom-icon icon-arrow-right"></i>
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
