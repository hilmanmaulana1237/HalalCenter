import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { KnowledgeBaseItem } from '../../types';

export const QnaPage: React.FC = () => {
  const [faqs, setFaqs] = useState<KnowledgeBaseItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  // Robot AI state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get('/chat/admin/kb');
        if (res.data.success) {
          setFaqs(res.data.data.filter((f: KnowledgeBaseItem) => f.isActive));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);
    try {
      const res = await api.post('/chat/ask', { question: aiQuestion });
      setAiAnswer(res.data);
    } catch (err) {
      setAiAnswer({
        answer: 'Terjadi kendala saat menghubungi asisten cerdas. Silakan hubungi admin kami via WhatsApp.',
        canContactAdmin: true,
        waUrl: 'https://wa.me/628111148696',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const categories = ['SEMUA', 'PROSEDUR', 'SYARAT', 'TARIF', 'SJPH'];

  const filteredFaqs = faqs.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      activeCategory === 'SEMUA' ||
      (item.tags && item.tags.toLowerCase().includes(activeCategory.toLowerCase()));

    return matchesSearch && matchesCat;
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
        style={{ backgroundImage: "url('/assets/images/hero_faq.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading">
              <em>Frequently Asked Questions</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Pusat Informasi &amp; Tanya Jawab Resmi Seputar Sertifikasi Halal LPH UIN Sunan Gunung Djati Bandung
            </p>
            <a className="btn btn-large btn-icon btn-style4 hero-banner-btn" href="#faq">
              Lihat Selengkapnya <i className="custom-icon icon-arrow-down"></i>
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

      {/* FAQ SECTION FROM TEMPLATE */}
      <section className="faq-list py-5" id="faq">
        <div className="container">
          {/* ASK AI SEARCH BOX */}
          <div className="card card-custom p-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="badge badge-green mr-2">TANYA JAWAB</span>
              <h3 className="heading heading-dark heading-medium mb-0">
                <em>Konsultasi Halal Interaktif</em>
              </h3>
            </div>
            <p className="wysiwyg-text mb-3">
              Ketik pertanyaan Anda seputar persyaratan, alur sertifikasi halal, atau tarif pemeriksaan. Sistem kami akan mencari jawaban relevan secara instan.
            </p>
            <form onSubmit={handleAskAI}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ketik pertanyaan Anda di sini... (Contoh: Apa syarat sertifikasi halal produk makanan?)"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    disabled={aiLoading || !aiQuestion.trim()}
                    className="btn btn-style2"
                  >
                    <span>{aiLoading ? 'Mencari...' : 'Tanya Sekarang'}</span>
                  </button>
                </div>
              </div>
            </form>

            {aiAnswer && (
              <div className="alert alert-info mt-4 mb-0" style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', color: '#0369A1' }}>
                <h5 className="font-weight-bold mb-2">Jawaban Informasi:</h5>
                <p className="mb-2" style={{ whiteSpace: 'pre-line' }}>{aiAnswer.answer}</p>
                {aiAnswer.canContactAdmin && (
                  <div className="mt-3">
                    <a
                      href={aiAnswer.waUrl || 'https://wa.me/628111148696'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-style1"
                    >
                      <span>Hubungi Admin Halal via WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SEARCH BAR FROM TEMPLATE */}
          <div className="faq-list-header">
            <div className="row align-items-center">
              <div className="col-lg-12 mb-3">
                <form className="mb-3 border-full" id="searchForm" onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="custom-icon icon-search-dark"></i>
                      </span>
                    </div>
                    <input
                      aria-label="Search"
                      className="form-control"
                      id="searchInput"
                      placeholder="Cari dalam daftar FAQ..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ CONTENT ACCORDION FROM TEMPLATE */}
          <div className="faq-list-content">
            <div className="row justify-content-between">
              {/* CATEGORIES SIDEBAR FROM TEMPLATE */}
              <div className="col-lg-3 mb-4">
                <ul className="list-group" id="categoryList">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`list-group-item ${activeCategory === cat ? 'active' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat === 'SEMUA' ? 'Semua Topik' : cat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACCORDION FROM TEMPLATE */}
              <div className="col-lg-8 mb-4">
                <div className="accordion" id="faqAccordion">
                  {filteredFaqs.length === 0 ? (
                    <div className="card card-custom p-4 text-center">
                      <p className="text-muted mb-0">Tidak ditemukan pertanyaan yang cocok.</p>
                    </div>
                  ) : (
                    filteredFaqs.map((faq) => {
                      const isOpen = openId === faq.id;
                      return (
                        <div key={faq.id} className="card card-custom mb-3" style={{ border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                          <div
                            className="card-header bg-white"
                            style={{ cursor: 'pointer', padding: '16px 20px' }}
                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="mb-0 font-weight-bold" style={{ fontSize: '15px', color: '#111827' }}>
                                {faq.question}
                              </h5>
                              <span style={{ fontSize: '18px', color: '#1874A5' }}>
                                {isOpen ? '−' : '+'}
                              </span>
                            </div>
                          </div>
                          {isOpen && (
                            <div className="card-body" style={{ padding: '20px', borderTop: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}>
                              <p className="mb-0" style={{ fontSize: '14px', lineHeight: '1.6', color: '#374151', whiteSpace: 'pre-line' }}>
                                {faq.answer}
                              </p>
                              {faq.tags && (
                                <div className="mt-3">
                                  <span className="badge badge-light-green mr-2">Topik: {faq.tags}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
