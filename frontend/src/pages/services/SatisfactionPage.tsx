import React, { useState } from 'react';
import { api } from '../../services/api';

export const SatisfactionPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceUsed, setServiceUsed] = useState('Pemeriksaan Kehalalan Produk Reguler');
  const [rating, setRating] = useState(5);
  const [speedRating, setSpeedRating] = useState(5);
  const [friendlinessRating, setFriendlinessRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [facilityRating, setFacilityRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/satisfaction', {
        name,
        contact,
        serviceUsed,
        rating,
        speedRating,
        friendlinessRating,
        clarityRating,
        facilityRating,
        comment,
      });
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      alert('Gagal mengirimkan penilaian. Mohon coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const renderRatingGroup = (index: number, label: string, currentVal: number, setVal: (n: number) => void) => {
    const options = [
      { val: 1, label: 'Sangat Kurang', short: 'S.Kurang' },
      { val: 2, label: 'Kurang', short: 'Kurang' },
      { val: 3, label: 'Cukup', short: 'Cukup' },
      { val: 4, label: 'Baik', short: 'Baik' },
      { val: 5, label: 'Sangat Baik', short: 'S.Baik' },
    ];

    const currentOpt = options.find((o) => o.val === currentVal);

    return (
      <div className="ikm-question-card">
        <div className="ikm-question-title">
          <span className="ikm-question-num">{index}</span>
          <span style={{ flex: 1 }}>{label}</span>
        </div>
        <div className="ikm-rating-grid mb-2">
          {options.map((item) => (
            <button
              key={item.val}
              type="button"
              className={`ikm-btn-option ${currentVal === item.val ? 'is-selected' : ''}`}
              onClick={() => setVal(item.val)}
            >
              <span className="opt-val">{item.val}</span>
              <span className="opt-text d-none d-sm-inline">{item.label}</span>
              <span className="opt-text d-inline d-sm-none">{item.short}</span>
            </button>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-1">
          <span className="text-muted" style={{ fontSize: '11px' }}>Skala 1 (Rendah) - 5 (Tinggi)</span>
          {currentOpt && (
            <span className="ikm-badge-selected">
              Pilihan: {currentOpt.val} - {currentOpt.label}
            </span>
          )}
        </div>
      </div>
    );
  };

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
              <em>Survei Kepuasan Pelanggan (IKM)</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Masukan Anda Berharga Bagi Peningkatan Kualitas Layanan Pemeriksaan Halal LPH UIN SGD Bandung
            </p>
            <a className="btn btn-large btn-icon btn-style4 hero-banner-btn" href="#survei">
              Isi Survei <i className="custom-icon icon-arrow-down"></i>
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
      <section className="py-5" id="survei" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="service-form-card">
                <div className="service-card-header text-center">
                  <span className="badge-pill-tag">EVALUASI LAYANAN</span>
                  <h2 className="card-main-title" style={{ fontSize: '26px' }}>Indeks Kepuasan Masyarakat (IKM)</h2>
                  <p className="card-subtitle mx-auto" style={{ maxWidth: '640px' }}>
                    Survei ini bertujuan untuk mengukur kepuasan pelaku usaha terhadap proses audit, transparansi tarif, dan keramahan petugas LPH UIN SGD Bandung.
                  </p>
                </div>

                {submitted ? (
                  <div className="alert p-4 text-center my-4" style={{ backgroundColor: '#ECFDF5', border: '1.5px solid #A7F3D0', borderRadius: '14px', color: '#065F46' }}>
                    <div className="mb-3">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h4 className="font-weight-bold mb-2" style={{ color: '#065F46', fontSize: '20px' }}>
                      Terima Kasih atas Partisipasi Anda!
                    </h4>
                    <p className="mb-4 text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Penilaian dan masukan Anda telah tersimpan dengan aman dan akan menjadi bahan evaluasi berkala manajemen LPH UIN SGD Bandung demi peningkatan mutu layanan prima.
                    </p>
                    <button
                      type="button"
                      className="btn btn-style2"
                      style={{ borderRadius: '10px', padding: '10px 24px', fontWeight: 600 }}
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setContact('');
                        setComment('');
                      }}
                    >
                      <span>Kirim Penilaian Lain</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* BAGIAN 1: INFORMASI RESPONDEN */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="badge badge-primary mr-2" style={{ backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}>
                          LANGKAH 1
                        </span>
                        <h5 className="font-weight-bold mb-0" style={{ fontSize: '15px', color: '#1E293B' }}>
                          Identitas Pelaku Usaha
                        </h5>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="modern-label" htmlFor="custName">
                            <span>Nama Pelaku Usaha / Perusahaan <span className="required-dot">*</span></span>
                          </label>
                          <input
                            type="text"
                            id="custName"
                            className="modern-input"
                            required
                            placeholder="Contoh: PT / CV / Nama Usaha"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="modern-label" htmlFor="custContact">
                            <span>Kontak (HP / WhatsApp / Email) <span className="required-dot">*</span></span>
                          </label>
                          <input
                            type="text"
                            id="custContact"
                            className="modern-input"
                            required
                            placeholder="Contoh: 0812xxxxxxx"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-0">
                        <label className="modern-label" htmlFor="serviceSel">
                          <span>Layanan yang Digunakan <span className="required-dot">*</span></span>
                        </label>
                        <select
                          id="serviceSel"
                          className="modern-select"
                          value={serviceUsed}
                          onChange={(e) => setServiceUsed(e.target.value)}
                        >
                          <option value="Pemeriksaan Kehalalan Produk Reguler">Pemeriksaan Kehalalan Produk Reguler</option>
                          <option value="Pendampingan UMK / Sertifikasi Self Declare">Pendampingan UMK / Sertifikasi Self Declare</option>
                          <option value="Uji Laboratorium Kehalalan Bahan">Uji Laboratorium Kehalalan Bahan</option>
                          <option value="Pelatihan Penyelia Halal / SJPH">Pelatihan Penyelia Halal / SJPH</option>
                          <option value="Konsultasi Teknis & Pra-Audit">Konsultasi Teknis &amp; Pra-Audit</option>
                        </select>
                      </div>
                    </div>

                    <hr className="my-4" style={{ borderColor: '#E2E8F0' }} />

                    {/* BAGIAN 2: PENILAIAN INDIKATOR LAYANAN */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="badge badge-primary mr-2" style={{ backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}>
                          LANGKAH 2
                        </span>
                        <h5 className="font-weight-bold mb-0" style={{ fontSize: '15px', color: '#1E293B' }}>
                          Penilaian 5 Indikator Kepuasan
                        </h5>
                      </div>
                      <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                        Pilih skala penilaian dari 1 (Sangat Kurang) hingga 5 (Sangat Baik) pada masing-masing indikator di bawah ini:
                      </p>

                      {renderRatingGroup(1, 'Kepuasan Menyeluruh (Overall Experience)', rating, setRating)}
                      {renderRatingGroup(2, 'Kecepatan dan Ketepatan Waktu Pemeriksaan', speedRating, setSpeedRating)}
                      {renderRatingGroup(3, 'Keramahan & Profesionalitas Auditor Halal', friendlinessRating, setFriendlinessRating)}
                      {renderRatingGroup(4, 'Kejelasan Informasi Prosedur & Transparansi Biaya', clarityRating, setClarityRating)}
                      {renderRatingGroup(5, 'Fasilitas Layanan & Responsivitas Admin', facilityRating, setFacilityRating)}
                    </div>

                    <hr className="my-4" style={{ borderColor: '#E2E8F0' }} />

                    {/* BAGIAN 3: KRITIK & SARAN */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="badge badge-primary mr-2" style={{ backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}>
                          LANGKAH 3
                        </span>
                        <h5 className="font-weight-bold mb-0" style={{ fontSize: '15px', color: '#1E293B' }}>
                          Kritik, Saran, &amp; Apresiasi
                        </h5>
                      </div>

                      <div className="form-group mb-0">
                        <label className="modern-label" htmlFor="commentArea">
                          <span>Masukan untuk Peningkatan Mutu Layanan</span>
                          <span className="label-hint">Opsional</span>
                        </label>
                        <textarea
                          id="commentArea"
                          className="modern-textarea"
                          rows={4}
                          placeholder="Berikan saran konstruktif untuk peningkatan layanan kami ke depan..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-style2 w-100 d-flex align-items-center justify-content-center py-3"
                        style={{ borderRadius: '10px', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2px' }}
                      >
                        {loading ? (
                          <>
                            <div className="spinner-border spinner-border-sm text-light mr-2" role="status"></div>
                            <span>Mengirim Penilaian...</span>
                          </>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            <span>Kirim Penilaian Kepuasan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
