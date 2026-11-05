import React, { useEffect } from 'react';
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
    <>
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
<section className="about-lppom" id="aboutLPPOM">
<img alt="About LPPOM Icon Top Right" className="img-fluid icon-top-right entered lazyloaded" src="/assets/images/img_008.svg"/> <div className="container">
<div className="row">
<div className="col-lg-5">
<img alt="Certificate" className="img-fluid entered lazyloaded" src="/assets/images/img_009.png"/> </div>
<div className="col-lg-7">
<div className="wrap-text">
<h2 className="about-lppom-heading">Tentang LPPOM</h2>
<p className="about-lppom-description">Sebagai Lembaga Pemeriksa Halal (LPH), LPPOM berkomitmen untuk
                        memperkuat tiga pilar utama dalam layanan sertifikasi halal, yakni auditor yang kompeten,
                        laboratorium terakreditasi dan sistem pelayanan yang baik. LPH LPPOM juga senantiasa menjaga
                        standar mutu dan kredibilitasnya melalui berbagai pencapaian akreditasi. Dengan standar
                        akreditasi yang tinggi, LPPOM mampu memberikan layanan yang berkualitas dan memastikan bahwa
                        setiap proses sertifikasi halal berjalan secara profesional, akuntabel dan memenuhi ekspetasi
                        semua pemangku kepentingan.</p>
<div className="btn-action">
<a className="btn btn-style2 btn-style4" href="https://halalmui.org/layanan-lppom/pengenalan-sertifikasi-halal" rel="noopener noreferrer">Ikuti Kelas</a>
<a className="btn btn-style1" href="https://halalmui.org/kontak" rel="noopener noreferrer">
<span>Mulai Sertifikasi Halal</span></a>
</div>
</div>
</div>
</div>
</div>
<img alt="About LPPOM Icon Bottom Left" className="img-fluid icon-botom-left entered lazyloaded" src="/assets/images/img_010.svg"/></section>

<section className="our-services" id="services">
<div className="container">
<div className="our-services-header">
<div className="row align-items-center">
<div className="col-md-12 mb-2">
<div className="text-center position-relative">
<div className="badge badge-green">LAYANAN KAMI</div>
<div className="service-icon">
<svg fill="none" height="78" viewBox="0 0 78 78" width="78" xmlns="http://www.w3.org/2000/svg">
<path d="M35.157 77.8365C33.1173 77.6343 31.091 77.2726 29.0975 76.7499L1.33531 49.1773C0.799263 47.188 0.42317 45.1638 0.207031 43.1263L35.157 77.8365Z" fill="#E5E7EB"></path>
<path d="M44.8431 77.5958C43.3345 77.8218 41.8148 77.9589 40.2929 78.0079L0 37.9902C0.0384838 36.4682 0.165481 34.948 0.38099 33.4379L44.8431 77.5958Z" fill="#E5E7EB"></path>
<path d="M52.7223 75.5591C51.4845 76.0216 50.2285 76.419 48.9585 76.7514L1.19727 29.3175C1.52109 28.0452 1.90992 26.786 2.36381 25.5452L52.7223 75.5591Z" fill="#E5E7EB"></path>
<path d="M59.3849 72.3147C58.3409 72.9528 57.2739 73.5378 56.1865 74.0695L3.83008 22.0707C4.35409 20.9803 4.93169 19.909 5.56297 18.861L59.3849 72.3147Z" fill="#E5E7EB"></path>
<path d="M65.0595 68.0889C64.1779 68.8782 63.2697 69.6205 62.337 70.316L7.54102 15.8944C8.23002 14.9572 8.96618 14.0436 9.74957 13.1571L65.0595 68.0889Z" fill="#E5E7EB"></path>
<path d="M69.8398 62.9748C69.1261 63.8894 68.3662 64.7794 67.5594 65.6414L12.1797 10.6402C13.0363 9.82773 13.9208 9.06155 14.8301 8.34155L69.8398 62.9748Z" fill="#E5E7EB"></path>
<path d="M73.7057 56.9533C73.1536 58.0183 72.5491 59.0629 71.892 60.0838L17.707 6.26887C18.7232 5.60513 19.7636 4.99352 20.8244 4.43417L73.7057 56.9533Z" fill="#E5E7EB"></path>
<path d="M76.5275 49.8939C76.1678 51.1345 75.7459 52.3597 75.2603 53.5667L24.2012 2.85644C25.4044 2.36315 26.6273 1.93248 27.865 1.56436L76.5275 49.8939Z" fill="#E5E7EB"></path>
<path d="M77.9947 41.4899C77.901 42.9642 77.7233 44.4343 77.463 45.8925L31.8604 0.6019C33.3164 0.331184 34.7851 0.143663 36.2587 0.0393372L77.9947 41.4899Z" fill="#E5E7EB"></path>
<path d="M77.2254 30.8642C77.6236 32.7459 77.8818 34.6515 78 36.5642L41.1836 0C43.0973 0.105026 45.0047 0.350134 46.889 0.735462L77.2254 30.8642Z" fill="#E5E7EB"></path>
<path d="M54.0811 2.94675C58.6068 4.83497 62.8505 7.61301 66.5442 11.2819C70.2387 14.9508 73.0459 19.1751 74.9652 23.688L54.0811 2.94675Z" fill="#E5E7EB"></path>
<path d="M4.52637 57.278L20.9747 73.614C17.5752 71.8403 14.3815 69.5312 11.5178 66.6876C8.65414 63.8433 6.32349 60.6653 4.52637 57.278Z" fill="#E5E7EB"></path>
</svg>
</div>
<h2 className="heading heading-dark heading-medium">LPPOM memberikan Kemudahan <br/> dalam
                            Setiap Langkah dengan Layanan Utama</h2>
</div>
</div>
</div>
</div>
<div className="our-services-content">
<div className="row">
<div className="col-lg-6 mb-4">
<div className="card card-service d-flex flex-column h-100">
<div className="card-img">
<img alt="Pemeriksaaan Kehalalan Produk" className="img-fluid entered lazyloaded" src="/assets/images/pemeriksaaan-kehalalan-produk.jpg"/> </div>
<div className="card-body">
<h3 className="card-title">Pemeriksaaan Kehalalan Produk</h3>
<p className="card-description">
                                Layanan utama LPPOM mencakup pemeriksaan menyeluruh terhadap proses produksi, bahan
                                baku, dan sistem jaminan halal yang diterapkan oleh pelaku usaha. Hasil pemeriksaan ini
                                menjadi dasar bagi penerbitan fatwa halal oleh Majelis Ulama Indonesia (MUI).
                            </p>
<div className="btn-action">
<a className="btn btn-style2 btn-style4" href="https://halalmui.org/layanan-lppom/pemeriksaan-kehalalan-produk">Lihat Detail</a>
<a className="btn btn-style1" href="https://halalmui.org/layanan-lppom/pengenalan-sertifikasi-halal"><span>Pengenalan Sertifikasi Halal</span></a>
</div>
</div>
</div>
</div>
<div className="col-lg-6 mb-4">
<div className="card card-service d-flex flex-column h-100">
<div className="card-img">
<img alt="Pemeriksaaan Kehalalan Produk" className="img-fluid entered lazyloaded" src="/assets/images/uji-laboratorium.jpg"/> </div>
<div className="card-body">
<h3 className="card-title">Uji Laboratorium</h3>
<p className="card-description">
                                Layanan pengujian Laboratorium bagi produsen untuk mematuhi regulasi dan memastikan
                                integritas produk sesuai dengan pedoman halal. Pengujian ini dilakukan dengan teknologi
                                dan metode analisis yang akurat, sehingga hasilnya dapat dipertanggungjawabkan secara
                                ilmiah dan syar'i.
                            </p>
<div className="btn-action">
<a className="btn btn-style2 btn-style4" href="https://lablppom.com/" target="_blank">Lihat Detail</a>
<a className="btn btn-style1" href="https://lablppom.com/" target="_blank"><span>Reservasi</span></a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section className="product" id="products">
<div className="container">
<div className="product-header">
<div className="row align-items-center">
<div className="col-md-12 mb-2">
<div className="text-center">
<div className="badge badge-green">JENIS PRODUK HALAL</div>
<h2 className="heading heading-dark heading-medium"><em>Jenis Produk Wajib Sertifikasi Halal</em>
<br/> (KMA 748 Tahun 2021)
                        </h2>
</div>
</div>
</div>
</div>
<div className="product-content">
<div className="wrap">
<div className="col">
<i className="custom-icon icon-food"></i>
<h6>Makanan</h6>
</div>
<div className="col">
<i className="custom-icon icon-drink"></i>
<h6>Minuman</h6>
</div>
<div className="col">
<i className="custom-icon icon-kimia"></i>
<h6>Produk Kimia</h6>
</div>
<div className="col">
<i className="custom-icon icon-biologi"></i>
<h6>Produk Biologi</h6>
</div>
<div className="col">
<i className="custom-icon icon-gmo"></i>
<h6>GMO</h6>
</div>
<div className="col">
<i className="custom-icon icon-kosmetik"></i>
<h6>Kosmetik</h6>
</div>
<div className="col">
<i className="custom-icon icon-obat"></i>
<h6>Obat</h6>
</div>
<div className="col">
<i className="custom-icon icon-barang"></i>
<h6>Barang Gunaan</h6>
</div>
<div className="col">
<i className="custom-icon icon-jasa-penyembelihan"></i>
<h6>Jasa Penyembelihan</h6>
</div>
<div className="col">
<i className="custom-icon icon-distribusi"></i>
<h6>Jasa Distribusi</h6>
</div>
<div className="col">
<i className="custom-icon icon-penyajian"></i>
<h6>Jasa Penyajian</h6>
</div>
<div className="col">
<i className="custom-icon icon-penyimpanan"></i>
<h6>Jasa Penyimpanan</h6>
</div>
<div className="col">
<i className="custom-icon icon-pengemasan"></i>
<h6>Jasa Pengemasan</h6>
</div>
<div className="col">
<i className="custom-icon icon-pengolahan"></i>
<h6>Jasa Pengolahan</h6>
</div>
<div className="col">
<i className="custom-icon icon-penjualan"></i>
<h6>Jasa Penjualan</h6>
</div>
</div>
</div>
<div className="divider">
<div className="divider-box box-primary-500 rounded-1"></div>
<div className="divider-box box-primary-600"></div>
<div className="divider-box box-primary-400"></div>
<div className="divider-box box-secondary-300"></div>
<div className="divider-box box-secondary-400"></div>
<div className="divider-box box-secondary-500"></div>
<div className="divider-box box-secondary-600 rounded-1"></div>
</div> </div>
</section>
<section className="news-update" data-wpr-lazyrender="1" id="news">
<div className="container">
<div className="news-update-header">
<div className="row align-items-center">
<div className="col-md-8 mb-2">
<div className="text-left">
<div className="badge badge-green">NEWS &amp; UPDATE</div>
<h2 className="heading heading-dark heading-medium"><em>Baca Artikel</em></h2>
<p className="wysiwyg-text">Dapatkan Informasi Terkini, Berita, dan Pembaruan Resmi dari LPPOM</p>
</div>
</div>
<div className="col-md-4 mb-2 text-md-right">
<a className="btn btn-text" href="https://halalmui.org/news-update">Lihat Semua <i className="custom-icon icon-arrow-right"></i></a>
</div>
</div>
</div>
<div className="news-update-content">
<div className="custom-tabs">
<div className="row">
<div className="col-md-12">
<select className="form-control mb-3" id="customDropdown">
<option value="artikel-dan-berita-halal">Artikel &amp; Berita Halal                                </option>
<option value="jurnal-dan-direktori-halal">Jurnal &amp; Direktori Halal                                </option>
<option value="ruang-umk">Ruang UMK                                </option>
<option value="fatwa-dan-regulasi">Fatwa &amp; Regulasi                                </option>
</select>
<ul className="nav nav-tabs mx-auto" id="customTabs" role="tablist">
<li className="nav-item">
<a className="nav-link show active" data-toggle="tab" href="#artikel-dan-berita-halal" id="tab-artikel-dan-berita-halal" role="tab">Artikel &amp; Berita Halal</a>
</li>
<li className="nav-item">
<a className="nav-link" data-toggle="tab" href="#jurnal-dan-direktori-halal" id="tab-jurnal-dan-direktori-halal" role="tab">Jurnal &amp; Direktori Halal</a>
</li>
<li className="nav-item">
<a className="nav-link" data-toggle="tab" href="#ruang-umk" id="tab-ruang-umk" role="tab">Ruang UMK</a>
</li>
<li className="nav-item">
<a className="nav-link" data-toggle="tab" href="#fatwa-dan-regulasi" id="tab-fatwa-dan-regulasi" role="tab">Fatwa &amp; Regulasi</a>
</li>
</ul>
<div className="tab-content" id="tabContent">
<div className="tab-pane fade show active" id="artikel-dan-berita-halal" role="tabpanel">
<div className="row">
<div className="col-lg-4 mb-4" data-category="berita">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/lab-lppom-best-oral-presenter-uji-dna-babi/">
<img alt="Laboratorium LPPOM MUI Raih Best Oral Presenter di Seminar Nasional XXIX PBBMI" className="card-img-top wp-post-image entered lazyloaded" data-lazy-sizes="(max-width: 300px) 100vw, 300px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?w=2560&amp;ssl=1 2560w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?resize=300%2C169&amp;ssl=1 300w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?resize=1024%2C576&amp;ssl=1 1024w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?resize=768%2C432&amp;ssl=1 768w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?resize=1536%2C864&amp;ssl=1 1536w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg?resize=2048%2C1152&amp;ssl=1 2048w" decoding="async" fetchPriority="high" height="169" sizes="(max-width: 300px) 100vw, 300px" src="/assets/images/WhatsApp-Image-2026-11-05-at-05.01.39.jpeg" title="Laboratorium LPPOM MUI Raih Best Oral Presenter di Seminar Nasional XXIX PBBMI 1" width="300"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/artikel-dan-berita-halal/berita/">Berita</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/lab-lppom-best-oral-presenter-uji-dna-babi/">Laboratorium LPPOM MUI Raih Best Oral Presenter di Seminar Nasional XXIX PBBMI</a></h3>
</div>
</div>
</div>
<div className="col-lg-4 mb-4" data-category="berita">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/halal-connect-2026-perkuat-ekosistem-bisnis-halal-jakarta/">
<img alt="Halal Connect 2026 Perkuat Sinergi Ekosistem Bisnis Halal Jakarta Menuju Pasar Global" className="card-img-top wp-post-image entered lazyloaded" data-lazy-sizes="(max-width: 300px) 100vw, 300px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?w=2560&amp;ssl=1 2560w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?resize=300%2C200&amp;ssl=1 300w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?resize=1024%2C682&amp;ssl=1 1024w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?resize=768%2C512&amp;ssl=1 768w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?resize=1536%2C1024&amp;ssl=1 1536w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg?resize=2048%2C1365&amp;ssl=1 2048w" decoding="async" height="200" sizes="(max-width: 300px) 100vw, 300px" src="/assets/images/WhatsApp-Image-2026-11-04-at-16.08.11.jpeg" title="Halal Connect 2026 Perkuat Sinergi Ekosistem Bisnis Halal Jakarta Menuju Pasar Global 2" width="300"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/artikel-dan-berita-halal/berita/">Berita</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/halal-connect-2026-perkuat-ekosistem-bisnis-halal-jakarta/">Halal Connect 2026 Perkuat Sinergi Ekosistem Bisnis Halal Jakarta Menuju Pasar Global</a></h3>
</div>
</div>
</div>
<div className="col-lg-4 mb-4" data-category="article">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/rantai-pasok-halal-supplier/">
<img alt="Rantai Pasok Halal: 7 Cara Ampuh Saat Supplier Belum Siap Halal" className="card-img-top wp-post-image entered lazyloaded" data-lazy-sizes="(max-width: 300px) 100vw, 300px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/10/436.jpg?w=1000&amp;ssl=1 1000w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/10/436.jpg?resize=300%2C200&amp;ssl=1 300w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/10/436.jpg?resize=768%2C512&amp;ssl=1 768w" decoding="async" height="200" sizes="(max-width: 300px) 100vw, 300px" src="/assets/images/img_015.jpg" title="Rantai Pasok Halal: 7 Cara Ampuh Saat Supplier Belum Siap Halal 3" width="300"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/article/">Halal Article</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/rantai-pasok-halal-supplier/">Rantai Pasok Halal: 7 Cara Ampuh Saat Supplier Belum Siap Halal</a></h3>
</div>
</div>
</div>
</div> </div>
<div className="tab-pane fade" id="jurnal-dan-direktori-halal" role="tabpanel">
<div className="row">
<div className="col col-jurnal" data-category="jurnal-halal">
<div className="card card-news d-flex flex-column h-100 custom-height">
<a href="" target="_blank">
<div className="document-img" ></div>
<img alt="Jurnal Halal No. 180/2026" className="card-img-top wp-post-image" data-lazy-sizes="(max-width: 223px) 100vw, 223px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/09/Screenshot-2026-09-11-at-15-16-41-Jurnal-Halal-180.pdf-1.png?w=585&amp;ssl=1 585w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/09/Screenshot-2026-09-11-at-15-16-41-Jurnal-Halal-180.pdf-1.png?resize=223%2C300&amp;ssl=1 223w" decoding="async" height="300" src="/assets/images/Screenshot-2026-09-11-at-15-16-41-Jurnal-Halal-180.pdf-1.png" title="Jurnal Halal No. 180/2026 4" width="223"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/jurnal-dan-direktori-halal/jurnal-halal/" target="_blank">Jurnal Halal</a></h5>
<h3 className="card-title"><a href="">Jurnal Halal No. 180/2026</a></h3>
</div>
</div>
</div>
<div className="col col-jurnal" data-category="jurnal-halal">
<div className="card card-news d-flex flex-column h-100 custom-height">
<a href="https://halalmui.org/jurnal-halal-no-179-2026/" target="_blank">
<div className="document-img" ></div>
<img alt="Jurnal Halal No. 179/2026" className="card-img-top wp-post-image" data-lazy-sizes="(max-width: 221px) 100vw, 221px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/07/Screenshot-2026-07-17-at-07-01-06-Jurnal-Halal-179.pdf.png?w=586&amp;ssl=1 586w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/07/Screenshot-2026-07-17-at-07-01-06-Jurnal-Halal-179.pdf.png?resize=221%2C300&amp;ssl=1 221w" decoding="async" height="300" src="/assets/images/Screenshot-2026-07-17-at-07-01-06-Jurnal-Halal-179.pdf.png" title="Jurnal Halal No. 179/2026 5" width="221"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/jurnal-dan-direktori-halal/jurnal-halal/" target="_blank">Jurnal Halal</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/jurnal-halal-no-179-2026/">Jurnal Halal No. 179/2026</a></h3>
</div>
</div>
</div>
<div className="col col-jurnal" data-category="jurnal-halal">
<div className="card card-news d-flex flex-column h-100 custom-height">
<a href="https://halalmui.org/jurnal-halal-no-178-2026/" target="_blank">
<div className="document-img" ></div>
<img alt="Jurnal Halal No. 178/2026" className="card-img-top wp-post-image" data-lazy-sizes="(max-width: 225px) 100vw, 225px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-178_Mei-Juni-1_page-0001-1.jpg?w=1241&amp;ssl=1 1241w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-178_Mei-Juni-1_page-0001-1.jpg?resize=225%2C300&amp;ssl=1 225w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-178_Mei-Juni-1_page-0001-1.jpg?resize=768%2C1024&amp;ssl=1 768w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-178_Mei-Juni-1_page-0001-1.jpg?resize=1152%2C1536&amp;ssl=1 1152w" decoding="async" height="300" src="/assets/images/Jurnal-Halal-178_Mei-Juni-1_page-0001-1.jpg" title="Jurnal Halal No. 178/2026 6" width="225"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/jurnal-dan-direktori-halal/jurnal-halal/" target="_blank">Jurnal Halal</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/jurnal-halal-no-178-2026/">Jurnal Halal No. 178/2026</a></h3>
</div>
</div>
</div>
<div className="col col-jurnal" data-category="jurnal-halal">
<div className="card card-news d-flex flex-column h-100 custom-height">
<a href="https://halalmui.org/jurnal-halal-no-177-2026/" target="_blank">
<div className="document-img" ></div>
<img alt="Jurnal Halal No. 177/2026" className="card-img-top wp-post-image" data-lazy-sizes="(max-width: 225px) 100vw, 225px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-177-1_page-0001-1-1.jpg?w=1241&amp;ssl=1 1241w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-177-1_page-0001-1-1.jpg?resize=225%2C300&amp;ssl=1 225w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-177-1_page-0001-1-1.jpg?resize=768%2C1024&amp;ssl=1 768w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/06/Jurnal-Halal-177-1_page-0001-1-1.jpg?resize=1152%2C1536&amp;ssl=1 1152w" decoding="async" height="300" src="/assets/images/Jurnal-Halal-177-1_page-0001-1-1.jpg" title="Jurnal Halal No. 177/2026 7" width="225"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/jurnal-dan-direktori-halal/jurnal-halal/" target="_blank">Jurnal Halal</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/jurnal-halal-no-177-2026/">Jurnal Halal No. 177/2026</a></h3>
</div>
</div>
</div>
</div> </div>
<div className="tab-pane fade" id="ruang-umk" role="tabpanel">
<div className="row">
<div className="col-lg-4 mb-4" data-category="ruang-umk">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/lppom-sertifikasi-halal-100-toko-bahan-baku/">
<img alt="Perkuat UMK dari Hulu, LPPOM Fasilitasi Sertifikasi Halal 100 Toko Bahan Baku di 19 Provinsi" className="card-img-top wp-post-image" data-lazy-sizes="(max-width: 300px) 100vw, 300px" data-lazy-srcSet="https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?w=2560&amp;ssl=1 2560w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?resize=300%2C200&amp;ssl=1 300w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?resize=1024%2C682&amp;ssl=1 1024w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?resize=768%2C512&amp;ssl=1 768w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?resize=1536%2C1024&amp;ssl=1 1536w, https://i0.wp.com/halalmui.org/wp-content/uploads/2026/05/Festival_Syawal_1447H.jpeg?resize=2048%2C1365&amp;ssl=1 2048w" decoding="async" height="200" src="/assets/images/Festival_Syawal_1447H.jpeg" title="Perkuat UMK dari Hulu, LPPOM Fasilitasi Sertifikasi Halal 100 Toko Bahan Baku di 19 Provinsi 8" width="300"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/ruang-umk/">Ruang UMK</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/lppom-sertifikasi-halal-100-toko-bahan-baku/">Perkuat UMK dari Hulu, LPPOM Fasilitasi Sertifikasi Halal 100 Toko Bahan Baku di 19 Provinsi</a></h3>
</div>
</div>
</div>
<div className="col-lg-4 mb-4" data-category="ruang-umk">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/sertifikasi-halal-umkm-panduan-lengkap-2025/">
</a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/ruang-umk/">Ruang UMK</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/sertifikasi-halal-umkm-panduan-lengkap-2025/">7 Langkah Mudah Sertifikasi Halal UMKM: Panduan Lengkap 2025</a></h3>
</div>
</div>
</div>
<div className="col-lg-4 mb-4" data-category="ruang-umk">
<div className="card card-news d-flex flex-column h-100">
<a href="https://halalmui.org/puasa-antara-ibadah-dan-ikhtiar-menjaga-kebugaran-3/">
<img alt="Puasa, antara Ibadah dan Ikhtiar Menjaga Kebugaran" className="card-img-top wp-post-image" decoding="async" height="200" src="/assets/images/img_016.webp" title="Puasa, antara Ibadah dan Ikhtiar Menjaga Kebugaran 9" width="300"/> </a>
<div className="card-body">
<h5 className="card-category mb-2"><a href="https://halalmui.org/ruang-umk/">Ruang UMK</a></h5>
<h3 className="card-title"><a href="https://halalmui.org/puasa-antara-ibadah-dan-ikhtiar-menjaga-kebugaran-3/">Puasa, antara Ibadah dan Ikhtiar Menjaga Kebugaran</a></h3>
</div>
</div>
</div>
</div> </div>
<div className="tab-pane fade" id="fatwa-dan-regulasi" role="tabpanel">
<div className="wrap">
<div className="trending">
<h4>Trending Topik</h4>
<div className="trending-list">
<ul>
<li>
<a className="track-click" data-post-id="699" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2025/07/Uni-Arab-Emirate-Cabinet-Decree-No-10-for-2014-On-UAE-Regulations-for-Control-on-Halal-Products.pdf" target="_blank">
<span>1.</span>
<span className="text">Uni Arab Emirate – Cabinet Decree No 10 for 2014 On UAE Regulations for Control on Halal Products</span>
</a>
</li>
<li>
<a className="track-click" data-post-id="687" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2025/07/Fatwa-MUI-No.19-tahun-2021-tentang-Hukum-Ekstrasi-Madu.pdf" target="_blank">
<span>2.</span>
<span className="text">Fatwa MUI No.19 Tahun 2021 tentang Hukum Ekstrasi Madu</span>
</a>
</li>
<li>
<a className="track-click" data-post-id="681" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2025/07/Fatwa-MUI-No.-4-Tahun-2021-tentang-Penggunaan-Gen-Sintetik-Manusia-serta-Rekombinan-DNA-untuk-Pembuatan-Obat-dan-Vaksin.pdf" target="_blank">
<span>3.</span>
<span className="text">Fatwa MUI No. 4 Tahun 2021 tentang Penggunaan Gen Sintetik Manusia serta Rekombinan DNA untuk Pembuatan Obat dan Vaksin</span>
</a>
</li>
</ul>
</div>
</div>
<div className="accordion" id="fatwaAccordion">
<div className="card" id="heading-34117">
<div className="card-header">
<button aria-controls="collapse-34117" aria-expanded="false" className="btn btn-link track-click" data-post-id="34117" data-regulation-index="1" data-target="#collapse-34117" data-toggle="collapse" type="button">
					Wajib Halal 2026 Diperpanjang: 6 Langkah Penting Agar Usaha Anda Tetap Aman				</button>
</div>
<div aria-labelledby="heading-34117" className="collapse show" data-parent="#fatwaAccordion" id="collapse-34117">
<div className="card-body">
</div>
</div>
</div>
<div className="card" id="heading-34020">
<div className="card-header">
<button aria-controls="collapse-34020" aria-expanded="false" className="btn btn-link track-click" data-post-id="34020" data-regulation-index="1" data-target="#collapse-34020" data-toggle="collapse" type="button">
					Pengujian Kosmetik BPOM: 5 Uji Cemaran dan Batas Terbarunya				</button>
</div>
<div aria-labelledby="heading-34020" className="collapse show" data-parent="#fatwaAccordion" id="collapse-34020">
<div className="card-body">
</div>
</div>
</div>
<div className="card" id="heading-32545">
<div className="card-header">
<button aria-controls="collapse-32545" aria-expanded="false" className="btn btn-link track-click" data-post-id="32545" data-regulation-index="1" data-target="#collapse-32545" data-toggle="collapse" type="button">
					Kewajiban Sertifikasi Halal dan Penyelenggaraan Sertifikasi Halal di Indonesia				</button>
</div>
<div aria-labelledby="heading-32545" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32545">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32545" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Undang-undang-RI-No-6-Tahun-2023-Penetapan-Perppu-No-2-Tahun-2022-menjadi-UU_compressed-1.pdf" target="_blank">Undang-undang RI No 6 Tahun 2023 – Penetapan Perppu No 2 Tahun 2022 tentang Cipta Kerja menjadi UU</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32545" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Undang-undang-RI-No-33-tahun-2014-Jaminan-Produk-Halal-1.pdf" target="_blank">Undang-undang RI No 33 tahun 2014 Jaminan Produk Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32545" data-regulation-index="3 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/10/PP-40-Tahun-2026-tentang-Perubahan-atas-PP-42-Tahun-2024-tentang-Penyelenggaraan-Bidang-Jaminan-Produk-Halal_compressed.pdf" target="_blank">PP 40 Tahun 2026 tentang Perubahan atas PP 42 Tahun 2024 tentang Penyelenggaraan Bidang Jaminan Produk Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32545" data-regulation-index="4 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan_PP_Nomor_42_Tahun_2024_tentang_Bidang_Penyelenggaraan_Jaminan_Produk_Halal_ce371e0e1e-1.pdf" target="_blank">Salinan PP Nomor 42 Tahun 2024 tentang Bidang Penyelenggaraan Jaminan Produk Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32545" data-regulation-index="5 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan_BPJPH_No_2_Tahun_2026_Tentang_Pengenaan_Sanksi_Administratif_Pelanggaran_Penyelenggara_Jaminan_Produk_Halal_50afd6e4a9.pdf" target="_blank">Peraturan BPJPH No. 2 Tahun 2026 tentang Pengenaan Sanksi Administratif Pelanggaran Penyelenggara Jaminan Produk Halal </a></div> </div>
</div>
</div>
<div className="card" id="heading-32543">
<div className="card-header">
<button aria-controls="collapse-32543" aria-expanded="false" className="btn btn-link track-click" data-post-id="32543" data-regulation-index="1" data-target="#collapse-32543" data-toggle="collapse" type="button">
					Produk dan Bahan yang Wajib Bersertifikat Halal serta yang Dikecualikan dari Kewajiban Sertifikasi Halal				</button>
</div>
<div aria-labelledby="heading-32543" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32543">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Presiden-RI-No-6-Tahun-2023-Sertifikasi-Halal-Obat-Produk-Biologi-dan-Alat-kesehatan-.pdf" target="_blank">Peraturan Presiden RI No 6 Tahun 2023 – Sertifikasi Halal Obat, Produk Biologi, dan Alat Kesehatan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/KMA_944_tahun_2024_ttg_Perubahan_atas_KMA_748_Tahun_2021_ttd_682f720fb6.pdf" target="_blank">KMA 944 tahun 2024 ttg Perubahan atas KMA 748 Tahun 2021</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="3 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Keputusan-Menteri-Agama-RI-No-1360-Bahan-yang-Dikecualikan-dari-Kewajiban-Sertifikasi-Halal_compressed.pdf" target="_blank">Keputusan Menteri Agama RI No 1360 Bahan yang Dikecualikan dari Kewajiban Sertifikasi Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="4 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-301.2026.-Produk-dan-Bahan-yang-Dikecualikan-dari-Kewajiban-Bersertifikat-Halal.pdf" target="_blank">Keputusan Kepala BPJPH Republik Indonesia Nomor 301 Tahun 2026 Tentang Produk Dan Bahan Yang Dikecualikan Dari Kewajiban Bersertifikat Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="5 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-387.2026-Jenis-Produk-yang-Wajib-Bersertifikat-Halal-1_compressed.pdf" target="_blank">Salinan - 378.2026. Perubahan atas Keputusan Kepala BPJPH Nomor 301 Tahun 2026 tentang Produk dan Bahan yang Dikecualikan dari Kewajiban Bersertifikasi Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="6 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/307_2025_Kode_Sistem_Harmonisasi_Jenis_Produk_Yang_Wajib_Bersertifikat_Halal_Pada_Makanan_Dan_Minuman_ccc8259e2a.pdf" target="_blank">Keputusan Kepala Badan No. 307 Tahun 2025 Tentang Kode Sistem Harmonisasi Jenis Produk Yang Wajib Bersertifikat Halal Pada Makanan Dan Minuman, Bahan Tambahan Pangan, Kosmetik, Dan Obat Bahan Alam</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32543" data-regulation-index="7 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Daftar_Bahan_Dikecualikan_Dari_Kewajiban_Bersertifikat_Halal_NEW_39586726cb.pdf" target="_blank">Daftar Bahan Dikecualikan Dari Kewajiban Bersertifikat Halal</a></div> </div>
</div>
</div>
<div className="card" id="heading-32541">
<div className="card-header">
<button aria-controls="collapse-32541" aria-expanded="false" className="btn btn-link track-click" data-post-id="32541" data-regulation-index="1" data-target="#collapse-32541" data-toggle="collapse" type="button">
					Label Halal				</button>
</div>
<div aria-labelledby="heading-32541" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32541">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32541" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan_BPJPH_No-3-tahun-2026-Tentang-BENTUK-DAN-TATA-CARA-PENCANTUMAN-KETERANGAN-TIDAK-HALAL.pdf" target="_blank">Peraturan BPJPH No. 3 Tahun 2026 tentang Bentuk dan Tata Cara Pencantuman Keterangan Tidak Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32541" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2025/05/Keputusan-Kepala-BPJPH-No-145-Tahun-2022-Penggunaan-Logo-dan-Label-Halal.pdf" target="_blank">Keputusan Kepala BPJPH No 145 Tahun 2022 Penggunaan Logo dan Label Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32541" data-regulation-index="3 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Keputusan-Kepala-BPJPH-No-88-Tahun-2022-Penggunaan-Label-Halal.pdf" target="_blank">Keputusan Kepala BPJPH No 88 Tahun 2022 Penggunaan Label Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32541" data-regulation-index="4 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Keputusan-Kepala-BPJPH-40-Tahun-2022-Penetapan-Label-Halal.pdf" target="_blank">Keputusan Kepala BPJPH 40 Tahun 2022 Penetapan Label Halal</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32541" data-regulation-index="5 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/BPOM-HM.01.52.522.03.22.71-Pengumuman-Tentang-Data-Dukung-Label-Halal.pdf" target="_blank">BPOM HM.01.52.522.03.22.71 – Pengumuman Tentang Data Dukung Label Halal</a></div> </div>
</div>
</div>
<div className="card" id="heading-32539">
<div className="card-header">
<button aria-controls="collapse-32539" aria-expanded="false" className="btn btn-link track-click" data-post-id="32539" data-regulation-index="1" data-target="#collapse-32539" data-toggle="collapse" type="button">
					Kewajiban Sertifikasi Halal Produk Obat dan Alat Kesehatan				</button>
</div>
<div aria-labelledby="heading-32539" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32539">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32539" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Presiden-RI-No-6-Tahun-2023-Sertifikasi-Halal-Obat-Produk-Biologi-dan-Alat-kesehatan-1-1.pdf" target="_blank">Peraturan Presiden RI No 6 Tahun 2023 – Sertifikasi Halal Obat, Produk Biologi, dan Alat Kesehatan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32539" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Menteri-Perdangangan-RI-No-72-Tahun-2019-Tentang-Ketentuan-Ekspor-Dan-Impor-Hewan-Dan-Produk-Hewan.pdf" target="_blank">Peraturan Pemerintah Republik Indonesia No. 95 Tahun 2012 tentang Kesehatan Masyarakat Veteriner dan Kesejahteraan Hewan</a></div> </div>
</div>
</div>
<div className="card" id="heading-32537">
<div className="card-header">
<button aria-controls="collapse-32537" aria-expanded="false" className="btn btn-link track-click" data-post-id="32537" data-regulation-index="1" data-target="#collapse-32537" data-toggle="collapse" type="button">
					Ketentuan Produk Hasil Sembelih				</button>
</div>
<div aria-labelledby="heading-32537" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32537">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32537" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Pemerintah-Republik-Indonesia-No.-41-Tahun-2012-tentang-Alat-dan-Mesin-Peternakan-dan-Kesehatan-Hewan.pdf" target="_blank">Peraturan Pemerintah Republik Indonesia No. 41 Tahun 2012 tentang Alat dan Mesin Peternakan dan Kesehatan Hewan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32537" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Menteri-Pertanial-Republik-Indonesia-No.-17-Tahun-2022-tentang-Pemasukan-Daging-Tanpa-Tulang-Dalam-Hal-Tertentu-yang-Berasal-dari-Negara-atau-Zona-dalam-Suatu-Negara-Asal-Pemasukan.pdf" target="_blank">Peraturan Menteri Pertanian Republik Indonesia No. 17 Tahun 2022 tentang Pemasukan Daging Tanpa Tulang Dalam Hal Tertentu yang Berasal dari Negara atau Zona dalam Suatu Negara Asal Pemasukan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32537" data-regulation-index="3 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Menteri-Kesehatan-RI-No-13-Tahun-2022-Perubahan-atas-Peraturan-Menteri-Kesehatan-Nomor-21-Tahun-2020-tentang-Rencana-Strategis-Kementerian-Kesehatan-Tahun-2020-2024.pdf" target="_blank">Peraturan Menteri Kesehatan RI No 13 Tahun 2022 – Perubahan atas Peraturan Menteri Kesehatan Nomor 21 Tahun 2020 tentang Rencana Strategis Kementerian Kesehatan Tahun 2020-2024</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32537" data-regulation-index="4 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Peraturan-Menteri-Perdangangan-RI-No-72-Tahun-2019-Tentang-Ketentuan-Ekspor-Dan-Impor-Hewan-Dan-Produk-Hewan-1.pdf" target="_blank">Peraturan Menteri Perdangangan RI No 72 Tahun 2019 – Tentang Ketentuan Ekspor Dan Impor Hewan Dan Produk Hewan</a></div> </div>
</div>
</div>
<div className="card" id="heading-32535">
<div className="card-header">
<button aria-controls="collapse-32535" aria-expanded="false" className="btn btn-link track-click" data-post-id="32535" data-regulation-index="1" data-target="#collapse-32535" data-toggle="collapse" type="button">
					Standar Jaminan Produk Halal				</button>
</div>
<div aria-labelledby="heading-32535" className="collapse show" data-parent="#fatwaAccordion" id="collapse-32535">
<div className="card-body">
<div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="1 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/49_2024_SK_Manual_SJPH_jasa_penyembelihan_ruminansia_Unggas_dan_lainnya_8321ecda20.pdf" target="_blank">Keputusan Kepala Badan No. 49 Tahun 2024 tentang SK Manual SJPH Jasa Penyembelihan Ruminansia, Unggas, dan lainnya</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="2 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/48_2024_SK_Manual_SJPH_bagi_Pelaku_Usaha_Mikro_dan_Kecil_Reguler_c617c35ce2.pdf" target="_blank">Keputusan Kepala Badan No. 48 Tahun 2024 tentang SK Manual SJPH bagi Pelaku Usaha Mikro dan Kecil Reguler</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="3 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/77_2023_SK_Pedoman_Penyelenggaraan_Sistem_Jaminan_Produk_Halal_dalam_Pemotongan_Hewan_Reuminansia_dan_Unggas_b28c409d0e.pdf" target="_blank">Keputusan Kepala Badan No. 77 Tahun 2023 tentang Pedoman Penyelenggaraan Sistem Jaminan Produk Halal dalam Pemotongan Hewan Reuminansia dan Unggas</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="4 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/78_2023_SK_Pedoman_Sertifikasi_Halal_Makanan_dan_Minuman_dengan_Pengelolahan_3aa915efdf.pdf" target="_blank">Keputusan Kepala Badan No. 78 Tahun 2023 tentang Pedoman Sertifikasi Halal Makanan dan Minuman dengan Pengelolahan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="5 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Kepkaban_No_20_Tahun_2023_Perubahan_SJPH_3_bca72daa00.pdf" target="_blank">Keputusan Kepala Badan No. 20 Tahun 2023 tentang Perubahan SJPH</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="6 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-370.2026.-Pedoman-Pelaksanaan-SJPH-Kosmetik-1.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 370 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Kosmetik</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="7 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-371.2026.-Pedoman-Pelaksanaan-SJPH-Obat-1.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 371 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Obat Bahan Alam, Obat Kuasi, Dan Suplemen Kesehatan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="8 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-372.2026.-Pedoman-Pelaksanaan-SJPH-PRG.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 372 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Produk Rekayasa Genetik</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="9 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-373.2026.-Pedoman-Pelaksanaan-SJPH-ALKES-dan-PKRT.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 373 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Alat Kesehatan Dan Perbekalan Kesehatan Rumah Tangga</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="10 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-374.2026-Pedoman-Pelaksanaan-SJPH-Barang-Gunaan.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 374 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Barang Gunaan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="11 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-375.2026.-Pedoman-Pelaksanaan-SJPH-Jasa-Penyajian-MaMin.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 375 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Jasa Penyajian Makanan Dan Minuman</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="12 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-376.2026.-Pedoman-Pelaksanaan-SJPH-Jasa-Penjualan.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 376 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Jasa Penjualan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="13 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-377.2026.-Pedoman-Pelaksanaan-SJPH-TLPH.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Republik Indonesia Nomor 377 Tahun 2026 Tentang Pedoman Pelaksanaan Sistem Jaminan Produk Halal Di Tempat Lainnya Untuk Pemotongan Hewan</a></div><div className="mb-3"><a className="regulation track-click" data-post-id="32535" data-regulation-index="14 ?&gt;" href="https://22fd5700.delivery.rocketcdn.me/wp-content/uploads/2026/05/Salinan-387.2026-Jenis-Produk-yang-Wajib-Bersertifikat-Halal-1_compressed-1.pdf" target="_blank">Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal Nomor 387 Tahun 2026 Tentang Jenis Produk Yang Wajib Bersertifikat Halal</a></div> </div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="spinner mx-auto text-center" id="spinnerTemplate" style={{ 'display': 'none' }}>
<div className="spinner-border text-primary" role="status">
<span className="sr-only">Loading...</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="instagram-feed color-bg-table-header d-none" id="instagramFeed">
<div className="circle-blue">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="circle-light-blue">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="container">
<div className="instagram-feed-header">
<div className="row align-items-center">
<div className="col-md-8 mb-2">
<div className="text-left">
<div className="badge badge-green">INSTAGRAM</div>
<h2 className="heading heading-dark heading-medium">Temukan<em>Inspirasi Halal!</em></h2>
<p className="wysiwyg-text">Dapatkan info terkini, acara terbaru, dan konten halal bermanfaat di
                            Instagram kami.</p>
</div>
</div>
<div className="col-md-4 mb-2 text-md-right">
<a className="btn btn-style1" href="#"><span>Lihat Instagram LPPOM</span></a>
</div>
</div>
</div>
<div className="instagram-feed-content">
<div className="row">
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
</div>
<div className="row">
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
<div className="col-md-4 mb-4">
<div className="card card-instagram d-flex flex-column h-100">
<a href="#" target="_blank">
<div className="card-img">
<img alt="" className="img-fluid" src="/assets/images/img_036.webp"/> </div>
<div className="card-body">
<div className="author">
<img alt="Instagram MUI Logo" className="img-fluid mui-logo" src="/assets/images/img_036.webp"/> <span>lppom_mui</span>
<img alt="Instagram MUI Verified" className="img-fluid verified" src="/assets/images/img_036.webp"/> </div>
<div className="caption">
<p>Hari ke-4 Ramadhan Hari-hari Ramadhan penuh berkah. Mudah-mudahan kita dapat
                                        terus meningkatkan amalan di bulan suci ini.</p>
</div>
</div>
</a>
</div>
</div>
</div>
</div>
</div>
</section>
<section className="map-location" data-wpr-lazyrender="1" id="allLocation">
<div className="container">
<div className="text-center">
<div className="badge badge-green">Kantor Perwakilan</div>
<h2 className="heading heading-dark heading-medium d-none">Dalam Negeri dan Luar Negeri</h2>
</div>
<div className="map-container-wrapper">
<div className="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" id="map" style={{ 'width': '100%', 'height': '400px', 'position': 'relative' }} tabIndex={0}>
<iframe allowFullScreen className="entered lazyloaded" data-lazy-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.536071967308!2d106.79404507410149!3d-6.580077664321715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4365adc01e3%3A0x908403aa14ac24e1!2sGlobal%20Halal%20Centre%20LPPOM%20MUI!5e0!3m2!1sid!2sid!4v1753249515104!5m2!1sid!2sid" data-ll-status="loaded" data-rocket-lazyload="fitvidscompatible" height="100%" loading="eager" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.536071967308!2d106.79404507410149!3d-6.580077664321715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4365adc01e3%3A0x908403aa14ac24e1!2sGlobal%20Halal%20Centre%20LPPOM%20MUI!5e0!3m2!1sid!2sid!4v1753249515104!5m2!1sid!2sid" style={{ 'border': '0' }} width="100%"></iframe>
<div className="leaflet-pane leaflet-map-pane" style={{ 'transform': 'translate3d(0px, 0px, 0px)' }}><div className="leaflet-pane leaflet-tile-pane"></div><div className="leaflet-pane leaflet-overlay-pane"></div><div className="leaflet-pane leaflet-shadow-pane"></div><div className="leaflet-pane leaflet-marker-pane"></div><div className="leaflet-pane leaflet-tooltip-pane"></div><div className="leaflet-pane leaflet-popup-pane"></div><div className="leaflet-proxy leaflet-zoom-animated"></div></div><div className="leaflet-control-container"><div className="leaflet-top leaflet-left"></div><div className="leaflet-top leaflet-right"></div><div className="leaflet-bottom leaflet-left"></div><div className="leaflet-bottom leaflet-right"><div className="leaflet-control-attribution leaflet-control"><a href="https://leafletjs.com" title="A JavaScript library for interactive maps"><svg aria-hidden="true" className="leaflet-attribution-flag" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h12v4H0z" fill="#4C7BE1"></path><path d="M0 4h12v3H0z" fill="#FFD500"></path><path d="M0 7h12v1H0z" fill="#E0BC00"></path></svg> Leaflet</a></div></div></div></div>
</div>
<div className="d-flex w-100 justify-content-center">
<a className="btn btn-text" href="https://halalmui.org/kantor-perwakilan/#office">
                Lihat Selengkapnya
                <i className="custom-icon icon-arrow-right"></i>
</a>
</div>
</div>
</section>
</main>
    </>
  );
};
