import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, formatDate } from '../../services/api';
import type { NewsItem } from '../../types';

export const NewsListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 1 });

  const currentCategory = searchParams.get('category') || 'ALL';
  const currentSearch = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: '6',
          category: currentCategory,
          search: currentSearch,
        });
        const res = await api.get(`/news?${queryParams.toString()}`);
        if (res.data.success) {
          setNews(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error('Error fetching news list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentCategory, currentSearch, currentPage]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'ALL') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchVal = formData.get('search')?.toString() || '';
    const params = new URLSearchParams(searchParams);
    if (searchVal) {
      params.set('search', searchVal);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <main className="site-main" id="main">
      {/* HERO BANNER DARI TEMPLATE */}
      <section
        id="hero"
        className="hero-banner hero-banner-style2"
        style={{ backgroundImage: "url('/assets/images/img_004.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading">
              <em>Berita, Agenda &amp; Acara</em>
            </h1>
            <p style={{ color: '#FFFFFF', fontSize: '18px', maxWidth: '750px', margin: '15px auto 25px auto' }}>
              Publikasi Resmi Kegiatan Pemeriksaan Halal, Agenda Workshop, dan Sosialisasi SJPH LPH UIN SGD Bandung
            </p>
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

      {/* SECTION NEWS CONTENT DARI TEMPLATE */}
      <section id="news" className="news-update py-5" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="container">
          <div className="news-update-header mb-4">
            <div className="row align-items-center">
              <div className="col-md-8 mb-2">
                <div className="badge badge-green">NEWS &amp; UPDATE</div>
                <h2 className="heading heading-dark heading-medium">
                  <em>Warta Terkini LPH UIN SGD</em>
                </h2>
              </div>
              <div className="col-md-4 mb-2">
                <form onSubmit={handleSearchSubmit} className="input-group">
                  <input
                    type="text"
                    name="search"
                    defaultValue={currentSearch}
                    placeholder="Cari berita atau agenda..."
                    className="form-control"
                    style={{ borderRadius: '6px 0 0 6px', fontSize: '13px' }}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-style2" style={{ padding: '0 16px' }}>
                      <span>Cari</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Category tabs */}
            <div className="d-flex gap-2 flex-wrap mt-3">
              {[
                { id: 'ALL', label: 'Semua Warta' },
                { id: 'AGENDA', label: '📅 Agenda Kegiatan' },
                { id: 'ACARA', label: '🎉 Acara & Workshop' },
                { id: 'KEGIATAN', label: '🏢 Kegiatan Audit LPH' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`btn btn-sm mr-2 mb-2 ${currentCategory === tab.id ? 'btn-style1' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: '20px', padding: '6px 16px', fontWeight: 600 }}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* News Cards Grid */}
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border mb-2" role="status"></div>
              <div>Memuat berita terkini...</div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-5 bg-white rounded shadow-sm p-4">
              <h5 className="heading heading-dark heading-small">Tidak ada berita ditemukan</h5>
              <p className="wysiwyg-text">Silakan coba kata kunci lain atau pilih semua kategori.</p>
            </div>
          ) : (
            <div className="row">
              {news.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div
                    className="card h-100 shadow-sm"
                    style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}
                  >
                    <div
                      style={{
                        height: '190px',
                        backgroundImage: `url(${item.featuredImage || '/assets/images/img_006.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                        }}
                      >
                        <span className="badge badge-green" style={{ textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <div className="text-muted mb-2" style={{ fontSize: '12px' }}>
                        📅 {formatDate(item.publishedAt)}
                      </div>

                      <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-primary-600, #272353)', lineHeight: '1.4', marginBottom: '10px' }}>
                        <Link to={`/berita/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {item.title}
                        </Link>
                      </h4>

                      {/* Detail Agenda / Acara */}
                      {(item.eventDate || item.eventLocation) && (
                        <div className="p-2 mb-2 rounded bg-light" style={{ fontSize: '11px', color: '#4B5563' }}>
                          {item.eventDate && <div><strong>Waktu:</strong> {formatDate(item.eventDate)} {item.eventTime && `(${item.eventTime})`}</div>}
                          {item.eventLocation && <div><strong>Lokasi:</strong> {item.eventLocation}</div>}
                        </div>
                      )}

                      <p className="wysiwyg-text flex-grow-1" style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px 0' }}>
                        {item.excerpt}
                      </p>

                      <div className="mt-auto pt-2 border-top">
                        <Link to={`/berita/${item.slug}`} className="btn btn-text" style={{ padding: 0, fontWeight: 700, color: 'var(--color-secondary-500, #059669)' }}>
                          Baca Selengkapnya &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
              <button
                disabled={pagination.page <= 1}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('page', (pagination.page - 1).toString());
                  setSearchParams(params);
                }}
                className="btn btn-outline-secondary btn-sm mr-2"
              >
                &larr; Sebelumnya
              </button>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>
                Halaman {pagination.page} dari {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('page', (pagination.page + 1).toString());
                  setSearchParams(params);
                }}
                className="btn btn-outline-secondary btn-sm ml-2"
              >
                Selanjutnya &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
