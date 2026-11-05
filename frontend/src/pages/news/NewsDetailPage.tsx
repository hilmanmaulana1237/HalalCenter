import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, formatDate } from '../../services/api';
import type { NewsItem } from '../../types';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/news/${slug}`);
        if (res.data.success) {
          setNews(res.data.data);
          setRelated(res.data.related || []);
        }
      } catch (err) {
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="mt-2 text-muted">Memuat artikel warta...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container py-5 text-center">
        <h2 className="heading heading-dark heading-medium">Artikel Tidak Ditemukan</h2>
        <p className="wysiwyg-text">Artikel yang Anda tuju mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/berita" className="btn btn-style1 mt-3">
          <span>&larr; Kembali ke Warta</span>
        </Link>
      </div>
    );
  }

  return (
    <main className="site-main" id="main">
      {/* HERO BANNER DARI TEMPLATE */}
      <section
        id="hero"
        className="hero-banner hero-banner-style2"
        style={{ backgroundImage: "url('/assets/images/img_006.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <div className="badge badge-green mb-2">{news.category}</div>
            <h1 className="heading heading-large hero-banner-heading" style={{ fontSize: '2.2rem', maxWidth: '850px', margin: '0 auto' }}>
              <em>{news.title}</em>
            </h1>
            <div className="text-white mt-3" style={{ fontSize: '13px', opacity: 0.9 }}>
              📅 {formatDate(news.publishedAt)} {news.author?.name && `• Ditulis oleh ${news.author.name}`}
            </div>
          </div>
        </div>

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

      {/* ARTICLE CONTENT */}
      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="row">
            {/* Main Article */}
            <div className="col-lg-8 mb-4">
              <div className="mb-4">
                <Link to="/berita" className="btn btn-text text-muted" style={{ padding: 0, fontSize: '13px' }}>
                  &larr; Kembali ke Semua Warta
                </Link>
              </div>

              {/* Event Box if Agenda/Acara */}
              {(news.eventDate || news.eventLocation) && (
                <div
                  className="card p-3 mb-4"
                  style={{
                    backgroundColor: 'var(--color-bg-surface-primary, #F8F7FF)',
                    border: '1px solid var(--color-primary-200, #A9A6DB)',
                    borderRadius: '10px',
                  }}
                >
                  <h5 className="heading heading-dark heading-small mb-2">
                    <em>📌 Detail Jadwal &amp; Lokasi Acara</em>
                  </h5>
                  <div className="row" style={{ fontSize: '14px' }}>
                    {news.eventDate && (
                      <div className="col-md-6 mb-2">
                        <strong>Tanggal:</strong> {formatDate(news.eventDate)}
                      </div>
                    )}
                    {news.eventTime && (
                      <div className="col-md-6 mb-2">
                        <strong>Waktu:</strong> {news.eventTime}
                      </div>
                    )}
                    {news.eventLocation && (
                      <div className="col-12">
                        <strong>Lokasi:</strong> {news.eventLocation}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Body */}
              <div
                className="wysiwyg-text"
                style={{ fontSize: '16px', lineHeight: '1.8', color: '#1F2937' }}
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              <div className="mt-5 pt-3 border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
                <Link to="/berita" className="btn btn-outline-secondary btn-sm">
                  &larr; Daftar Warta Lainnya
                </Link>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  LPH UIN Sunan Gunung Djati Bandung
                </div>
              </div>
            </div>

            {/* Sidebar Related */}
            <div className="col-lg-4">
              <div className="card shadow-sm p-4" style={{ borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#F8F7FF' }}>
                <h5 className="heading heading-dark heading-small mb-3">
                  <em>Berita Terkait</em>
                </h5>

                {related.length === 0 ? (
                  <p className="text-muted" style={{ fontSize: '13px' }}>Belum ada warta terkait lainnya.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {related.map((rel) => (
                      <div key={rel.id} className="pb-3 border-bottom">
                        <span className="badge badge-green mb-1" style={{ fontSize: '10px' }}>{rel.category}</span>
                        <h6 style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 0 0', lineHeight: '1.4' }}>
                          <Link to={`/berita/${rel.slug}`} style={{ color: 'var(--color-primary-600, #272353)', textDecoration: 'none' }}>
                            {rel.title}
                          </Link>
                        </h6>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{formatDate(rel.publishedAt)}</small>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-top">
                  <div className="badge badge-green mb-1">KONSULTASI</div>
                  <h6 className="font-weight-bold">Periksa Tarif Usaha Anda</h6>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    Kalkulator tarif resmi LPH UIN SGD siap membantu simulasi biaya audit.
                  </p>
                  <Link to="/layanan/kalkulator-harga" className="btn btn-style2 btn-block btn-sm text-center">
                    <span>Buka Kalkulator Tarif &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
