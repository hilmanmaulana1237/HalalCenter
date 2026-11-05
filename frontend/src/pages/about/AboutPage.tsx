import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Director {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  quote?: string;
  responsibilities: string[];
}

const DIRECTORS: Director[] = [
  {
    id: 1,
    name: 'Prof. Dr. H. Rosihon Anwar, M.Ag',
    position: 'Rektor UIN SGD Bandung / Dewan Pembina Halal Center',
    image: '/assets/images/uin_sgd/uin_12.webp',
    bio: 'Prof. Dr. H. Rosihon Anwar, M.Ag adalah Guru Besar dan Rektor UIN Sunan Gunung Djati Bandung. Beliau memprakarsai paradigma "Halalsphere University" yang mengintegrasikan riset lintas fakultas ke dalam ekosistem halal terpadu, serta mengawal terbitnya akreditasi LPH UIN Sunan Gunung Djati Bandung dari BPJPH Kemenag RI.',
    quote: 'Atas capaian yang membanggakan kampus ini, kami mengucapkan terima kasih atas segala kepercayaan masyarakat untuk dapat mengajukan sertifikasi halal baik melalui jalur self declare maupun jalur reguler di LPH UIN Sunan Gunung Djati Bandung.',
    responsibilities: [
      'Penetapan arah strategis kebijakan Halalsphere University',
      'Pengawasan mutu, integritas, dan tata kelola kelembagaan halal',
      'Penguatan sinergi pentahelix bersama BPJPH, Komisi Fatwa MUI, dan Industri'
    ]
  },
  {
    id: 2,
    name: 'Dr. Tri Cahyanto, M.Si.',
    position: 'Kepala Halal Center UIN Sunan Gunung Djati Bandung',
    image: '/assets/images/uin_sgd/uin_13.webp',
    bio: 'Dr. Tri Cahyanto, M.Si. memimpin Halal Center UIN Sunan Gunung Djati Bandung dalam mengonsolidasikan 6 unit strategis: Lembaga Pemeriksa Halal (LPH), Lembaga Pendamping Proses Produk Halal (LP3H), Lembaga Pelatihan Jaminan Produk Halal (LPJPH), Laboratorium Pengujian & Kalibrasi Halal, Akademi JULEHA, serta Indonesian Journal of Halal Research (IJHR).',
    quote: 'Melalui konsep "Halalsphere University", Halal Center UIN Sunan Gunung Djati Bandung berkomitmen untuk menjadi lembaga terdepan dalam pengembangan atmosfer halal di Indonesia dan dunia, memberikan kontribusi nyata bagi seluruh lapisan masyarakat.',
    responsibilities: [
      'Memimpin operasional dan koordinasi 6 pilar unit Halal Center',
      'Akselerasi sertifikasi halal UMKM dan industri skala nasional/internasional',
      'Peningkatan kompetensi auditor halal, penyelia halal, dan pendamping PPH'
    ]
  },
  {
    id: 3,
    name: 'Tim Auditor & Manajemen LPH UIN SGD',
    position: 'Lembaga Pemeriksa Halal (LPH) & Tenaga Ahli Laboratorium',
    image: '/assets/images/uin_sgd/uin_15.webp',
    bio: 'Didukung oleh puluhan auditor halal berkualifikasi BPJPH/MUI dan analis laboratorium terpadu kimia-biologi dengan fasilitas Real-Time PCR dan GC-FID. Telah sukses mengantarkan lebih dari 1.000 pelaku usaha meraih ketetapan halal dan sertifikat halal resmi.',
    quote: 'Berintegritas, saintifik, independen, dan berorientasi pada kepuasan pelaku usaha dalam setiap proses pemeriksaan kehalalan produk.',
    responsibilities: [
      'Pemeriksaan dokumen bahan baku dan audit fasilitas proses produksi',
      'Pengujian residu etanol dan identifikasi DNA spesifik (porcine) di laboratorium',
      'Verifikasi implementasi Sistem Jaminan Produk Halal (SJPH)'
    ]
  }
];

const TIMELINE = [
  {
    year: '2018',
    title: 'Inisiasi Pusat Kajian Halal (PKH) & Jurnal IJHR',
    desc: 'Pendirian Pusat Kajian Halal di lingkungan UIN Sunan Gunung Djati Bandung dan peluncuran Indonesian Journal of Halal Research (IJHR) sebagai sarana diseminasi ilmiah internasional.'
  },
  {
    year: '2021',
    title: 'Pendirian LP3H UIN SGD (Jalur Self-Declare)',
    desc: 'Pembentukan Lembaga Pendamping Proses Produk Halal (LP3H) untuk mendampingi ribuan pelaku Usaha Mikro dan Kecil (UMK) dalam memperoleh Sertifikat Halal secara gratis (SEHATI).'
  },
  {
    year: '2022',
    title: 'Akademi JULEHA & LPJPH Terakreditasi',
    desc: 'Peresmian Akademi Juru Sembelih Halal (JULEHA) dan Lembaga Pelatihan Jaminan Produk Halal (LPJPH) untuk melatih auditor dan penyelia halal berstandar SKKNI.'
  },
  {
    year: '2023',
    title: 'Pengembangan Laboratorium Pengujian & Kalibrasi',
    desc: 'Pengadaan instrumen mutakhir Real-Time PCR (deteksi DNA babi) dan GC-FID (analisis kadar alkohol/etanol) di Laboratorium Terpadu Halal UIN Sunan Gunung Djati.'
  },
  {
    year: '2024',
    title: 'Terbitnya Akreditasi Resmi LPH UIN SGD oleh BPJPH',
    desc: 'LPH UIN Sunan Gunung Djati resmi terakreditasi oleh Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kementerian Agama RI untuk melayani pemeriksaan halal jalur reguler.'
  },
  {
    year: '2025 - 2026',
    title: 'Pencapaian +1.000 Sertifikat Halal & Wajib Halal 2026',
    desc: 'Keberhasilan menuntaskan lebih dari 1.000 sertifikat halal pertama dan memantapkan posisi UIN Sunan Gunung Djati sebagai Halalsphere University terdepan menjelang Wajib Halal Oktober 2026.'
  }
];

const AWARDS = [
  {
    title: 'Pencapaian +1.000 Sertifikat Halal Pertama',
    organizer: 'LPH UIN Sunan Gunung Djati Bandung',
    desc: 'Bukti komitmen dan akselerasi nyata dalam melayani pemeriksaan dan pendampingan sertifikasi halal bagi para pelaku usaha di wilayah Jawa Barat dan nasional.',
    image: '/assets/images/uin_sgd/uin_15.webp'
  },
  {
    title: 'Peran Strategis Rakornas LP3H Menuju Wajib Halal 2026',
    organizer: 'BPJPH Kementerian Agama Republik Indonesia',
    desc: 'Partisipasi aktif dan kontribusi kepemimpinan LP3H UIN SGD dalam merumuskan langkah taktis percepatan kewajiban sertifikasi halal Indonesia.',
    image: '/assets/images/uin_sgd/uin_14.webp'
  },
  {
    title: 'Best Practice Adaptasi Perizinan & NIB via Web OSS',
    organizer: 'Halal Center UIN Sunan Gunung Djati Bandung',
    desc: 'Program teladan fasilitasi legalitas Nomor Induk Berusaha (NIB) dan sertifikasi halal terintegrasi bagi UMKM pasca penyesuaian regulasi pemerintah.',
    image: '/assets/images/uin_sgd/uin_16.webp'
  }
];

export const AboutPage: React.FC = () => {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [awardIndex, setAwardIndex] = useState(0);

  const prevAward = () => {
    setAwardIndex((prev) => (prev === 0 ? AWARDS.length - 1 : prev - 1));
  };

  const nextAward = () => {
    setAwardIndex((prev) => (prev === AWARDS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="about-page">
      {/* 1. HERO BANNER */}
      <section
        className="hero-banner hero-banner-style2"
        id="hero"
        style={{ backgroundImage: "url('/assets/images/tentang-kami-fix.jpeg')" }}
      >
        <div className="hero-banner-content bg-overlay-2 text-center align-items-start pt-lg-5 pt-4">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading pt-lg-4 pt-3">
              <em>Tentang Halal Center & LPH</em>
            </h1>
            <p className="text-white mt-3 mx-auto" style={{ maxWidth: '780px', fontSize: '18px', lineHeight: '1.6' }}>
              Menuju <strong>Halalsphere University</strong> — Pusat keunggulan riset, pemeriksaan, pendampingan, dan edukasi jaminan produk halal terintegrasi di UIN Sunan Gunung Djati Bandung.
            </p>
            <a className="btn btn-icon btn-style4 hero-banner-btn mt-3" href="#board">
              Lihat Pimpinan <i className="custom-icon icon-arrow-down"></i>
            </a>
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

      {/* 2. BOARD OF DIRECTORS / LEADERSHIP */}
      <section className="board-of-director" id="board">
        <div className="container">
          <div className="board-of-director-header">
            <div className="row align-items-center">
              <div className="col-md-12 mb-2 text-center">
                <h2 className="heading heading-dark heading-medium">
                  <em>Dewan Pembina & Pimpinan Halal Center</em>
                </h2>
                <p className="text-muted mt-2">
                  Pimpinan Halal Center dan Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung
                </p>
              </div>
            </div>
          </div>
          <div className="board-of-director-content mt-4">
            <div className="row justify-content-center">
              {DIRECTORS.map((director) => (
                <div key={director.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="box-director">
                    <img
                      alt={director.name}
                      className="img-fluid box-director-img entered lazyloaded"
                      src={director.image}
                      style={{ objectFit: 'cover', height: '420px', width: '100%' }}
                    />
                    <div className="box-director-flip">
                      <div className="box-director-flip-front">
                        <p className="position">{director.position}</p>
                        <h4 className="name">{director.name}</h4>
                      </div>
                      <div className="box-director-flip-back">
                        <button
                          className="btn btn-text btn-show-detail"
                          type="button"
                          onClick={() => setSelectedDirector(director)}
                        >
                          Lihat Detail <i className="custom-icon icon-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL DETAIL DIREKTUR / PIMPINAN */}
        {selectedDirector && (
          <div
            className="modal fade show"
            id="modalDirector"
            role="dialog"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1050 }}
            onClick={() => setSelectedDirector(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="modal-body p-0">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    style={{ position: 'absolute', right: '16px', top: '16px', zIndex: 10, cursor: 'pointer' }}
                    onClick={() => setSelectedDirector(null)}
                  >
                    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.4246 10.4258C20.7422 10.1084 21.2565 10.1083 21.574 10.4258C21.8915 10.7433 21.8915 11.2577 21.574 11.5753L17.1492 16.0001L21.574 20.4249C21.8915 20.7424 21.8915 21.2568 21.574 21.5743C21.2565 21.8918 20.7422 21.8917 20.4246 21.5743L15.9998 17.1495L11.575 21.5743C11.2575 21.8917 10.7431 21.8918 10.4256 21.5743C10.1081 21.2568 10.1082 20.7424 10.4256 20.4249L14.8504 16.0001L10.4256 11.5753C10.1082 11.2577 10.1081 10.7433 10.4256 10.4258C10.7431 10.1083 11.2575 10.1084 11.575 10.4258L15.9998 14.8506L20.4246 10.4258Z"
                        fill="#6B7280"
                      ></path>
                    </svg>
                  </button>
                  <div className="row no-gutters">
                    <div className="col-md-5">
                      <img
                        alt={selectedDirector.name}
                        className="img-fluid"
                        src={selectedDirector.image}
                        style={{ width: '100%', height: '100%', minHeight: '380px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-7 p-4 p-lg-5">
                      <p className="badge badge-success mb-2" style={{ backgroundColor: '#217438', color: '#fff', padding: '6px 12px' }}>
                        {selectedDirector.position}
                      </p>
                      <h3 className="heading heading-dark heading-small mb-3 font-weight-bold">
                        {selectedDirector.name}
                      </h3>
                      <p className="text-secondary" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                        {selectedDirector.bio}
                      </p>
                      {selectedDirector.quote && (
                        <blockquote className="blockquote mt-3 p-3 bg-light rounded" style={{ borderLeft: '4px solid #005a36', fontSize: '14px', fontStyle: 'italic' }}>
                          "{selectedDirector.quote}"
                        </blockquote>
                      )}
                      <h6 className="font-weight-bold mt-3 mb-2" style={{ color: '#005a36' }}>
                        Peran & Tanggung Jawab:
                      </h6>
                      <ul className="pl-3 mb-0" style={{ fontSize: '14px' }}>
                        {selectedDirector.responsibilities.map((r, idx) => (
                          <li key={idx} className="mb-1 text-muted">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. HISTORY / PERJALANAN HALAL CENTER */}
      <section className="history-lppom" id="history">
        <div className="container">
          <div className="history-lppom-header">
            <div className="row align-items-center">
              <div className="col-md-12 mb-2 text-center">
                <h2 className="heading heading-dark heading-medium">
                  Perjalanan <em>Halal Center UIN SGD</em>
                </h2>
                <p className="text-muted mt-2">
                  Tonggak sejarah perkembangan ekosistem halal UIN Sunan Gunung Djati Bandung menuju Halalsphere University
                </p>
              </div>
            </div>
          </div>
          <div className="history-lppom-content mt-4">
            <div className="row">
              <div className="col-md-12">
                <div className="timeline">
                  {TIMELINE.map((item, idx) => (
                    <div key={idx} className="timeline-item d-flex mb-4 align-items-start">
                      <div
                        className="timeline-badge bg-primary text-white font-weight-bold text-center mr-4"
                        style={{
                          minWidth: '100px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#005a36',
                          fontSize: '18px'
                        }}
                      >
                        {item.year}
                      </div>
                      <div className="timeline-content p-3 bg-white rounded shadow-sm flex-grow-1" style={{ borderLeft: '4px solid #217438' }}>
                        <h4 className="font-weight-bold mb-1" style={{ color: '#005a36', fontSize: '18px' }}>
                          {item.title}
                        </h4>
                        <p className="text-muted mb-0" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AKREDITASI & LEGALITAS */}
      <section className="accreditation-lppom linear-blur" id="accreditation">
        <div className="divider">
          <div className="divider-box box-primary-500 rounded-0"></div>
          <div className="divider-box box-primary-600"></div>
          <div className="divider-box box-primary-400"></div>
          <div className="divider-box box-secondary-300"></div>
          <div className="divider-box box-secondary-400"></div>
          <div className="divider-box box-secondary-500"></div>
          <div className="divider-box box-secondary-600 rounded-0"></div>
        </div>
        <div className="container py-5">
          <div className="accreditation-lppom-content text-center">
            <h2 className="heading heading-dark heading-medium mb-3">
              <em>Akreditasi & Kemitraan Resmi</em>
            </h2>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '750px' }}>
              Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung telah terakreditasi resmi oleh BPJPH Kementerian Agama Republik Indonesia, bekerja sama dengan Komisi Fatwa MUI, serta laboratorium terstandarisasi ISO/IEC 17025.
            </p>
            <div className="d-flex flex-wrap justify-content-center align-items-center my-4" style={{ gap: '30px' }}>
              <img alt="BPJPH Kemenag" className="img-fluid" src="/assets/images/uin_sgd/uin_19.webp" style={{ maxHeight: '70px', objectFit: 'contain' }} />
              <img alt="Halal Indonesia" className="img-fluid" src="/assets/images/uin_sgd/uin_20.webp" style={{ maxHeight: '70px', objectFit: 'contain' }} />
              <img alt="MUI Fatwa" className="img-fluid" src="/assets/images/uin_sgd/uin_21.webp" style={{ maxHeight: '70px', objectFit: 'contain' }} />
              <img alt="UIN SGD Bandung" className="img-fluid" src="/assets/images/uin_sgd/uin_22.webp" style={{ maxHeight: '70px', objectFit: 'contain' }} />
              <img alt="Partner Logo" className="img-fluid" src="/assets/images/uin_sgd/uin_23.webp" style={{ maxHeight: '70px', objectFit: 'contain' }} />
            </div>
            <h3 className="heading heading-small-medium text-center mt-4">
              Halal Center UIN SGD terus berinovasi dan berkontribusi nyata dalam menjamin kehalalan <br />
              produk bagi masyarakat Indonesia dan dunia internasional!
            </h3>
          </div>
        </div>
      </section>

      {/* 5. NILAI UTAMA: IHSAN */}
      <section className="our-value" data-wpr-lazyrender="1" id="value">
        <div className="container">
          <div className="our-value-header text-center mb-5">
            <h2 className="heading heading-dark heading-medium">
              <em>Budaya Kerja & Nilai Utama IHSAN</em>
            </h2>
            <p className="text-muted mt-2">
              Berlandaskan moto <strong>"Wahyu Memandu Ilmu"</strong>, kami menjunjung tinggi nilai IHSAN dalam seluruh rangkaian pelayanan sertifikasi halal.
            </p>
          </div>
          <div className="our-value-content">
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderTop: '4px solid #005a36' }}>
                  <h3 className="font-weight-bold" style={{ color: '#005a36' }}>INTEGRITAS</h3>
                  <p className="text-muted mt-2" style={{ lineHeight: '1.6' }}>
                    Menjunjung tinggi kejujuran syar'i dan saintifik tanpa kompromi, bebas dari gratifikasi dan benturan kepentingan dalam setiap tahapan pengujian.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderTop: '4px solid #005a36' }}>
                  <h3 className="font-weight-bold" style={{ color: '#005a36' }}>HANDAL</h3>
                  <p className="text-muted mt-2" style={{ lineHeight: '1.6' }}>
                    Didukung auditor halal berlisensi resmi, akademisi lintas disiplin (biologi, kimia, farmasi, syariah), serta laboratorium instrumen modern.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderTop: '4px solid #005a36' }}>
                  <h3 className="font-weight-bold" style={{ color: '#005a36' }}>SINERGI</h3>
                  <p className="text-muted mt-2" style={{ lineHeight: '1.6' }}>
                    Membangun kolaborasi pentahelix yang kokoh antara perguruan tinggi, BPJPH, Komisi Fatwa MUI, pelaku UMKM, asosiasi industri, dan pemerintah daerah.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderTop: '4px solid #005a36' }}>
                  <h3 className="font-weight-bold" style={{ color: '#005a36' }}>ANTUSIAS BERINOVASI</h3>
                  <p className="text-muted mt-2" style={{ lineHeight: '1.6' }}>
                    Secara berkelanjutan mengembangkan metode pengujian mutakhir, digitalisasi penelusuran (tracing) kehalalan, dan riset publikasi di jurnal bereputasi.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderTop: '4px solid #005a36' }}>
                  <h3 className="font-weight-bold" style={{ color: '#005a36' }}>NOMOR-SATUKAN PELANGGAN</h3>
                  <p className="text-muted mt-2" style={{ lineHeight: '1.6' }}>
                    Memberikan pelayanan yang transparan, bersahabat, tepat waktu, dan biaya terjangkau guna memberdayakan pelaku usaha mikro hingga industri besar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAPAIAN & PRESTASI */}
      <section className="award-lppom py-5" data-wpr-lazyrender="1" id="award" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="award-lppom-header text-center mb-4">
            <h2 className="heading heading-dark heading-medium">
              <em>Capaian & Dokumentasi Kegiatan</em>
            </h2>
            <p className="text-muted">
              Rekam jejak dedikasi Halal Center UIN Sunan Gunung Djati Bandung dalam ekosistem halal Indonesia
            </p>
          </div>
          <div className="award-lppom-content">
            <div className="card border-0 shadow rounded-lg overflow-hidden" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="row no-gutters align-items-center">
                <div className="col-md-6">
                  <img
                    alt={AWARDS[awardIndex].title}
                    className="img-fluid"
                    src={AWARDS[awardIndex].image}
                    style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6 p-4 p-lg-5">
                  <span className="badge badge-success mb-2" style={{ backgroundColor: '#217438', padding: '6px 12px' }}>
                    {AWARDS[awardIndex].organizer}
                  </span>
                  <h3 className="heading heading-dark heading-small mb-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {AWARDS[awardIndex].title}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    {AWARDS[awardIndex].desc}
                  </p>
                  <div className="d-flex align-items-center mt-4" style={{ gap: '12px' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={prevAward} type="button">
                      &larr; Sebelumnya
                    </button>
                    <span className="text-muted small">
                      {awardIndex + 1} dari {AWARDS.length}
                    </span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={nextAward} type="button">
                      Selanjutnya &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HUBUNGI KAMI */}
      <section className="contact linear-blur py-5" data-wpr-lazyrender="1" id="contactUs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="contact-detail mx-auto text-center p-4 p-md-5 rounded shadow" style={{ backgroundColor: '#005a36', color: '#fff', maxWidth: '850px' }}>
                <i className="custom-icon icon-book-verified" style={{ fontSize: '48px', color: '#ffd700' }}></i>
                <h2 className="heading heading-medium text-white mt-3">
                  <em>Konsultasikan Kebutuhan Sertifikasi Halal Anda!</em>
                </h2>
                <p className="text-white-50 mt-2 mb-4" style={{ fontSize: '16px' }}>
                  Tim Halal Center & LPH UIN Sunan Gunung Djati Bandung siap mendampingi proses sertifikasi halal produk Anda, baik jalur self-declare maupun jalur reguler.
                </p>
                <div className="d-flex flex-wrap justify-content-center" style={{ gap: '16px' }}>
                  <a
                    className="btn btn-large btn-style1"
                    href="https://wa.me/6282118201232?text=Halo%20Admin%20Halal%20Center%20UIN%20SGD,%20saya%20ingin%20konsultasi%20sertifikasi%20halal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Hubungi WhatsApp Admin</span>
                  </a>
                  <Link className="btn btn-large btn-style4" to="/kontak">
                    <span>Lihat Kontak Lengkap</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
