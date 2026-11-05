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

  const renderRatingGroup = (label: string, currentVal: number, setVal: (n: number) => void) => {
    return (
      <div className="form-group mb-4">
        <label className="font-weight-bold d-block mb-2">{label}</label>
        <div className="d-flex flex-wrap gap-2">
          {[
            { val: 1, label: '1 - Sangat Kurang' },
            { val: 2, label: '2 - Kurang' },
            { val: 3, label: '3 - Cukup' },
            { val: 4, label: '4 - Baik' },
            { val: 5, label: '5 - Sangat Baik' },
          ].map((item) => (
            <button
              key={item.val}
              type="button"
              className={`btn btn-sm mr-2 mb-2 ${currentVal === item.val ? 'btn-style2' : 'btn-style1'}`}
              onClick={() => setVal(item.val)}
            >
              <span>{item.label}</span>
            </button>
          ))}
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
      <section className="py-5" id="survei">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card card-custom p-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge badge-green mr-2">EVALUASI LAYANAN</span>
                  <h4 className="heading heading-dark heading-medium mb-0">Indeks Kepuasan Masyarakat (IKM)</h4>
                </div>
                <p className="wysiwyg-text mb-4">
                  Survei ini bertujuan untuk mengukur kepuasan pelaku usaha terhadap proses audit, transparansi tarif, dan keramahan petugas LPH UIN SGD Bandung.
                </p>

                {submitted ? (
                  <div className="alert alert-success p-4 text-center" style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }}>
                    <div className="mb-2">
                      <i className="custom-icon icon-verified" style={{ transform: 'scale(1.5)' }}></i>
                    </div>
                    <h4 className="font-weight-bold mb-2">Terima Kasih atas Partisipasi Anda!</h4>
                    <p className="mb-3">
                      Penilaian dan masukan Anda telah tersimpan dengan aman dan akan menjadi bahan evaluasi berkala manajemen LPH UIN SGD Bandung.
                    </p>
                    <button
                      type="button"
                      className="btn btn-style2"
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
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold" htmlFor="custName">Nama Pelaku Usaha / Perusahaan</label>
                        <input
                          type="text"
                          id="custName"
                          className="form-control"
                          required
                          placeholder="PT / CV / Nama Usaha"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold" htmlFor="custContact">Kontak (HP / Email)</label>
                        <input
                          type="text"
                          id="custContact"
                          className="form-control"
                          required
                          placeholder="0812xxxx"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label className="font-weight-bold" htmlFor="serviceSel">Layanan yang Digunakan</label>
                      <select
                        id="serviceSel"
                        className="form-control"
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

                    <hr className="my-4" />

                    {renderRatingGroup('1. Kepuasan Menyeluruh (Overall Experience)', rating, setRating)}
                    {renderRatingGroup('2. Kecepatan dan Ketepatan Waktu Pemeriksaan', speedRating, setSpeedRating)}
                    {renderRatingGroup('3. Keramahan & Profesionalitas Auditor Halal', friendlinessRating, setFriendlinessRating)}
                    {renderRatingGroup('4. Kejelasan Informasi Prosedur & Transparansi Biaya', clarityRating, setClarityRating)}
                    {renderRatingGroup('5. Fasilitas Layanan & Responsivitas Admin', facilityRating, setFacilityRating)}

                    <div className="form-group mb-4">
                      <label className="font-weight-bold" htmlFor="commentArea">Kritik, Saran, &amp; Apresiasi</label>
                      <textarea
                        id="commentArea"
                        className="form-control"
                        rows={3}
                        placeholder="Berikan saran konstruktif untuk peningkatan layanan kami ke depan..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-style2 w-100"
                    >
                      <span>{loading ? 'Mengirim...' : 'Kirim Penilaian Kepuasan'}</span>
                    </button>
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
