import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Splide from '@splidejs/splide';

interface Director {
  id: number;
  name: string;
  position: string;
  image: string;
  quote?: string;
  education: string[];
  experience: string[];
}

const DIRECTORS: Director[] = [
  {
    id: 1,
    name: 'Prof. Dr. H. Rosihon Anwar, M.Ag',
    position: 'Rektor UIN SGD / Dewan Pembina',
    image: '/assets/images/uin_sgd/director_rosihon.webp',
    quote: 'Atas capaian yang membanggakan kampus ini, kami mengucapkan terima kasih atas segala kepercayaan masyarakat untuk dapat mengajukan sertifikasi halal baik melalui jalur self declare maupun jalur reguler di LPH UIN Sunan Gunung Djati Bandung.',
    education: [
      'Guru Besar Ilmu Tafsir UIN Sunan Gunung Djati Bandung',
      'Doktor (S3) Pengkajian Islam UIN Syarif Hidayatullah Jakarta',
      'Magister Agama (S2) UIN Sunan Gunung Djati Bandung',
      'Sarjana Agama (S1) UIN Sunan Gunung Djati Bandung'
    ],
    experience: [
      'Rektor UIN Sunan Gunung Djati Bandung (2023 - Sekarang)',
      'Inisiator & Pengarah Utama Paradigma "Halalsphere University"',
      'Dewan Pembina LPH dan LP3H Halal Center UIN Sunan Gunung Djati',
      'Wakil Rektor Bidang Akademik UIN Sunan Gunung Djati Bandung (2019 - 2023)'
    ]
  },
  {
    id: 2,
    name: 'Dr. Tri Cahyanto, M.Si.',
    position: 'Kepala Halal Center UIN SGD',
    image: '/assets/images/uin_sgd/director_tri.webp',
    quote: 'LPH dan LP3H Halal Center UIN SGD berkomitmen memberikan pelayanan prima, cepat, akuntabel, dan berbasis integritas syar\'i serta pengujian laboratorium yang presisi demi melindungi hak konsumen muslim.',
    education: [
      'Doktor (S3) Ilmu Biologi & Sains Hayati Terapan',
      'Magister Sains (S2) Biologi Konservasi & Autentikasi Produk',
      'Pelatihan & Sertifikasi Lead Auditor Halal Berlisensi BPJPH & MUI',
      'Sertifikasi Kompetensi Asesor Pengawas Jaminan Produk Halal'
    ],
    experience: [
      'Kepala Pusat Kajian Halal (Halal Center) UIN SGD Bandung',
      'Pimpinan Teknis Operasional LPH UIN Sunan Gunung Djati Bandung',
      'Koordinator Nasional Lembaga Pendamping PPH (LP3H) UIN SGD',
      'Dosen & Peneliti Laboratorium Pengujian Autentikasi Kehalalan Hayati'
    ]
  }
];

export const AboutPage: React.FC = () => {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);

  useEffect(() => {
    try {
      const awardEl = document.querySelector('#award-splide');
      if (awardEl && !awardEl.classList.contains('is-initialized')) {
        const awardSplide = new Splide('#award-splide', {
          type: 'loop',
          perPage: 1,
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 6000,
          speed: 800,
        }).mount();

        const prevBtn = document.querySelector('.award-lppom .prev-btn') as HTMLElement;
        const nextBtn = document.querySelector('.award-lppom .next-btn') as HTMLElement;
        if (prevBtn) prevBtn.onclick = () => awardSplide.go('<');
        if (nextBtn) nextBtn.onclick = () => awardSplide.go('>');
      }
    } catch (e) {
      console.warn('Award Splide error:', e);
    }
  }, []);

  return (
    <>
      <main className="site-main" id="main">
        {/* Floating WhatsApp */}
        <div id="floating-whatsapp">
          <a
            aria-label="WhatsApp Button"
            className="whatsapp-button-container"
            href="https://wa.me/6282118201232"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="whatsapp-button">
              <svg className="icon icon-whatsapp" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"></path>
              </svg>
            </div>
          </a>
        </div>

        {/* 1. HERO BANNER */}
        <section
          className="hero-banner hero-banner-style2"
          id="hero"
          style={{ backgroundImage: "url('/assets/images/hero_tentang.jpg')" }}
        >
          <div className="hero-banner-content bg-overlay-2 text-center align-items-start pt-lg-5 pt-4">
            <div className="container">
              <h1 className="heading heading-large hero-banner-heading pt-lg-4 pt-3">
                <em>Tentang Halal Center &amp; LPH</em>
              </h1>
              <p className="text-white mt-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                UIN Sunan Gunung Djati Bandung — Menuju Pelopor <em>Halalsphere University</em>
              </p>
              <a className="btn btn-icon btn-style4 hero-banner-btn mt-3" href="#board">
                Lihat Selengkapnya <i className="custom-icon icon-arrow-down"></i>
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

        {/* 2. BOARD OF LEADERSHIP */}
        <section className="board-of-director" id="board">
          <div className="container">
            <div className="board-of-director-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <h2 className="heading heading-dark heading-medium">
                      Pimpinan <em>Halal Center</em> UIN Sunan Gunung Djati
                    </h2>
                    <p className="text-muted mt-2">Komitmen Kepemimpinan Berintegritas Syar'i &amp; Keunggulan Saintifik</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="board-of-director-content">
              <div className="row justify-content-center">
                {DIRECTORS.map((director) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={director.id}>
                    <div className="box-director">
                      <img
                        alt={director.name}
                        className="img-fluid box-director-img entered lazyloaded"
                        src={director.image}
                        style={{ objectFit: 'contain', width: '100%', height: '100%', maxHeight: '420px', padding: '10px 0' }}
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

          {/* Modal Director Detail */}
          {selectedDirector && (
            <div
              aria-modal="true"
              className="modal fade show"
              id="modalDirector"
              role="dialog"
              style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ overflow: 'hidden', borderRadius: '20px' }}>
                  <div className="modal-body">
                    <button
                      aria-label="Close"
                      className="close"
                      type="button"
                      onClick={() => setSelectedDirector(null)}
                    >
                      <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.4246 10.4258C20.7422 10.1084 21.2565 10.1083 21.574 10.4258C21.8915 10.7433 21.8915 11.2577 21.574 11.5753L17.1492 16.0001L21.574 20.4249C21.8915 20.7424 21.8915 21.2568 21.574 21.5743C21.2565 21.8918 20.7422 21.8917 20.4246 21.5743L15.9998 17.1495L11.575 21.5743C11.2575 21.8917 10.7431 21.8918 10.4256 21.5743C10.1081 21.2568 10.1082 20.7424 10.4256 20.4249L14.8504 16.0001L10.4256 11.5753C10.1082 11.2577 10.1081 10.7433 10.4256 10.4258C10.7431 10.1083 11.2575 10.1084 11.575 10.4258L15.9998 14.8506L20.4246 10.4258Z"
                          fill="#6B7280"
                        ></path>
                      </svg>
                    </button>
                    <div className="modal-body-wrap">
                      <div className="modal-body-left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          alt={selectedDirector.name}
                          className="img-fluid"
                          id="director-img"
                          src={selectedDirector.image}
                          style={{ maxHeight: '520px', width: 'auto', height: 'auto', objectFit: 'contain', marginTop: 0, display: 'block' }}
                        />
                      </div>
                      <div className="modal-body-right">
                        <div className="intro">
                          <p className="position" id="director-position">{selectedDirector.position}</p>
                          <h3 className="name" id="director-name">{selectedDirector.name}</h3>
                          {selectedDirector.quote && (
                            <p className="mt-2 text-muted" style={{ fontStyle: 'italic', fontSize: '13px', lineHeight: '1.6' }}>
                              "{selectedDirector.quote}"
                            </p>
                          )}
                        </div>
                        <div className="item-list education">
                          <h5>Edukasi &amp; Jabatan</h5>
                          <ul id="director-education">
                            {selectedDirector.education.map((edu, idx) => (
                              <li key={idx}>{edu}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="item-list experience">
                          <h5>Pengalaman &amp; Fokus</h5>
                          <ul id="director-experience">
                            {selectedDirector.experience.map((exp, idx) => (
                              <li key={idx}>{exp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. HISTORY & TIMELINE */}
        <section className="history-lppom" id="history">
          <div className="container">
            <div className="history-lppom-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <h2 className="heading heading-dark heading-medium">
                      Perjalanan <em>Halal Center UIN SGD</em>
                    </h2>
                    <p className="text-muted mt-2">Tonggak Pencapaian Riset, Layanan, dan Akreditasi Halal Terpadu</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="history-lppom-content">
              <div className="row">
                <div className="col-md-12">
                  <div className="timeline">
                    {/* Item 1 (Right) */}
                    <div className="timeline-item right">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content">
                        <div className="content-right">
                          <h2 className="year">2018</h2>
                          <p>
                            Pendirian Pusat Kajian Halal (PKH) UIN Sunan Gunung Djati Bandung serta peluncuran jurnal ilmiah berkualifikasi internasional <em>Indonesian Journal of Halal Research</em> (IJHR).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 (Left) */}
                    <div className="timeline-item left">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content">
                        <div className="content-right">
                          <h2 className="year">2021</h2>
                          <p>
                            Pembentukan Lembaga Pendamping Proses Produk Halal (LP3H) UIN Sunan Gunung Djati Bandung untuk melayani sertifikasi Halal Self Declare UMK di Jawa Barat.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 (Right) */}
                    <div className="timeline-item right">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content">
                        <div className="content-right">
                          <h2 className="year">2022</h2>
                          <p>
                            Penyelenggaraan pelatihan Juru Sembelih Halal (JULEHA) dan pembentukan Lembaga Pelatihan Jaminan Produk Halal (LPJPH) berstandar BNSP.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 4 (Left) */}
                    <div className="timeline-item left">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content">
                        <div className="content-right">
                          <h2 className="year">2023</h2>
                          <p>
                            Pengembangan fasilitas Laboratorium Terpadu Pengujian Halal Terintegrasi (Real-Time PCR DNA Porcine, GC-MS Alkohol, Gelatin) di Kampus 2 Gedung Riset UIN SGD.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 5 (Right) */}
                    <div className="timeline-item right">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content">
                        <div className="content-right">
                          <h2 className="year">2024</h2>
                          <p>
                            Terbitnya SK Akreditasi Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung oleh Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kemenag RI untuk jalur Reguler.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 6 (Left) */}
                    <div className="timeline-item left">
                      <div className="dot-wrap">
                        <div className="dots"></div>
                      </div>
                      <div className="content align-items-center">
                        <div className="content-right">
                          <h2 className="year">2026</h2>
                          <p>
                            Pencapaian rekor pendampingan &gt;1.000 Sertifikat Halal Terbit se-Jawa Barat dan pengukuhan inisiatif <strong>"Halalsphere University"</strong> menuju jejaring halal global.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ACCREDITATION & PARTNERS */}
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
          <div className="container">
            <div className="accreditation-lppom-content">
              <div className="accreditation-lppom-content-img text-center">
                <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ gap: '2.5rem' }}>
                  <img alt="BPJPH Kemenag RI" className="img-fluid" src="/assets/images/uin_sgd/uin_19.webp" style={{ maxHeight: '75px', objectFit: 'contain' }} />
                  <img alt="Majelis Ulama Indonesia" className="img-fluid" src="/assets/images/uin_sgd/uin_20.webp" style={{ maxHeight: '75px', objectFit: 'contain' }} />
                  <img alt="Kementerian Agama RI" className="img-fluid" src="/assets/images/uin_sgd/uin_21.webp" style={{ maxHeight: '75px', objectFit: 'contain' }} />
                  <img alt="UIN Sunan Gunung Djati Bandung" className="img-fluid" src="/assets/images/uin_sgd/uin_22.webp" style={{ maxHeight: '75px', objectFit: 'contain' }} />
                  <img alt="Komite Akreditasi Nasional (KAN)" className="img-fluid" src="/assets/images/uin_sgd/uin_23.webp" style={{ maxHeight: '75px', objectFit: 'contain' }} />
                </div>
              </div>
              <h3 className="heading heading-small-medium text-center mt-4">
                Halal Center &amp; LPH UIN SGD Bandung bertekad menjadi mitra terpercaya <br />
                dalam menjamin kehalalan produk untuk masyarakat Indonesia dan dunia!
              </h3>
            </div>
          </div>
        </section>

        {/* 5. OUR VALUES (IHSAN) */}
        <section className="our-value" data-wpr-lazyrender="1" id="value">
          <div className="container">
            <div className="our-value-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <h2 className="heading heading-dark heading-medium">
                      <em>IHSAN di Setiap Langkah</em>
                    </h2>
                    <p className="text-muted mt-2">Nilai-Nilai Budaya Kerja Halal Center &amp; LPH UIN Sunan Gunung Djati Bandung</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="our-value-content">
              <div className="our-value-grid">
                {/* 1. Integritas */}
                <div className="grid-col">
                  <div
                    className="our-value-background rocket-lazyload entered lazyloaded"
                    style={{ backgroundImage: "url('/assets/images/value-integritas.jpg')" }}
                  >
                    <div className="our-value-item">
                      <div className="our-value-item-front">
                        <div className="our-value-item-icon">
                          <svg fill="none" height="46" viewBox="0 0 47 46" width="47" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.6014 43.4844C18.9281 43.4844 10.7615 34.114 9.84549 33.0457C9.6637 32.8337 9.57104 32.5592 9.58789 32.2806L10.3066 20.0618C10.3396 19.4919 10.812 19.0469 11.3827 19.0469H18.168C18.7632 19.0469 19.2461 19.5298 19.2461 20.125C19.2461 20.7202 18.7632 21.2031 18.168 21.2031H12.399L11.7659 31.9696C15.0424 35.7227 20.9033 41.3281 23.6014 41.3281C26.9481 41.3281 33.8647 39.1256 34.7771 36.9581C34.8621 36.7566 35.0382 36.3376 34.33 35.6125C33.9138 35.1872 33.9222 34.5042 34.3483 34.088C34.7729 33.6718 35.4566 33.6802 35.8728 34.1062C37.3594 35.628 37.0695 37.0704 36.7642 37.7947C35.2081 41.4903 26.7263 43.4844 23.6014 43.4844Z" fill="white"></path>
                            <path d="M34.1457 40.243C33.8565 40.243 33.568 40.1271 33.3554 39.8983L25.6864 31.6397C25.2814 31.2038 25.3066 30.5216 25.7432 30.1159C26.1798 29.7116 26.8613 29.7362 27.267 30.1727L34.9361 38.4313C35.3411 38.8672 35.3158 39.5495 34.8792 39.9552C34.6714 40.1475 34.4082 40.243 34.1457 40.243Z" fill="white"></path>
                            <path d="M30.7098 41.9676C30.4339 41.9676 30.1581 41.8623 29.9475 41.6517L22.8393 34.5435C22.4182 34.1224 22.4182 33.4401 22.8393 33.019C23.2604 32.5978 23.9427 32.5978 24.3638 33.019L31.472 40.1272C31.8932 40.5483 31.8932 41.2306 31.472 41.6517C31.2614 41.8623 30.9856 41.9676 30.7098 41.9676Z" fill="white"></path>
                            <path d="M26.9434 43.0604C26.6956 43.0604 26.4457 42.9754 26.2429 42.8014L20.0254 37.4753C19.5727 37.0879 19.5207 36.407 19.9075 35.955C20.2949 35.503 20.9765 35.4503 21.4278 35.8371L27.6453 41.1631C28.098 41.5506 28.15 42.2314 27.7632 42.6835C27.5498 42.9326 27.2473 43.0604 26.9434 43.0604Z" fill="white"></path>
                            <path d="M43.0078 33.7812C42.9882 33.7812 42.9678 33.7805 42.9482 33.7798L36.4794 33.4205C35.8849 33.3875 35.4294 32.8786 35.4623 32.2841C35.496 31.6903 35.986 31.2453 36.5987 31.267L41.9297 31.5632V19.1571L37.2038 19.6189C37.036 19.6372 36.8984 19.7909 36.8984 19.9741V20.125C36.8984 20.7202 36.4155 21.2031 35.8203 21.2031C35.2251 21.2031 34.7422 20.7202 34.7422 20.125V19.9741C34.7422 18.6903 35.7045 17.6157 36.9806 17.4739L42.9032 16.8955C43.2036 16.8667 43.5069 16.9657 43.7322 17.17C43.9575 17.3742 44.0859 17.6648 44.0859 17.9687V32.7031C44.0859 32.9993 43.9638 33.2829 43.749 33.4864C43.5483 33.6759 43.283 33.7812 43.0078 33.7812Z" fill="white"></path>
                            <path d="M4.19531 33.7812C3.92017 33.7812 3.65485 33.676 3.4541 33.4864C3.23932 33.2829 3.11719 32.9993 3.11719 32.7031V17.9687C3.11719 17.6648 3.24564 17.3742 3.47095 17.17C3.69696 16.9657 3.99808 16.8667 4.2999 16.8955L10.2085 17.4725C11.4986 17.6157 12.4609 18.6903 12.4609 19.9741V20.125C12.4609 20.7202 11.978 21.2031 11.3828 21.2031C10.7876 21.2031 10.3047 20.7202 10.3047 20.125V19.9741C10.3047 19.7909 10.1671 19.6372 9.98532 19.6175L5.27344 19.1571V31.5632L10.6044 31.267C11.2073 31.2446 11.7071 31.6903 11.7408 32.2841C11.7738 32.8786 11.3182 33.3875 10.7237 33.4205L4.25497 33.7798C4.23532 33.7805 4.21497 33.7812 4.19531 33.7812Z" fill="white"></path>
                            <path d="M35.1023 35.9375C34.7858 35.9375 34.4832 35.7985 34.2776 35.5536L27.0992 27.0303L24.3028 29.0743C22.6077 30.316 20.2732 30.2647 18.6251 28.9543L18.3928 28.7669C17.8481 28.331 17.5063 27.6796 17.4572 26.9812C17.4087 26.2821 17.6558 25.5893 18.1359 25.0797L21.8616 21.1252C22.2694 20.6914 22.9524 20.6711 23.3854 21.0796C23.8192 21.4881 23.8396 22.1704 23.4311 22.6034L19.7054 26.5587C19.6113 26.6583 19.6043 26.7713 19.6085 26.8303C19.6127 26.8886 19.6352 26.9995 19.7419 27.0851L19.9721 27.2704C20.8586 27.9744 22.1171 28.0018 23.0303 27.3343L26.6395 24.6958C27.0964 24.361 27.7344 24.4389 28.1001 24.8713L34.9325 32.9839L35.4449 32.0869L34.8047 21.2031H33.6648C33.0696 21.2031 32.5867 20.7202 32.5867 20.125C32.5867 19.5298 33.0696 19.0469 33.6648 19.0469H35.8211C36.3917 19.0469 36.8641 19.4919 36.8971 20.0618L37.6159 32.2806C37.6285 32.489 37.5794 32.6968 37.4762 32.8786L36.0387 35.3942C35.8639 35.7003 35.5501 35.901 35.1999 35.9333C35.1669 35.9361 35.1346 35.9375 35.1023 35.9375Z" fill="white"></path>
                            <path d="M23.602 4.67188C19.1456 4.67188 15.5195 8.29791 15.5195 12.7543C15.5195 17.2107 19.1456 20.836 23.602 20.836C28.0584 20.836 31.6844 17.2107 31.6844 12.7543C31.6844 8.29792 28.0584 4.67188 23.602 4.67188Z" fill="white"></path>
                            <path d="M22.1614 16.6491C22.1397 16.6491 22.1172 16.6484 22.0954 16.647C21.7845 16.6281 21.4967 16.4751 21.3072 16.2287L18.6322 12.7515C18.2686 12.2791 18.3571 11.6024 18.8288 11.2396C19.3018 10.8767 19.9778 10.9644 20.3407 11.4361L22.2618 13.9335L26.9477 9.18087C27.366 8.75622 28.0483 8.75201 28.4722 9.16965C28.8962 9.58798 28.9011 10.2702 28.4835 10.6942L22.9293 16.3277C22.7257 16.534 22.4492 16.6491 22.1614 16.6491Z" fill="white"></path>
                          </svg>
                        </div>
                        <h3>INTEGRITAS</h3>
                      </div>
                      <div className="our-value-item-back">
                        <div className="our-value-text">
                          Menjaga kejujuran dan transparansi syar'i dalam setiap pemeriksaan, menjadikan integritas sebagai pondasi utama kepercayaan masyarakat.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Handal */}
                <div className="grid-col">
                  <div
                    className="our-value-background rocket-lazyload entered lazyloaded"
                    style={{ backgroundImage: "url('/assets/images/value-handal.jpg')" }}
                  >
                    <div className="our-value-item">
                      <div className="our-value-item-front">
                        <div className="our-value-item-icon">
                          <svg fill="none" height="46" viewBox="0 0 47 46" width="47" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.0366 41.3281C19.8727 41.3281 19.7085 41.2905 19.5575 41.2158L8.51027 35.7388C5.18359 34.0879 3.11719 30.7571 3.11719 27.0464V7.88481C3.11719 7.39804 3.44357 6.97163 3.9135 6.84424L19.7548 2.55315C19.9317 2.50507 20.1177 2.50331 20.2959 2.54718L36.1306 6.47153C36.6114 6.59086 36.949 7.02252 36.949 7.51807V24.3153C36.949 24.9109 36.4661 25.3935 35.8708 25.3935C35.2756 25.3935 34.7927 24.9109 34.7927 24.3153V8.36176L20.0485 4.70729L5.27344 8.7099V27.0464C5.27344 29.9323 6.8808 32.5231 9.46872 33.8072L20.0366 39.0466L21.6854 38.2295C22.2188 37.9656 22.8653 38.1836 23.1302 38.717C23.3945 39.2505 23.1762 39.8973 22.6428 40.1619L20.5153 41.2161C20.3644 41.2909 20.2005 41.3281 20.0366 41.3281Z" fill="white"></path>
                            <path d="M20.0366 36.419C19.878 36.419 19.7193 36.3842 19.5719 36.3137L10.5012 31.9798C8.63521 31.0869 7.42969 29.1788 7.42969 27.1184V11.1048C7.42969 10.6145 7.76064 10.1856 8.23513 10.0617L19.7727 7.04672C19.8723 7.01584 19.9499 6.99899 20.0892 7.00005C20.191 7.0004 20.29 7.01444 20.3833 7.04111L31.8089 9.76836C32.2939 9.88417 32.6365 10.3179 32.6365 10.817V24.3729C32.6365 24.9684 32.1536 25.451 31.5584 25.451C30.9631 25.451 30.4802 24.9684 30.4802 24.3729V11.6681L21.1628 9.44407L21.1147 35.3429C21.114 35.7128 20.9238 36.0564 20.6108 36.2533C20.436 36.3631 20.2366 36.419 20.0366 36.419ZM9.58594 11.9372V27.1184C9.58594 28.3534 10.3103 29.4982 11.4312 30.0344L18.9616 33.6324L19.0065 9.47565L9.58594 11.9372Z" fill="white"></path>
                            <path d="M31.5599 22.3243H8.61328C8.01772 22.3243 7.53516 21.8418 7.53516 21.2462C7.53516 20.6507 8.01772 20.1681 8.61328 20.1681H31.5599C32.1551 20.1681 32.6381 20.6507 32.6381 21.2462C32.6381 21.8418 32.1551 22.3243 31.5599 22.3243Z" fill="white"></path>
                            <path d="M33.8474 43.4843C28.2019 43.4843 23.6094 38.8914 23.6094 33.246C23.6094 27.6006 28.2019 23.0077 33.8474 23.0077C39.4928 23.0077 44.086 27.6006 44.086 33.246C44.086 38.8914 39.4928 43.4843 33.8474 43.4843ZM33.8474 25.1639C29.391 25.1639 25.7656 28.7896 25.7656 33.246C25.7656 37.7024 29.391 41.3281 33.8474 41.3281C38.3037 41.3281 41.9298 37.7024 41.9298 33.246C41.9298 28.7896 38.3037 25.1639 33.8474 25.1639Z" fill="white"></path>
                            <path d="M33.8477 38.2772C33.2524 38.2772 32.7695 37.7947 32.7695 37.1991V29.2928C32.7695 28.6973 33.2524 28.2147 33.8477 28.2147C34.4429 28.2147 34.9258 28.6973 34.9258 29.2928V37.1991C34.9258 37.7947 34.4429 38.2772 33.8477 38.2772Z" fill="white"></path>
                            <path d="M37.8008 34.3241H29.8945C29.2993 34.3241 28.8164 33.8415 28.8164 33.246C28.8164 32.6504 29.2993 32.1678 29.8945 32.1678H37.8008C38.396 32.1678 38.8789 32.6504 38.8789 33.246C38.8789 33.8415 38.396 34.3241 37.8008 34.3241Z" fill="white"></path>
                          </svg>
                        </div>
                        <h3>HANDAL</h3>
                      </div>
                      <div className="our-value-item-back">
                        <div className="our-value-text">
                          Auditor bersertifikasi BNSP dan instrumen laboratorium mutakhir menjamin hasil uji yang presisi, sahih, dan dapat dipertanggungjawabkan.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Sinergi */}
                <div className="grid-col">
                  <div
                    className="our-value-background rocket-lazyload entered lazyloaded"
                    style={{ backgroundImage: "url('/assets/images/value-sinergi.jpg')" }}
                  >
                    <div className="our-value-item">
                      <div className="our-value-item-front">
                        <div className="our-value-item-icon">
                          <svg fill="none" height="46" viewBox="0 0 47 46" width="47" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9427 25.1094C21.7589 25.1094 25.6667 21.2016 25.6667 16.3854C25.6667 11.5692 21.7589 7.66144 16.9427 7.66144C12.1265 7.66144 8.21875 11.5692 8.21875 16.3854C8.21875 21.2016 12.1265 25.1094 16.9427 25.1094Z" fill="white"></path>
                            <path d="M30.401 20.8958C33.8412 20.8958 36.6354 18.1016 36.6354 14.6615C36.6354 11.2213 33.8412 8.42709 30.401 8.42709C26.9609 8.42709 24.1667 11.2213 24.1667 14.6615C24.1667 18.1016 26.9609 20.8958 30.401 20.8958Z" fill="white"></path>
                            <path d="M16.9427 28.2188C11.1641 28.2188 0.75 31.1146 0.75 36.875V41.3333H33.1354V36.875C33.1354 31.1146 22.7214 28.2188 16.9427 28.2188Z" fill="white"></path>
                            <path d="M30.401 23.6354C29.625 23.6354 28.7188 23.75 27.7604 23.9583C30.2708 25.7812 31.875 28.4688 31.875 31.7812V36.875H46.25V32.2917C46.25 27.7083 37.9167 23.6354 30.401 23.6354Z" fill="white"></path>
                          </svg>
                        </div>
                        <h3>SINERGI</h3>
                      </div>
                      <div className="our-value-item-back">
                        <div className="our-value-text">
                          Membangun kolaborasi pentahelix antara akademisi, regulator BPJPH, Komisi Fatwa MUI, pelaku usaha, dan komunitas konsumen halal.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Antusias Berinovasi */}
                <div className="grid-col">
                  <div
                    className="our-value-background rocket-lazyload entered lazyloaded"
                    style={{ backgroundImage: "url('/assets/images/value-aktif-berinovasi.jpg')" }}
                  >
                    <div className="our-value-item">
                      <div className="our-value-item-front">
                        <div className="our-value-item-icon">
                          <svg fill="none" height="46" viewBox="0 0 47 46" width="47" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.5 2.875C14.0729 2.875 6.4375 10.5104 6.4375 19.9375C6.4375 25.7448 9.33333 30.8802 13.8021 34.0208V39.2917C13.8021 40.8646 15.0781 42.1406 16.651 42.1406H30.349C31.9219 42.1406 33.1979 40.8646 33.1979 39.2917V34.0208C37.6667 30.8802 40.5625 25.7448 40.5625 19.9375C40.5625 10.5104 32.9271 2.875 23.5 2.875ZM29.3542 38.3125H17.6458V36.3542H29.3542V38.3125ZM29.3542 33.4167H17.6458V31.4583H29.3542V33.4167ZM23.5 27.5417C19.3073 27.5417 15.8958 24.1302 15.8958 19.9375H12.0417C12.0417 26.2656 17.1719 31.3958 23.5 31.3958V27.5417Z" fill="white"></path>
                          </svg>
                        </div>
                        <h3>AKTIF BERINOVASI</h3>
                      </div>
                      <div className="our-value-item-back">
                        <div className="our-value-text">
                          Mengembangkan riset sains halal baru, publikasi jurnal internasional bereputasi, dan otomatisasi alur layanan digital terintegrasi.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Nomor-satukan Pelanggan */}
                <div className="grid-col">
                  <div
                    className="our-value-background rocket-lazyload entered lazyloaded"
                    style={{ backgroundImage: "url('/assets/images/value-menomorsatukan-pelanggan.jpg')" }}
                  >
                    <div className="our-value-item">
                      <div className="our-value-item-front">
                        <div className="our-value-item-icon">
                          <svg fill="none" height="46" viewBox="0 0 47 46" width="47" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.5 4.79166C13.1646 4.79166 4.79166 13.1646 4.79166 23.5C4.79166 33.8354 13.1646 42.2083 23.5 42.2083C33.8354 42.2083 42.2083 33.8354 42.2083 23.5C42.2083 13.1646 33.8354 4.79166 23.5 4.79166ZM23.5 38.375C15.2771 38.375 8.625 31.7229 8.625 23.5C8.625 15.2771 15.2771 8.625 23.5 8.625C31.7229 8.625 38.375 15.2771 38.375 23.5C38.375 31.7229 31.7229 38.375 23.5 38.375ZM30.2271 17.7292L20.625 27.3312L16.7729 23.4792L14.0708 26.1812L20.625 32.7354L32.9292 20.4312L30.2271 17.7292Z" fill="white"></path>
                          </svg>
                        </div>
                        <h3>NOMOR-SATUKAN PELANGGAN</h3>
                      </div>
                      <div className="our-value-item-back">
                        <div className="our-value-text">
                          Responsif, solutif, dan mendampingi pelaku usaha UMK serta mitra industri dari pengajuan awal hingga terbitnya sertifikat halal resmi.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AWARDS & ACHIEVEMENTS */}
        <section className="award-lppom" data-wpr-lazyrender="1" id="award">
          <div className="container">
            <div className="award-lppom-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <h2 className="heading heading-dark heading-medium">
                      <em>Prestasi &amp; Rekognisi Kelembagaan</em>
                    </h2>
                    <p className="text-muted mt-2">Bukti Nyata Kualitas Standar Mutu dan Pengabdian Halal Center UIN SGD</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="award-lppom-content">
              <div aria-roledescription="carousel" className="splide" id="award-splide" role="region">
                <div className="splide__track" id="award-splide-track">
                  <div className="splide__list" id="award-splide-list">
                    {/* Slide 1 */}
                    <div className="splide__slide" role="group" style={{ width: '100%' }}>
                      <div className="award-content">
                        <div className="award-content-left">
                          <div
                            className="award-content-img"
                            style={{ backgroundImage: "url('/assets/images/award-2.jpg')" }}
                          ></div>
                        </div>
                        <div className="award-content-right">
                          <div className="heading">
                            <h3>Akreditasi Resmi LPH dari BPJPH Kementerian Agama RI</h3>
                            <span className="number">
                              <svg fill="none" height="49" viewBox="0 0 22 48" width="22" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 0V48H11.8516V9.63281H11.5703L0.578125 16.5234V7.52344L12.4609 0H22Z" fill="#1874A5" opacity="0.24"></path>
                              </svg>
                            </span>
                          </div>
                          <div className="body">
                            <p>
                              LPH UIN Sunan Gunung Djati Bandung resmi mengantongi SK Akreditasi dari Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kemenag RI sebagai Lembaga Pemeriksa Halal yang berwenang melakukan audit dan pengujian produk halal jalur reguler bagi industri pangan, minuman, kosmetik, dan barang gunaan nasional.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="splide__slide" role="group" style={{ width: '100%' }}>
                      <div className="award-content">
                        <div className="award-content-left">
                          <div
                            className="award-content-img"
                            style={{ backgroundImage: "url('/assets/images/award-1.jpg')" }}
                          ></div>
                        </div>
                        <div className="award-content-right">
                          <div className="heading">
                            <h3>Rekor Fasilitasi Pendampingan 1.000+ Sertifikat Halal UMK</h3>
                            <span className="number">
                              <svg fill="none" height="48" viewBox="0 0 33 48" width="33" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.537222 48V41.8035L16.9765 25.6879C18.5488 24.1002 19.859 22.6898 20.9072 21.4566C21.9553 20.2235 22.7415 19.0289 23.2655 17.8728C23.7896 16.7168 24.0517 15.4836 24.0517 14.1734C24.0517 12.6782 23.7126 11.3988 23.0343 10.3353C22.3561 9.25626 21.4235 8.42389 20.2366 7.83815C19.0497 7.25241 17.701 6.95954 16.1904 6.95954C14.6336 6.95954 13.2694 7.28324 12.0979 7.93064C10.9264 8.56262 10.017 9.46435 9.36959 10.6358C8.73761 11.8073 8.42161 13.2023 8.42161 14.8208H0.259766C0.259766 11.815 0.9457 9.20231 2.31757 6.98266C3.68944 4.763 5.57768 3.04432 7.98231 1.82659C10.4023 0.608864 13.1769 0 16.306 0C19.4813 0 22.2713 0.593449 24.676 1.78035C27.0806 2.96724 28.9457 4.59345 30.2713 6.65896C31.6124 8.72447 32.2829 11.0829 32.2829 13.7341C32.2829 15.5067 31.9438 17.2486 31.2655 18.9595C30.5873 20.6705 29.3927 22.5665 27.6817 24.6474C25.9862 26.7283 23.6047 29.2486 20.5372 32.2081L12.3754 40.5087V40.8324H32.9996V48H0.537222Z" fill="#1874A5" opacity="0.24"></path>
                              </svg>
                            </span>
                          </div>
                          <div className="body">
                            <p>
                              LP3H UIN Sunan Gunung Djati Bandung berhasil mendampingi lebih dari 1.000 pelaku Usaha Mikro dan Kecil (UMK) di wilayah Jawa Barat dalam memperoleh Sertifikat Halal gratis (SEHATI), menjadikannya salah satu LP3H Perguruan Tinggi Keagamaan Islam Negeri (PTKIN) teraktif dan berkinerja unggul di Indonesia.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="splide__slide" role="group" style={{ width: '100%' }}>
                      <div className="award-content">
                        <div className="award-content-left">
                          <div
                            className="award-content-img"
                            style={{ backgroundImage: "url('/assets/images/award-3.jpg')" }}
                          ></div>
                        </div>
                        <div className="award-content-right">
                          <div className="heading">
                            <h3>Pengakuan Riset Indonesian Journal of Halal Research (IJHR)</h3>
                            <span className="number">
                              <svg fill="none" height="49" viewBox="0 0 34 49" width="34" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 48.5C14.2 48.5 11.3 47.7 8.7 46.1C6.1 44.5 4.1 42.2 2.6 39.2C1.1 36.2 0.3 32.6 0.3 28.5C0.3 24.2 1 20.3 2.5 16.8C4 13.3 6.1 10.2 8.8 7.5C11.5 4.8 14.8 2.6 18.6 1C22.4 -0.6 26.7 -0.5 31.4 0.5V7C27.5 6.1 24 6.3 20.9 7.5C17.8 8.7 15.2 10.5 13 12.9C10.8 15.3 9.2 18 8.2 21C9.3 19.7 10.8 18.7 12.6 18C14.4 17.3 16.4 17 18.5 17C21.4 17 24 17.7 26.3 19.1C28.6 20.5 30.4 22.5 31.7 25C33 27.5 33.6 30.3 33.6 33.5C33.6 36.7 32.9 39.5 31.5 42C30.1 44.5 28.2 46.4 25.7 47.7C23.2 49 20.5 48.5 17.5 48.5ZM17.3 42.5C19.8 42.5 21.9 41.7 23.5 40C25.1 38.3 25.9 36.2 25.9 33.5C25.9 30.8 25.1 28.7 23.5 27.1C21.9 25.5 19.8 24.7 17.3 24.7C14.8 24.7 12.7 25.5 11.1 27.1C9.5 28.7 8.7 30.8 8.7 33.5C8.7 36.2 9.5 38.3 11.1 40C12.7 41.7 14.8 42.5 17.3 42.5Z" fill="#1874A5" opacity="0.24"></path>
                              </svg>
                            </span>
                          </div>
                          <div className="body">
                            <p>
                              Jurnal ilmiah <em>Indonesian Journal of Halal Research</em> (IJHR) yang diterbitkan Halal Center UIN SGD Bandung terakreditasi nasional dan menjadi referensi saintifik internasional bagi publikasi riset deteksi DNA babi, kehalalan gelatin, profil etanol, hingga fikih halal kontemporer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Arrows */}
                <div className="custom-arrow">
                  <button className="custom-arrow-item prev-btn" type="button">
                    <span className="d-none">Previous</span>
                  </button>
                  <button className="custom-arrow-item next-btn" type="button">
                    <span className="d-none">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT US */}
        <section className="contact linear-blur" data-wpr-lazyrender="1" id="contactUs">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="contact-detail mx-auto text-center">
                  <i className="custom-icon icon-book-verified"></i>
                  <h2 className="heading heading-medium">
                    <em>Hubungi Kami untuk Informasi &amp; Layanan Halal!</em>
                  </h2>
                  <p className="text-white">
                    Gedung Lecture Hall Lt. 1 / Lab Terpadu Kampus 2 UIN Sunan Gunung Djati Bandung, Jl. Cimencrang, Gedebage, Kota Bandung. Tim Halal Center siap membantu setiap langkah sertifikasi halal Anda.
                  </p>
                  <Link className="btn btn-large btn-style1" to="/kontak">
                    <span>Hubungi Kami</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
