import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Splide from '@splidejs/splide';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    name: 'Prof. Dr. H. Rosihon Anwar, M.Ag.',
    position: 'Rektor UIN SGD Bandung / Dewan Pembina Halal Center',
    image: '/assets/images/uin_sgd/director_rosihon.webp',
    quote: 'UIN Sunan Gunung Djati Bandung mendedikasikan seluruh potensi akademik, riset sains halal, dan laboratorium untuk mengakselerasi ekosistem industri halal global yang kredibel dan maslahat.',
    education: [
      'Guru Besar Ilmu Al-Qur\'an dan Tafsir UIN Sunan Gunung Djati Bandung',
      'Doktor (S3) Studi Islam / Tafsir Hadis Pascasarjana UIN SGD Bandung',
      'Magister Agama (S2) Pemikiran Islam UIN SGD Bandung',
      'Sarjana Agama (S1) Fakultas Ushuluddin UIN SGD Bandung'
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

const UIN_SERVICES = [
  {
    title: 'Sertifikasi Halal Self Declare',
    url: 'https://halal.uinsgd.ac.id/sertifikasi-halal-self-declare/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
      </svg>
    )
  },
  {
    title: 'Sertifikasi Halal Reguler',
    url: 'https://lph.uinsgd.ac.id/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M128.3 160v32h32v-32zm64-96h-32v32h32zm-64 32v32h32V96zm64 32h-32v32h32zm177.6-30.1L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM256 51.9l76.1 76.1H256zM336 464H48V48h79.7v16h32V48H208v104c0 13.3 10.7 24 24 24h104zM194.2 265.7c-1.1-5.6-6-9.7-11.8-9.7h-22.1v-32h-32v32l-19.7 97.1C102 385.6 126.8 416 160 416c33.1 0 57.9-30.2 51.5-62.6zm-33.9 124.4c-17.9 0-32.4-12.1-32.4-27s14.5-27 32.4-27 32.4 12.1 32.4 27-14.5 27-32.4 27zm32-198.1h-32v32h32z" />
      </svg>
    )
  },
  {
    title: 'Konsultasi Sertifikasi',
    url: 'https://api.whatsapp.com/send?phone=6282118201232',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
      </svg>
    )
  },
  {
    title: 'Publikasi Artikel Halal',
    url: 'https://journal.uinsgd.ac.id/index.php/ijhar',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.26 7.89-7.26 13.29v367.62c0 10.23 10.68 16.65 19.54 11.5 64.7-37.58 167.76-47.58 223.1-50.53 7.82-.42 13.36-6.84 13.36-14.67V46.66c0-8.32-7.01-14.89-17.78-14.61zM33.78 32.05c54.8 3.11 163.72 14.43 230.96 55.59 4.64 2.84 7.26 7.89 7.26 13.29v367.62c0 10.23-10.68 16.65-19.54 11.5-64.7-37.58-167.76-47.58-223.1-50.53-7.82-.42-13.36-6.84-13.36-14.67V46.66c0-8.32 7.01-14.89 17.78-14.61z" />
      </svg>
    )
  },
  {
    title: 'Lembaga Pendamping PPH',
    url: 'https://halal.uinsgd.ac.id/lembaga-pendamping-proses-produk-halal-lp3h',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
      </svg>
    )
  },
  {
    title: 'Lembaga Pelatihan JPH',
    url: 'https://halal.uinsgd.ac.id/lembaga-pelatihan-jaminan-produk-halal-jph/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
      </svg>
    )
  },
  {
    title: 'Akademi Juru Sembelih Halal',
    url: 'https://halal.uinsgd.ac.id/akademi-juru-sembelih-halal-juleha/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z" />
      </svg>
    )
  },
  {
    title: 'Laboratorium Pengujian Halal',
    url: 'https://halal.uinsgd.ac.id//laboratorium-pengujian-halal/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z" />
      </svg>
    )
  }
];

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'artikel' | 'jurnal' | 'umk' | 'fatwa'>('artikel');
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);

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

    // 3. Count Up Animation
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

    // 4. Leaflet Map of Indonesia & Branches
    try {
      const mapContainer = document.getElementById('map');
      if (mapContainer && !(mapContainer as any)._leaflet_id) {
        const bounds = L.latLngBounds([-11.0, 95.0], [6.0, 141.0]);
        const map = L.map('map', {
          center: [-6.9248, 107.7176], // Bandung center
          zoom: 8,
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
            <path d="M15 0C8 0 3 6 3 13c0 8 12 26 12 26s12-18 12-26c0-7-5-13-12-13z" fill="#005a36" stroke="#003d24" stroke-width="2"/>
            <circle cx="15" cy="13" r="6" fill="#217438"/>
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
            label: 'LPH & Halal Center UIN Sunan Gunung Djati Bandung (Pusat)',
            address: 'Gedung Lecture Hall Lt. 1, Kampus 1 UIN SGD, Jl. A.H. Nasution No. 105, Cibiru, Bandung, Jawa Barat 40614',
            lat: -6.9248,
            lng: 107.7176,
          },
          {
            label: 'Laboratorium Pengujian Halal Terpadu UIN SGD',
            address: 'Gedung Riset & Laboratorium Terpadu, Kampus 2 UIN SGD, Jl. Cimencrang, Gedebage, Bandung',
            lat: -6.9389,
            lng: 107.7025,
          },
          {
            label: 'Sentra Halal UMK Priangan Timur',
            address: 'Pusat Kemitraan Halal UIN SGD Tasikmalaya & Garut, Jawa Barat',
            lat: -7.3274,
            lng: 108.2207,
          },
          {
            label: 'Sentra Halal UMK Ciayumajakuning',
            address: 'Pusat Kemitraan Halal UIN SGD Cirebon & Sekitarnya, Jawa Barat',
            lat: -6.7320,
            lng: 108.5523,
          },
        ];

        locations.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div class="location-detail" style="padding: 6px;">
              <h5 style="font-size: 14px; font-weight: 700; color: #005a36; margin-bottom: 4px;">${loc.label}</h5>
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

        {/* 1. HERO BANNER WITH VIDEO & SPLIDE SLIDER */}
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
                      <h1 className="heading heading-large hero-banner-heading">
                        <em>Leading in Halal Assurance Solutions</em>
                      </h1>
                      <p className="hero-banner-text custom-html">
                        Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung berupaya mempertahankan posisinya sebagai lembaga pemeriksa halal terkemuka <br />
                        serta menjadi mitra utama industri halal nasional dan internasional.
                      </p>
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
                  <button className="custom-arrow-item banner-btn-prev" id="btn-prev" type="button" aria-label="Slide Sebelumnya">
                    <span className="d-none">Custom Prev Button</span>
                  </button>
                  <button className="custom-arrow-item banner-btn-next" id="btn-next" type="button" aria-label="Slide Selanjutnya">
                    <span className="d-none">Custom Next Button</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="on-desktop">
            <div className="product-wrap">
              <div className="container">
                <div className="product-content">
                  <div className="product-content-heading">
                    <h3 className="heading heading-small"><em>Cari Produk Halal melalui Pemeriksaan LPH UIN SGD</em></h3>
                  </div>
                  <div className="product-content-form">
                    <form action="https://halalmui.org/produk-halal/" method="GET">
                      <input name="post_type" type="hidden" value="produk-halal" />
                      <div className="form-group">
                        <div className="input-group mb-0">
                          <div className="input-group-prepend">
                            <div className="input-group-text"><i className="custom-icon icon-search-dark"></i></div>
                          </div>
                          <input className="form-control" name="nama_product" placeholder="Nama Produk" type="text" defaultValue="" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input className="form-control" name="nama_produsen" placeholder="Nama Produsen" type="text" defaultValue="" />
                      </div>
                      <div className="form-group">
                        <input className="form-control" name="certified_no" placeholder="No. Ketetapan Halal" type="text" defaultValue="" />
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

        {/* Mobile History Stats */}
        <div className="on-mobile">
          <div className="hero-text-mobile show">
            <div className="container">
              <div className="history">
                <div className="col">
                  <h2 className="count" data-target="8">8+</h2>
                  <p>Tahun Dedikasi Riset <br />&amp; Sertifikasi Halal</p>
                </div>
                <div className="col">
                  <h2 className="count" data-target="1000">1.000+</h2>
                  <p>Sertifikat Halal Terbit <br />Bagi Pelaku Usaha</p>
                </div>
                <div className="col">
                  <h2 className="count" data-target="100">100+</h2>
                  <p>Auditor &amp; Pendamping <br />Halal Tersertifikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ABOUT HALAL CENTER SECTION (EXACT TEMPLATE MARKUP) */}
        <section className="about-lppom" id="aboutLPPOM">
          <img alt="About Icon Top Right" className="img-fluid icon-top-right entered lazyloaded" src="/assets/images/img_008.svg" />
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <img alt="Certificate Akreditasi LPH UIN SGD" className="img-fluid entered lazyloaded" src="/assets/images/certificate.png" />
              </div>
              <div className="col-lg-7">
                <div className="wrap-text">
                  <h2 className="about-lppom-heading">Tentang Halal Center UIN Sunan Gunung Djati</h2>
                  <p className="about-lppom-description">
                    Pusat Halal (Halal Center) UIN Sunan Gunung Djati Bandung melalui konsep <strong>“Halalsphere University”</strong> berkomitmen untuk menjadi lembaga terdepan dalam pengembangan ekosistem halal nasional dan global. Sebagai Lembaga Pemeriksa Halal (LPH) dan Lembaga Pendamping Proses Produk Halal (LP3H) terakreditasi BPJPH Kementerian Agama RI, kami senantiasa menjaga standar mutu pemeriksaan, pengujian laboratorium saintifik presisi, dan pendampingan prima bagi seluruh pelaku usaha.
                  </p>
                  <div className="btn-action">
                    <Link className="btn btn-style2 btn-style4" to="/tentang">Lihat Profil</Link>
                    <Link className="btn btn-style1" to="/registrasi">
                      <span>Mulai Sertifikasi Halal</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img alt="About Icon Bottom Left" className="img-fluid icon-botom-left entered lazyloaded" src="/assets/images/img_010.svg" />
        </section>

        {/* 3. OUR SERVICES SECTION (EXACT TEMPLATE MARKUP) */}
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
                    <h2 className="heading heading-dark heading-medium">
                      Halal Center UIN Sunan Gunung Djati Memberikan Kemudahan <br />
                      dalam Setiap Langkah dengan Layanan Utama
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="our-services-content">
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card card-service d-flex flex-column h-100">
                    <div className="card-img">
                      <img alt="Pemeriksaan Kehalalan Produk" className="img-fluid entered lazyloaded" src="/assets/images/pemeriksaaan-kehalalan-produk.jpg" />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">Pemeriksaan Kehalalan Produk (LPH &amp; LP3H)</h3>
                      <p className="card-description">
                        Layanan utama LPH UIN SGD mencakup pemeriksaan menyeluruh terhadap proses produksi, bahan baku, dan Sistem Jaminan Produk Halal (SJPH) baik untuk jalur reguler industri maupun pendampingan Self Declare UMK melalui LP3H.
                      </p>
                      <div className="btn-action">
                        <Link className="btn btn-style2 btn-style4" to="/layanan">Lihat Detail</Link>
                        <Link className="btn btn-style1" to="/registrasi"><span>Pengenalan Sertifikasi Halal</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card card-service d-flex flex-column h-100">
                    <div className="card-img">
                      <img alt="Uji Laboratorium & Pelatihan Halal" className="img-fluid entered lazyloaded" src="/assets/images/uji-laboratorium.jpg" />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">Uji Laboratorium &amp; Pelatihan Halal</h3>
                      <p className="card-description">
                        Layanan pengujian Laboratorium Terpadu bagi produsen untuk mematuhi regulasi halal (deteksi DNA babi qPCR, alkohol, gelatin) serta pelatihan kompetensi Juru Sembelih Halal (JULEHA) dan Penyelia Halal terakreditasi.
                      </p>
                      <div className="btn-action">
                        <Link className="btn btn-style2 btn-style4" to="/layanan">Lihat Detail</Link>
                        <Link className="btn btn-style1" to="/kontak"><span>Reservasi Lab &amp; Pelatihan</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THEME-MATCHED SERVICES SECTION (8 LAYANAN UNGGULAN UIN SGD) */}
        <section className="product" id="products">
          <div className="container">
            <div className="product-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <div className="badge badge-green">LAYANAN HALAL TERPADU</div>
                    <h2 className="heading heading-dark heading-medium">
                      <em>Layanan Unggulan &amp; Sertifikasi</em><br /> Halal Center UIN Sunan Gunung Djati
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="services-theme-grid">
              {UIN_SERVICES.map((srv, idx) => (
                <a
                  key={idx}
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-theme-card"
                >
                  <div className="card-content">
                    <div className="icon-bubble">{srv.icon}</div>
                    <span className="service-title">{srv.title}</span>
                  </div>
                  <div className="arrow-indicator">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#1874A5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <div className="divider mt-5">
              <div className="divider-box box-primary-500 rounded-1"></div>
              <div className="divider-box box-primary-600"></div>
              <div className="divider-box box-primary-400"></div>
              <div className="divider-box box-secondary-300"></div>
              <div className="divider-box box-secondary-400"></div>
              <div className="divider-box box-secondary-500"></div>
              <div className="divider-box box-secondary-600 rounded-1"></div>
            </div>
          </div>
        </section>

        {/* 5. LEADERSHIP BOARD SECTION (DR. TRI CAHYANTO & PIMPINAN) */}
        <section className="board-of-director" id="leadership" style={{ padding: '80px 0 60px' }}>
          <div className="container">
            <div className="board-of-director-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <div className="badge badge-green mb-2">Pimpinan Halal Center UIN Sunan Gunung Djati</div>
                    <h2 className="heading heading-dark heading-medium">
                      <em>Kepemimpinan Berintegritas Syar'i</em> &amp; Keunggulan Saintifik
                    </h2>
                    <p className="text-muted mt-2">Komitmen Pengabdian, Tata Kelola Profesional, dan Standar Mutu Laboratorium</p>
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

            {/* Featured Dr. Tri Cahyanto Spotlight Profile */}
            <div className="director-spotlight-card">
              <div className="director-spotlight-wrap">
                <div className="director-spotlight-photo">
                  <img
                    src="/assets/images/uin_sgd/director_tri.webp"
                    alt="Dr. Tri Cahyanto, M.Si."
                  />
                </div>
                <div className="director-spotlight-info">
                  <span className="badge-role">Kepala Halal Center UIN SGD</span>
                  <h3 className="director-title">Dr. Tri Cahyanto, M.Si.</h3>
                  <p className="director-quote">
                    "LPH dan LP3H Halal Center UIN SGD berkomitmen memberikan pelayanan prima, cepat, akuntabel, dan berbasis integritas syar'i serta pengujian laboratorium yang presisi demi melindungi hak konsumen muslim."
                  </p>
                  <div className="director-details-grid">
                    <div className="director-details-col">
                      <h5>Edukasi &amp; Jabatan</h5>
                      <ul>
                        <li>Doktor (S3) Ilmu Biologi &amp; Sains Hayati Terapan</li>
                        <li>Magister Sains (S2) Biologi Konservasi &amp; Autentikasi Produk</li>
                        <li>Pelatihan &amp; Sertifikasi Lead Auditor Halal Berlisensi BPJPH &amp; MUI</li>
                        <li>Sertifikasi Kompetensi Asesor Pengawas Jaminan Produk Halal</li>
                      </ul>
                    </div>
                    <div className="director-details-col">
                      <h5>Pengalaman &amp; Fokus</h5>
                      <ul>
                        <li>Kepala Pusat Kajian Halal (Halal Center) UIN SGD Bandung</li>
                        <li>Pimpinan Teknis Operasional LPH UIN Sunan Gunung Djati Bandung</li>
                        <li>Koordinator Nasional Lembaga Pendamping PPH (LP3H) UIN SGD</li>
                        <li>Dosen &amp; Peneliti Laboratorium Pengujian Autentikasi Kehalalan Hayati</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
              style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1050 }}
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
                      <div className="modal-body-left">
                        <img
                          alt={selectedDirector.name}
                          className="img-fluid"
                          id="director-img"
                          src={selectedDirector.image}
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

        {/* 5. NEWS & UPDATE SECTION (EXACT TEMPLATE MARKUP WITH WORKING TABS) */}
        <section className="news-update" data-wpr-lazyrender="1" id="news">
          <div className="container">
            <div className="news-update-header">
              <div className="row align-items-center">
                <div className="col-md-8 mb-2">
                  <div className="text-left">
                    <div className="badge badge-green">NEWS &amp; UPDATE</div>
                    <h2 className="heading heading-dark heading-medium"><em>Baca Artikel &amp; Informasi Halal</em></h2>
                    <p className="wysiwyg-text">Dapatkan Informasi Terkini, Riset Jurnal, dan Berita Resmi dari Halal Center UIN Sunan Gunung Djati Bandung</p>
                  </div>
                </div>
                <div className="col-md-4 mb-2 text-md-right">
                  <Link className="btn btn-text" to="/artikel">Lihat Semua <i className="custom-icon icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="news-update-content">
              <div className="custom-tabs">
                <div className="row">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs mx-auto" id="customTabs" role="tablist">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'artikel' ? 'active' : ''}`}
                          type="button"
                          onClick={() => setActiveTab('artikel')}
                        >
                          Artikel &amp; Berita Halal
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'jurnal' ? 'active' : ''}`}
                          type="button"
                          onClick={() => setActiveTab('jurnal')}
                        >
                          Jurnal &amp; Riset Halal
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'umk' ? 'active' : ''}`}
                          type="button"
                          onClick={() => setActiveTab('umk')}
                        >
                          Ruang UMK
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'fatwa' ? 'active' : ''}`}
                          type="button"
                          onClick={() => setActiveTab('fatwa')}
                        >
                          Fatwa &amp; Regulasi
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content" id="tabContent">
                      {/* Tab 1: Artikel & Berita Halal */}
                      {activeTab === 'artikel' && (
                        <div className="tab-pane fade show active" role="tabpanel">
                          <div className="row">
                            <div className="col-lg-4 mb-4" data-category="berita">
                              <div className="card card-news d-flex flex-column h-100">
                                <Link to="/artikel/1">
                                  <img
                                    alt="Pelatihan Pendamping PPH dan Rakornas LP3H"
                                    className="card-img-top wp-post-image entered lazyloaded"
                                    src="/assets/images/uin_sgd/uin_14.webp"
                                  />
                                </Link>
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Berita</a></h5>
                                  <h3 className="card-title">
                                    <Link to="/artikel/1">UIN Sunan Gunung Djati Bandung Gelar Pelatihan Pendamping PPH dan Rakornas Halal Center</Link>
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 mb-4" data-category="berita">
                              <div className="card card-news d-flex flex-column h-100">
                                <Link to="/artikel/2">
                                  <img
                                    alt="Fasilitasi Sertifikasi Halal UIN SGD"
                                    className="card-img-top wp-post-image entered lazyloaded"
                                    src="/assets/images/uin_sgd/uin_15.webp"
                                  />
                                </Link>
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Prestasi &amp; UMK</a></h5>
                                  <h3 className="card-title">
                                    <Link to="/artikel/2">Halal Center UIN SGD Fasilitasi Lebih dari 1.000 Sertifikat Halal Gratis bagi Pelaku Usaha Se-Jawa Barat</Link>
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 mb-4" data-category="article">
                              <div className="card card-news d-flex flex-column h-100">
                                <Link to="/artikel/3">
                                  <img
                                    alt="Panduan NIB OSS & Halal"
                                    className="card-img-top wp-post-image entered lazyloaded"
                                    src="/assets/images/uin_sgd/uin_16.webp"
                                  />
                                </Link>
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Panduan</a></h5>
                                  <h3 className="card-title">
                                    <Link to="/artikel/3">Panduan Lengkap Pengajuan NIB Melalui OSS dan Syarat Sertifikasi Halal Jalur Self Declare</Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 2: Jurnal & Riset Halal */}
                      {activeTab === 'jurnal' && (
                        <div className="tab-pane fade show active" role="tabpanel">
                          <div className="row">
                            <div className="col-lg-4 mb-4">
                              <div className="card card-news d-flex flex-column h-100">
                                <img
                                  alt="Indonesian Journal of Halal Research"
                                  className="card-img-top wp-post-image"
                                  src="/assets/images/Screenshot-2026-09-11-at-15-16-41-Jurnal-Halal-180.pdf-1.png"
                                />
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Jurnal Ilmiah (IJHR)</a></h5>
                                  <h3 className="card-title">
                                    <a href="https://journal.uinsgd.ac.id/index.php/ijhr" rel="noreferrer" target="_blank">
                                      Indonesian Journal of Halal Research - Vol. 6 No. 2 (SINTA Terakreditasi)
                                    </a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                              <div className="card card-news d-flex flex-column h-100">
                                <img
                                  alt="Riset Laboratorium Halal"
                                  className="card-img-top wp-post-image"
                                  src="/assets/images/Screenshot-2026-07-17-at-07-01-06-Jurnal-Halal-179.pdf.png"
                                />
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Riset Laboratorium</a></h5>
                                  <h3 className="card-title">
                                    <a href="#">Autentikasi Halal Produk Daging Olahan dengan Metode Real-Time PCR Multi-Plex</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 3: Ruang UMK */}
                      {activeTab === 'umk' && (
                        <div className="tab-pane fade show active" role="tabpanel">
                          <div className="row">
                            <div className="col-lg-4 mb-4">
                              <div className="card card-news d-flex flex-column h-100">
                                <img
                                  alt="Ruang UMK"
                                  className="card-img-top wp-post-image"
                                  src="/assets/images/uin_sgd/uin_16.webp"
                                />
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Klinik Halal UMK</a></h5>
                                  <h3 className="card-title">
                                    <a href="#">Klinik Konsultasi Gratis Pembuatan NIB dan Akun SiHalal di Kampus 1 UIN SGD Bandung</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 4: Fatwa & Regulasi */}
                      {activeTab === 'fatwa' && (
                        <div className="tab-pane fade show active" role="tabpanel">
                          <div className="row">
                            <div className="col-lg-4 mb-4">
                              <div className="card card-news d-flex flex-column h-100">
                                <img
                                  alt="Regulasi Halal KMA"
                                  className="card-img-top wp-post-image"
                                  src="/assets/images/img_015.jpg"
                                />
                                <div className="card-body">
                                  <h5 className="card-category mb-2"><a href="#">Regulasi &amp; Fatwa</a></h5>
                                  <h3 className="card-title">
                                    <a href="#">Keputusan Menteri Agama (KMA) No. 748 Tahun 2021 tentang Jenis Produk yang Wajib Bersertifikat Halal</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MAP LOCATION SECTION (EXACT TEMPLATE MARKUP) */}
        <section className="map-location" data-wpr-lazyrender="1" id="allLocation">
          <div className="container">
            <div className="text-center">
              <div className="badge badge-green">Lokasi &amp; Jaringan Layanan</div>
              <h2 className="heading heading-dark heading-medium mt-2">
                Jaringan Layanan Halal Center UIN Sunan Gunung Djati
              </h2>
            </div>
            <div className="map-container-wrapper">
              <div
                className="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
                id="map"
                style={{ width: '100%', height: '420px', position: 'relative' }}
                tabIndex={0}
              ></div>
            </div>
            <div className="d-flex w-100 justify-content-center mt-3">
              <Link className="btn btn-text" to="/kontak">
                Lihat Selengkapnya &amp; Konsultasi Lokasi <i className="custom-icon icon-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
