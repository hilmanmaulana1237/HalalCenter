import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Splide from '@splidejs/splide';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const HomePage: React.FC = () => {
  useEffect(() => {
    // 1. Hero Video Autoplay with muted guarantee
    try {
      const videoEl = document.querySelector<HTMLVideoElement>('#hero-banner-video');
      if (videoEl) {
        videoEl.muted = true;
        videoEl.defaultMuted = true;
        videoEl.setAttribute('muted', '');
        const p = videoEl.play();
        if (p !== undefined) {
          p.catch((err) => console.log('Video autoplay notice:', err));
        }
      }
    } catch (e) {
      console.warn('Video init error:', e);
    }

    // 2. Banner Carousel Splide
    try {
      const bannerEl = document.querySelector('#banner-carousel');
      if (bannerEl) {
        bannerEl.classList.remove('is-initialized');
        const bannerSplide = new Splide('#banner-carousel', {
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 5000,
          arrows: false,
          pagination: false,
          speed: 800,
          pauseOnHover: false,
        });

        bannerSplide.on('mounted move', () => {
          const totalSlides = 3;
          const currentIndex = bannerSplide.index % 3;
          const pagination = document.querySelector('.custom-pagination');
          if (pagination) {
            pagination.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
              const li = document.createElement('li');
              const btn = document.createElement('button');
              btn.className = 'custom-pagination__page' + (i === currentIndex ? ' is-active' : '');
              btn.setAttribute('aria-label', `Slide ${i + 1}`);
              btn.addEventListener('click', (ev) => {
                ev.preventDefault();
                bannerSplide.go(i);
              });
              li.appendChild(btn);
              pagination.appendChild(li);
            }
          }
        });

        const bannerPrev = document.getElementById('btn-prev');
        const bannerNext = document.getElementById('btn-next');
        if (bannerPrev) {
          bannerPrev.onclick = (ev) => {
            ev.preventDefault();
            bannerSplide.go('<');
          };
        }
        if (bannerNext) {
          bannerNext.onclick = (ev) => {
            ev.preventDefault();
            bannerSplide.go('>');
          };
        }

        bannerSplide.mount();
      }
    } catch (e) {
      console.warn('Banner Splide error:', e);
    }

    // 2. Count Up Animation
    try {
      const counters = document.querySelectorAll('.count');
      counters.forEach((counter) => {
        const targetStr = counter.getAttribute('data-target');
        const target = targetStr ? +targetStr : 100;
        const duration = 2000;
        const startTime = performance.now();
        const update = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * target);
          counter.textContent = current.toLocaleString('id-ID') + '+';
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString('id-ID') + '+';
          }
        };
        requestAnimationFrame(update);
      });
    } catch (e) {
      console.warn('Counter error:', e);
    }

    // 3. Testimonials Carousel
    try {
      const testiEl = document.querySelector('#testimonialItem');
      if (testiEl && !testiEl.classList.contains('is-initialized')) {
        const testiSplide = new Splide('#testimonialItem', {
          type: 'loop',
          perPage: 1,
          perMove: 1,
          arrows: false,
          pagination: false,
          autoHeight: true,
        }).mount();

        const customPrev = document.getElementById('custom-prev');
        const customNext = document.getElementById('custom-next');
        if (customPrev) customPrev.onclick = () => testiSplide.go('<');
        if (customNext) customNext.onclick = () => testiSplide.go('>');
      }
    } catch (e) {
      console.warn('Testimonial Splide error:', e);
    }

    // 4. Leaflet Map of Indonesia & Branches
    try {
      const mapContainer = document.getElementById('map');
      if (mapContainer && !(mapContainer as any)._leaflet_id) {
        const bounds = L.latLngBounds([-11.0, 95.0], [6.0, 141.0]);
        const map = L.map('map', {
          center: [-6.914744, 107.60981], // Bandung center
          zoom: 7,
          maxBounds: bounds,
          maxBoundsViscosity: 1.0,
          minZoom: 4,
          maxZoom: 18,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const svgMarker = `
          <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C8 0 3 6 3 13c0 8 12 26 12 26s12-18 12-26c0-7-5-13-12-13z" fill="#289ACF" stroke="#1F7DBD" stroke-width="2"/>
            <circle cx="15" cy="13" r="6" fill="#3FACDE"/>
          </svg>`;

        const customIcon = L.divIcon({
          className: 'leaflet-custom-marker',
          html: svgMarker,
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          popupAnchor: [0, -40],
        });

        const locations = [
          {
            label: 'LPH UIN Sunan Gunung Djati Bandung (Pusat)',
            address: 'Gedung Rektorat Lt. 1 / Gedung Halal Center, Kampus 1 UIN SGD, Jl. A.H. Nasution No. 105, Cibiru, Bandung, Jawa Barat 40614',
            lat: -6.9248,
            lng: 107.7176,
          },
          {
            label: 'Laboratorium & Research Center LPH UIN SGD',
            address: 'Kampus 2 UIN SGD, Gedung Riset Terpadu, Jl. Cimencrang, Gedebage, Bandung',
            lat: -6.9389,
            lng: 107.7025,
          },
          {
            label: 'Layanan Kerjasama Sertifikasi Halal DKI Jakarta & Banten',
            address: 'Kantor Penghubung Layanan Halal, Jl. Percetakan Negara, Jakarta Pusat',
            lat: -6.1855,
            lng: 106.8522,
          },
          {
            label: 'Layanan Pemeriksa Halal Wilayah Priangan Timur',
            address: 'Pusat Kemitraan Halal UIN SGD Tasikmalaya & Garut, Jawa Barat',
            lat: -7.3274,
            lng: 108.2207,
          },
          {
            label: 'Layanan Pemeriksa Halal Wilayah Cirebon & Ciayumajakuning',
            address: 'Pusat Kemitraan Halal UIN SGD Cirebon, Jawa Barat',
            lat: -6.7320,
            lng: 108.5523,
          },
        ];

        locations.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div class="location-detail" style="padding: 6px;">
              <h5 style="font-size: 14px; font-weight: 700; color: #1874A5; margin-bottom: 4px;">${loc.label}</h5>
              <p style="font-size: 12px; color: #4B5563; margin-bottom: 0;">${loc.address}</p>
            </div>
          `);
        });
      }
    } catch (e) {
      console.warn('Leaflet error:', e);
    }
  }, []);

  return (
      <main className="site-main" id="main">
<div id="floating-whatsapp">
<a aria-label="WhatsApp Button" className="whatsapp-button-container" href="https://wa.me/628111148696" rel="noopener" target="_blank">
<div className="whatsapp-button">
<svg className="icon icon-whatsapp" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"></path>
</svg>
</div>
</a>
</div>
<section className="hero-banner hero-banner-slider" id="hero">
<div aria-roledescription="carousel" className="splide banner-splide" id="banner-carousel" role="region">
<div aria-atomic="true" aria-live="polite" className="splide__track" id="banner-carousel-track">
<div className="pagination-wrapper">
<ul className="custom-pagination" id="custom-pagination"></ul>
</div>

<ul className="splide__list" id="banner-carousel-list">
<li aria-label="1 of 3" aria-roledescription="slide" className="splide__slide video-slide" id="banner-carousel-slide01" role="group">
<video autoPlay height="1080" id="hero-banner-video" loop muted playsInline poster="/assets/images/lab-lppom-poster.jpg" width="1920">
<source src="/assets/videos/lab-lppom.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
<div className="hero-banner-content bg-overlay-1 text-center">
<div className="container">
<h1 className="heading heading-large hero-banner-heading"><em>Leading in Halal Assurance Solutions</em></h1>
<p className="hero-banner-text custom-html">Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung berupaya mempertahankan posisinya sebagai lembaga pemeriksa halal terkemuka <br/> serta menjadi mitra utama industri halal nasional dan internasional.</p>
</div>
</div>
</li>

<li aria-label="2 of 3" aria-roledescription="slide" className="splide__slide b-img-slide" id="banner-carousel-slide02" role="group">
<div className="img-slide">
<img alt="Image Banner Slide" src="/assets/images/beranda_003.png" />
</div>
</li>

<li aria-label="3 of 3" aria-roledescription="slide" className="splide__slide b-img-slide" id="banner-carousel-slide03" role="group">
<div className="img-slide">
<img alt="Image Banner Slide" src="/assets/images/beranda_004.jpg" />
</div>
</li>
</ul>

<div className="container">
<div className="custom-arrow">
<button className="custom-arrow-item banner-btn-prev" id="btn-prev" type="button" aria-label="Slide Sebelumnya"><span className="d-none">Custom Prev Button</span></button>
<button className="custom-arrow-item banner-btn-next" id="btn-next" type="button" aria-label="Slide Selanjutnya"><span className="d-none">Custom Next Button</span></button>
</div>
</div>
</div>
</div>
<div className="on-desktop">
<div className="product-wrap">
<div className="container">
<div className="product-content">
<div className="product-content-heading">
<h3 className="heading heading-small"><em>Cari Produk Halal melalui Pemeriksaan LPH LPPOM</em></h3>
</div>
<div className="product-content-form">
<form action="https://halalmui.org/produk-halal/" method="GET">

<input name="post_type" type="hidden" value="produk-halal"/>

<div className="form-group">
<div className="input-group mb-0">
<div className="input-group-prepend">
<div className="input-group-text"><i className="custom-icon icon-search-dark"></i></div>
</div>
<input className="form-control" name="nama_product" placeholder="Nama Produk" type="text" value=""/>
</div>
</div>

<div className="form-group">
<input className="form-control" name="nama_produsen" placeholder="Nama Produsen" type="text" value=""/>
</div>

<div className="form-group">
<input className="form-control" name="certified_no" placeholder="No. Ketetapan Halal" type="text" value=""/>
</div>

<div className="form-group form-group-btn">
<button className="btn btn-style2" type="submit">Cari Produk Halal</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</section>
<div className="on-mobile">
<div className="hero-text-mobile show">
<div className="container">
<div className="history">
<div className="col">
<h2 className="count" data-target="36">36+</h2>
<p>Years of Experience, <br/> Still Growing and Thriving</p>
</div>
<div className="col">
<h2 className="count" data-target="70000">70.000+</h2>
<p>Companies Certified <br/> with The Highest Standards</p>
</div>
<div className="col">
<h2 className="count" data-target="65">65+</h2>
<p>Countries Trust Us, <br/> Serving Clients Worldwide.</p>
</div>
</div>
</div>
</div>
</div>
<div className="on-mobile">
<div className="product-wrap">
<div className="container">
<div className="product-content">
<div className="product-content-heading">
<h3 className="heading heading-small"><em>Cari Produk Halal</em> melalui Pemeriksaan LPH LPPOM</h3>
</div>
<div className="product-content-form">
<form action="https://halalmui.org/produk-halal/" method="GET">

<input name="post_type" type="hidden" value="produk-halal"/>

<div className="form-group">
<div className="input-group mb-0">
<div className="input-group-prepend">
<div className="input-group-text"><i className="custom-icon icon-search-dark"></i></div>
</div>
<input className="form-control" name="nama_product" placeholder="Nama Produk" type="text" value=""/>
</div>
</div>

<div className="form-group">
<input className="form-control" name="nama_produsen" placeholder="Nama Produsen" type="text" value=""/>
</div>

<div className="form-group">
<input className="form-control" name="certified_no" placeholder="No. Ketetapan Halal" type="text" value=""/>
</div>

<div className="form-group form-group-btn">
<button className="btn btn-style2" type="submit">Cari Produk Halal</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>

      {/* 2. ABOUT LPH & HALAL CENTER SECTION */}
      <section className="about-lppom" id="aboutLPPOM">
        <img alt="About Icon Top Right" className="img-fluid icon-top-right entered lazyloaded" src="/assets/images/img_008.svg" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0 text-center">
              <div className="position-relative d-inline-block">
                <img
                  alt="Dr. Tri Cahyanto, M.Si. - Kepala Halal Center UIN SGD"
                  className="img-fluid rounded shadow-lg entered lazyloaded"
                  src="/assets/images/uin_sgd/uin_13.webp"
                  style={{ maxHeight: '460px', width: 'auto', objectFit: 'cover', borderRadius: '16px' }}
                />
                <div
                  className="p-3 bg-white shadow rounded text-left"
                  style={{ position: 'absolute', bottom: '-20px', left: '20px', right: '20px', borderLeft: '4px solid #005a36' }}
                >
                  <h6 className="font-weight-bold mb-0" style={{ color: '#005a36', fontSize: '15px' }}>
                    Dr. Tri Cahyanto, M.Si.
                  </h6>
                  <small className="text-muted">Kepala Halal Center UIN Sunan Gunung Djati</small>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="wrap-text pl-lg-4">
                <div className="badge badge-green mb-2">TENTANG KAMI</div>
                <h2 className="about-lppom-heading font-weight-bold" style={{ color: '#005a36', fontSize: '28px' }}>
                  Halal Center UIN Sunan Gunung Djati Bandung
                </h2>
                <h5 className="text-secondary font-weight-bold mb-3" style={{ fontSize: '18px' }}>
                  Menuju <em>"Halalsphere University"</em>
                </h5>
                <p className="about-lppom-description" style={{ lineHeight: '1.7', fontSize: '15px', color: '#4b5563' }}>
                  Pusat Halal (Halal Center) UIN Sunan Gunung Djati Bandung melalui konsep <strong>“Halalsphere University”</strong> berkomitmen untuk menjadi lembaga yang aktif dalam pengembangan halal di Indonesia dan dunia. Kami ingin memastikan bahwa semua program kerja dan lembaga di universitas kami terintegrasi dalam pengembangan atmosfer halal di Indonesia. Dengan pendekatan holistik ini, kami berharap dapat memberikan kontribusi yang signifikan dalam memajukan industri halal dan menciptakan dampak positif dalam semua lapisan masyarakat.
                </p>

                <div className="p-3 bg-light rounded mb-4" style={{ borderLeft: '4px solid #217438' }}>
                  <h6 className="font-weight-bold mb-1" style={{ color: '#005a36', fontSize: '14px' }}>
                    Sambutan Pimpinan: Prof. Dr. H. Rosihon Anwar, M.Ag (Rektor UIN SGD Bandung)
                  </h6>
                  <p className="small text-muted mb-0" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
                    "Atas capaian yang membanggakan kampus ini, kami mengucapkan terima kasih atas segala kepercayaan masyarakat untuk dapat mengajukan sertifikasi halal baik melalui jalur self declare maupun jalur reguler di LPH UIN Sunan Gunung Djati Bandung."
                  </p>
                </div>

                <div className="btn-action d-flex flex-wrap" style={{ gap: '12px' }}>
                  <Link className="btn btn-style2 btn-style4" to="/tentang">
                    Profil Lengkap &amp; Pimpinan
                  </Link>
                  <Link className="btn btn-style1" to="/layanan/kalkulator-harga">
                    <span>Mulai Sertifikasi Halal</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img alt="About Icon Bottom Left" className="img-fluid icon-botom-left entered lazyloaded" src="/assets/images/img_010.svg" />
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section className="our-services py-5" id="services">
        <div className="container">
          <div className="our-services-header">
            <div className="row align-items-center">
              <div className="col-md-12 mb-2">
                <div className="text-center position-relative">
                  <div className="badge badge-green">LAYANAN KAMI</div>
                  <h2 className="heading heading-dark heading-medium mt-2">
                    Layanan Halal Terpadu UIN Sunan Gunung Djati Bandung
                  </h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '750px', fontSize: '16px' }}>
                    Menghadirkan ekosistem halal komprehensif mulai dari pemeriksaan reguler, pendampingan UMK gratis, pengujian laboratorium terakreditasi, hingga pelatihan SDM halal berstandar nasional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="our-services-content mt-4">
            <div className="row">
              {/* Card 1: LPH Reguler */}
              <div className="col-lg-6 mb-4">
                <div className="card card-service d-flex flex-column h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="card-img" style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      alt="Lembaga Pemeriksa Halal Reguler"
                      className="img-fluid w-100 h-100 entered lazyloaded"
                      src="/assets/images/pemeriksaaan-kehalalan-produk.jpg"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge badge-success mb-2 align-self-start" style={{ backgroundColor: '#217438' }}>
                      Jalur Reguler
                    </span>
                    <h3 className="card-title font-weight-bold" style={{ color: '#005a36', fontSize: '20px' }}>
                      Lembaga Pemeriksa Halal (LPH) Reguler
                    </h3>
                    <p className="card-description text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Pemeriksaan menyeluruh terhadap proses produksi, bahan baku, dan implementasi Sistem Jaminan Produk Halal (SJPH) bagi pelaku usaha makanan, minuman, obat, kosmetik, serta barang gunaan. Hasil audit menjadi dasar pertimbangan Komisi Fatwa MUI.
                    </p>
                    <div className="btn-action mt-3 d-flex flex-wrap" style={{ gap: '10px' }}>
                      <Link className="btn btn-style2 btn-style4 btn-sm" to="/layanan/kalkulator-harga">
                        Hitung Tarif LPH
                      </Link>
                      <Link className="btn btn-style1 btn-sm" to="/layanan/qna">
                        <span>Alur Pendaftaran</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: LP3H Self Declare */}
              <div className="col-lg-6 mb-4">
                <div className="card card-service d-flex flex-column h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="card-img" style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      alt="Lembaga Pendamping Proses Produk Halal"
                      className="img-fluid w-100 h-100 entered lazyloaded"
                      src="/assets/images/uin_sgd/uin_14.webp"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge badge-primary mb-2 align-self-start" style={{ backgroundColor: '#005a36' }}>
                      Jalur Self-Declare
                    </span>
                    <h3 className="card-title font-weight-bold" style={{ color: '#005a36', fontSize: '20px' }}>
                      Lembaga Pendamping PPH (LP3H) Self-Declare
                    </h3>
                    <p className="card-description text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Fasilitasi pendampingan Sertifikasi Halal Gratis (SEHATI) bagi Usaha Mikro dan Kecil (UMK). Ratusan Pendamping PPH UIN SGD siap membantu verifikasi bahan halal, diagram alir, dan penerbitan izin NIB via OSS.
                    </p>
                    <div className="btn-action mt-3 d-flex flex-wrap" style={{ gap: '10px' }}>
                      <Link className="btn btn-style2 btn-style4 btn-sm" to="/berita">
                        Info Rakornas LP3H
                      </Link>
                      <a
                        className="btn btn-style1 btn-sm"
                        href="https://wa.me/6282118201232?text=Halo%20Admin%20LP3H%20UIN%20SGD,%20saya%20ingin%20daftar%20pendampingan%20halal%20self%20declare"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Daftar Pendampingan</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Laboratorium Pengujian & Kalibrasi */}
              <div className="col-lg-6 mb-4">
                <div className="card card-service d-flex flex-column h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="card-img" style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      alt="Laboratorium Pengujian Halal"
                      className="img-fluid w-100 h-100 entered lazyloaded"
                      src="/assets/images/uji-laboratorium.jpg"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge badge-info mb-2 align-self-start">
                      Uji Saintifik
                    </span>
                    <h3 className="card-title font-weight-bold" style={{ color: '#005a36', fontSize: '20px' }}>
                      Laboratorium Uji Kehalalan Produk &amp; Kalibrasi
                    </h3>
                    <p className="card-description text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Layanan pengujian molekuler Real-Time PCR (deteksi DNA porcine) dan kromatografi gas GC-FID (analisis kadar etanol/alkohol). Menjamin keabsahan ilmiah dan perlindungan konsumen terhadap pemalsuan pangan.
                    </p>
                    <div className="btn-action mt-3 d-flex flex-wrap" style={{ gap: '10px' }}>
                      <Link className="btn btn-style2 btn-style4 btn-sm" to="/layanan/qna">
                        Parameter Pengujian
                      </Link>
                      <a
                        className="btn btn-style1 btn-sm"
                        href="https://wa.me/6282118201232?text=Halo%20Admin%20Lab%20Halal%20UIN%20SGD,%20saya%20ingin%20konsultasi%20pengujian%20sampel"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Konsultasi Sampel</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Pelatihan JPH & JULEHA */}
              <div className="col-lg-6 mb-4">
                <div className="card card-service d-flex flex-column h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="card-img" style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      alt="Lembaga Pelatihan Jaminan Produk Halal"
                      className="img-fluid w-100 h-100 entered lazyloaded"
                      src="/assets/images/uin_sgd/uin_15.webp"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge badge-warning mb-2 align-self-start text-dark">
                      Pelatihan &amp; Sertifikasi BNSP
                    </span>
                    <h3 className="card-title font-weight-bold" style={{ color: '#005a36', fontSize: '20px' }}>
                      Lembaga Pelatihan JPH &amp; Akademi JULEHA
                    </h3>
                    <p className="card-description text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Penyelenggara pelatihan kompetensi resmi bagi Penyelia Halal Perusahaan, Calon Auditor Halal, serta Pelatihan Juru Sembelih Halal (JULEHA) berstandar SKKNI guna mendukung kepatuhan regulasi wajib halal.
                    </p>
                    <div className="btn-action mt-3 d-flex flex-wrap" style={{ gap: '10px' }}>
                      <Link className="btn btn-style2 btn-style4 btn-sm" to="/berita">
                        Jadwal Batch Pelatihan
                      </Link>
                      <a
                        className="btn btn-style1 btn-sm"
                        href="https://wa.me/6282118201232?text=Halo%20Admin%20Pelatihan%20Halal%20UIN%20SGD,%20saya%20ingin%20daftar%20pelatihan%20Penyelia/JULEHA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Daftar Pelatihan</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DATA PRODUK & STATISTIK REKAPITULASI */}
      <section className="product py-5 bg-light" id="products">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="badge badge-green mb-2">DATABASE HALAL</div>
              <h2 className="heading heading-dark heading-medium">
                <em>Cari &amp; Telusuri Produk Halal</em>
              </h2>
              <p className="text-muted" style={{ lineHeight: '1.6' }}>
                Periksa keabsahan dan masa berlaku Sertifikat Halal produk Anda atau telusuri data produk terverifikasi melalui database resmi BPJPH dan Halal Center UIN SGD Bandung.
              </p>

              <div className="mt-4">
                <a
                  className="btn btn-large btn-style1 mr-3 mb-2"
                  href="https://ptsp.halal.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Buka Portal SIHALAL BPJPH</span>
                </a>
                <Link className="btn btn-large btn-style2 mb-2" to="/layanan/kalkulator-harga">
                  Cek Tarif Pemeriksaan
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row text-center">
                <div className="col-6 mb-4">
                  <div className="p-4 bg-white rounded shadow-sm h-100" style={{ borderTop: '4px solid #005a36' }}>
                    <h2 className="font-weight-bold mb-1" style={{ color: '#005a36', fontSize: '32px' }}>
                      +13.000
                    </h2>
                    <p className="text-muted mb-0 font-weight-bold" style={{ fontSize: '14px' }}>
                      Pelaku Usaha Terfasilitasi
                    </p>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="p-4 bg-white rounded shadow-sm h-100" style={{ borderTop: '4px solid #217438' }}>
                    <h2 className="font-weight-bold mb-1" style={{ color: '#217438', fontSize: '32px' }}>
                      +1.000
                    </h2>
                    <p className="text-muted mb-0 font-weight-bold" style={{ fontSize: '14px' }}>
                      Sertifikat Halal Terbit
                    </p>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="p-4 bg-white rounded shadow-sm h-100" style={{ borderTop: '4px solid #005a36' }}>
                    <h2 className="font-weight-bold mb-1" style={{ color: '#005a36', fontSize: '32px' }}>
                      350+
                    </h2>
                    <p className="text-muted mb-0 font-weight-bold" style={{ fontSize: '14px' }}>
                      Pendamping PPH Terlatih
                    </p>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="p-4 bg-white rounded shadow-sm h-100" style={{ borderTop: '4px solid #217438' }}>
                    <h2 className="font-weight-bold mb-1" style={{ color: '#217438', fontSize: '32px' }}>
                      Nasional
                    </h2>
                    <p className="text-muted mb-0 font-weight-bold" style={{ fontSize: '14px' }}>
                      Jangkauan Layanan Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWS & UPDATES (AUTHENTIC OLD SITE CONTENT) */}
      <section className="news-update py-5" data-wpr-lazyrender="1" id="news">
        <div className="container">
          <div className="news-update-header mb-4">
            <div className="row align-items-center">
              <div className="col-md-8 mb-2">
                <div className="badge badge-green">BERITA &amp; PUBLIKASI</div>
                <h2 className="heading heading-dark heading-medium mt-1">
                  <em>Kabar Terkini Halal Center UIN SGD</em>
                </h2>
                <p className="wysiwyg-text text-muted">
                  Informasi resmi, agenda kegiatan, capaian sertifikasi, dan publikasi ilmiah Halal Center UIN SGD Bandung
                </p>
              </div>
              <div className="col-md-4 mb-2 text-md-right">
                <Link className="btn btn-text font-weight-bold" to="/berita" style={{ color: '#005a36' }}>
                  Lihat Semua Berita <i className="custom-icon icon-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="news-update-content">
            <div className="row">
              {/* News Item 1 */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card card-news d-flex flex-column h-100 shadow-sm border-0 rounded overflow-hidden">
                  <div style={{ height: '210px', overflow: 'hidden' }}>
                    <img
                      alt="LP3H UIN Sunan Gunung Djati Bandung Perkuat Peran Strategis dalam Rakornas LP3H"
                      className="card-img-top w-100 h-100 entered lazyloaded"
                      src="/assets/images/uin_sgd/uin_14.webp"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-success" style={{ backgroundColor: '#217438' }}>
                        Berita Utama
                      </span>
                      <small className="text-muted">03 Feb 2026</small>
                    </div>
                    <h3 className="card-title font-weight-bold" style={{ fontSize: '17px', lineHeight: '1.4' }}>
                      <Link to="/berita" style={{ color: '#1f2937', textDecoration: 'none' }}>
                        LP3H UIN Sunan Gunung Djati Bandung Perkuat Peran Strategis dalam Rakornas LP3H Menuju Wajib Halal Oktober 2026
                      </Link>
                    </h3>
                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Jakarta, 2-4 Februari 2026 — Lembaga Pendamping Proses Produk Halal (LP3H) UIN SGD hadir dan berperan aktif dalam Rakornas LP3H untuk akselerasi Wajib Halal 2026...
                    </p>
                    <div className="mt-3">
                      <Link className="font-weight-bold text-success" to="/berita" style={{ fontSize: '14px' }}>
                        Baca Selengkapnya &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Item 2 */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card card-news d-flex flex-column h-100 shadow-sm border-0 rounded overflow-hidden">
                  <div style={{ height: '210px', overflow: 'hidden' }}>
                    <img
                      alt="Lembaga Pemeriksaan Halal (LPH) UIN SGD Bandung Capai +1.000 Sertifikat Halal Pertama!"
                      className="card-img-top w-100 h-100 entered lazyloaded"
                      src="/assets/images/uin_sgd/uin_15.webp"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-success" style={{ backgroundColor: '#217438' }}>
                        Capaian LPH
                      </span>
                      <small className="text-muted">23 Des 2025</small>
                    </div>
                    <h3 className="card-title font-weight-bold" style={{ fontSize: '17px', lineHeight: '1.4' }}>
                      <Link to="/berita" style={{ color: '#1f2937', textDecoration: 'none' }}>
                        Lembaga Pemeriksaan Halal (LPH) UIN SGD Bandung Capai +1.000 Sertifikat Halal Pertama!
                      </Link>
                    </h3>
                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung menegaskan komitmennya dalam pendampingan sertifikasi halal dan telah berhasil melampaui 1.000 sertifikat halal...
                    </p>
                    <div className="mt-3">
                      <Link className="font-weight-bold text-success" to="/berita" style={{ fontSize: '14px' }}>
                        Baca Selengkapnya &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Item 3 */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card card-news d-flex flex-column h-100 shadow-sm border-0 rounded overflow-hidden">
                  <div style={{ height: '210px', overflow: 'hidden' }}>
                    <img
                      alt="Sharing Best Practice Penerbitan NIB via Web OSS"
                      className="card-img-top w-100 h-100 entered lazyloaded"
                      src="/assets/images/uin_sgd/uin_16.webp"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-success" style={{ backgroundColor: '#217438' }}>
                        Edukasi UMK
                      </span>
                      <small className="text-muted">08 Des 2025</small>
                    </div>
                    <h3 className="card-title font-weight-bold" style={{ fontSize: '17px', lineHeight: '1.4' }}>
                      <Link to="/berita" style={{ color: '#1f2937', textDecoration: 'none' }}>
                        Sharing Best Practice Penerbitan NIB via Web OSS bagi Pelaku Usaha
                      </Link>
                    </h3>
                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      P3H UIN Bandung perkuat adaptasi perizinan usaha pasca penyesuaian PP 28/2025 sebagai garda terdepan legalitas izin berusaha dan sertifikasi halal UMKM Jawa Barat...
                    </p>
                    <div className="mt-3">
                      <Link className="font-weight-bold text-success" to="/berita" style={{ fontSize: '14px' }}>
                        Baca Selengkapnya &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MAP & LOCATION SECTION */}
      <section className="map-location py-5 bg-light" data-wpr-lazyrender="1" id="allLocation">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="badge badge-green mb-2">LOKASI &amp; KANTOR</div>
              <h2 className="heading heading-dark heading-medium">
                <em>Kunjungi Kantor Layanan Halal Center UIN SGD</em>
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Kami siap menyambut dan melayani konsultasi pendaftaran sertifikasi halal, audit laboratorium, serta pelatihan kompetensi halal.
              </p>

              <div className="mb-3">
                <h6 className="font-weight-bold mb-1" style={{ color: '#005a36' }}>
                  <i className="custom-icon icon-location mr-2"></i> Kampus 2 UIN Sunan Gunung Djati Bandung
                </h6>
                <p className="text-muted small mb-0 pl-4">
                  Jalan Cimencrang, Gede Bage, Kota Bandung, Jawa Barat 40294
                </p>
              </div>

              <div className="mb-3">
                <h6 className="font-weight-bold mb-1" style={{ color: '#005a36' }}>
                  <i className="custom-icon icon-location mr-2"></i> Kampus 1 UIN Sunan Gunung Djati Bandung
                </h6>
                <p className="text-muted small mb-0 pl-4">
                  Jl. A.H. Nasution No. 105, Cipadung, Cibiru, Kota Bandung 40614
                </p>
              </div>

              <div className="mb-3">
                <h6 className="font-weight-bold mb-1" style={{ color: '#005a36' }}>
                  <i className="custom-icon icon-call mr-2"></i> Telepon &amp; WhatsApp Call Center
                </h6>
                <p className="text-muted small mb-0 pl-4">
                  +62 821 1820 1232 / (022) 7800525
                </p>
              </div>

              <div className="mb-4">
                <h6 className="font-weight-bold mb-1" style={{ color: '#005a36' }}>
                  <i className="custom-icon icon-mail mr-2"></i> Email Resmi
                </h6>
                <p className="text-muted small mb-0 pl-4">
                  halal@uinsgd.ac.id
                </p>
              </div>

              <a
                className="btn btn-style1"
                href="https://maps.google.com/?q=UIN+Sunan+Gunung+Djati+Bandung"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Buka di Google Maps</span>
              </a>
            </div>

            <div className="col-lg-7">
              <div className="rounded shadow overflow-hidden" style={{ height: '380px' }}>
                <iframe
                  title="Peta Lokasi UIN Sunan Gunung Djati Bandung"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
  );
};

export default HomePage;
