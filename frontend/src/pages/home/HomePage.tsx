import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Splide from '@splidejs/splide';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'artikel' | 'jurnal' | 'umk' | 'fatwa'>('artikel');

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
                <img alt="Kepala Halal Center UIN SGD" className="img-fluid entered lazyloaded" src="/assets/images/uin_sgd/uin_13.webp" style={{ borderRadius: '16px', maxHeight: '460px', width: 'auto', objectFit: 'cover' }} />
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

        {/* 4. PRODUCT SCOPES SECTION (EXACT TEMPLATE MARKUP) */}
        <section className="product" id="products">
          <div className="container">
            <div className="product-header">
              <div className="row align-items-center">
                <div className="col-md-12 mb-2">
                  <div className="text-center">
                    <div className="badge badge-green">JENIS PRODUK HALAL</div>
                    <h2 className="heading heading-dark heading-medium">
                      <em>Jenis Produk Wajib Sertifikasi Halal</em>
                      <br /> (KMA 748 Tahun 2021)
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
            </div>
          </div>
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
