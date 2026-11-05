import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { CalculationResult } from '../../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const PriceCalculatorPage: React.FC = () => {
  const [serviceType, setServiceType] = useState<string>('REGULER');
  const [businessScale, setBusinessScale] = useState<string>('MIKRO');
  const [productCount, setProductCount] = useState<number>(1);
  const [ingredientCount, setIngredientCount] = useState<number>(5);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/calculator/calculate', {
        serviceType,
        businessScale,
        productCount: Number(productCount),
        ingredientCount: Number(ingredientCount),
      });
      if (res.data.success) {
        setResult(res.data.data);
      }
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [serviceType, businessScale, productCount, ingredientCount]);

  const handleDownloadPDF = async () => {
    const el = document.getElementById('calc-summary-card');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.text('Estimasi Biaya Pemeriksaan Halal - LPH UIN SGD Bandung', 10, 15);
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);
      pdf.save(`Estimasi_Tarif_Halal_${businessScale}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e) {
      console.error(e);
      window.print();
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
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
              <em>Kalkulator Tarif Halal</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Simulasi Transparan Biaya Pemeriksaan Halal BPJPH &amp; LPH UIN SGD Bandung
            </p>
            <a className="btn btn-large btn-icon btn-style4 hero-banner-btn" href="#kalkulator">
              Mulai Simulasi <i className="custom-icon icon-arrow-down"></i>
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
      <section className="py-5" id="kalkulator" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="row">
            {/* INPUT PANEL */}
            <div className="col-lg-5 mb-4">
              <div className="service-form-card h-100">
                <div className="service-card-header">
                  <span className="badge-pill-tag">SIMULASI</span>
                  <h3 className="card-main-title">Parameter Usaha</h3>
                  <p className="card-subtitle">
                    Pilih skema layanan, skala usaha, dan estimasi produk/bahan untuk menghitung simulasi tarif pemeriksaan.
                  </p>
                </div>

                <div className="form-group mb-3">
                  <label className="modern-label" htmlFor="svcTypeSelect">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1874A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 d-inline-block align-text-bottom">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Skema Layanan
                    </span>
                  </label>
                  <select
                    id="svcTypeSelect"
                    className="modern-select"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option value="REGULER">Sertifikasi Baru (Reguler)</option>
                    <option value="PERPANJANGAN">Perpanjangan Sertifikat Halal</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="modern-label" htmlFor="scaleSelect">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1874A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 d-inline-block align-text-bottom">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      Skala Usaha
                    </span>
                  </label>
                  <select
                    id="scaleSelect"
                    className="modern-select"
                    value={businessScale}
                    onChange={(e) => setBusinessScale(e.target.value)}
                  >
                    <option value="MIKRO">Usaha Mikro (UMK)</option>
                    <option value="KECIL">Usaha Kecil</option>
                    <option value="MENENGAH">Usaha Menengah</option>
                    <option value="BESAR">Usaha Besar / Industri</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6 mb-3">
                    <label className="modern-label" htmlFor="prodInput">
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1874A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 d-inline-block align-text-bottom">
                          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        Jumlah Produk
                      </span>
                      <span className="label-hint">Item</span>
                    </label>
                    <input
                      id="prodInput"
                      type="number"
                      min="1"
                      max="500"
                      className="modern-input"
                      value={productCount}
                      onChange={(e) => setProductCount(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                  <div className="col-12 col-sm-6 mb-3">
                    <label className="modern-label" htmlFor="ingrInput">
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1874A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 d-inline-block align-text-bottom">
                          <path d="M10 2v7.31"></path>
                          <path d="M14 9.3V2"></path>
                          <path d="M8.5 2h7"></path>
                          <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                        </svg>
                        Jumlah Bahan
                      </span>
                      <span className="label-hint">Bahan</span>
                    </label>
                    <input
                      id="ingrInput"
                      type="number"
                      min="1"
                      max="1000"
                      className="modern-input"
                      value={ingredientCount}
                      onChange={(e) => setIngredientCount(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center py-2"
                    style={{ borderRadius: '10px', fontWeight: 600, fontSize: '13.5px', borderColor: '#CBD5E1', color: '#475569' }}
                    onClick={() => {
                      setServiceType('REGULER');
                      setBusinessScale('MIKRO');
                      setProductCount(1);
                      setIngredientCount(5);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                    Reset Parameter
                  </button>
                </div>

                <div className="mt-4 pt-3 border-top text-center">
                  <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                    ⚡ Simulasi biaya diperbarui secara otomatis real-time
                  </span>
                </div>
              </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="col-lg-7 mb-4">
              <div className="service-form-card h-100" id="calc-summary-card">
                <div className="service-card-header d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-2">
                  <div>
                    <span className="badge-pill-tag">HASIL ESTIMASI</span>
                    <h3 className="card-main-title">Rincian Komparasi Tarif</h3>
                    <p className="card-subtitle">
                      Transparansi simulasi perbandingan tarif resmi BPJPH vs LPH UIN SGD
                    </p>
                  </div>
                  {result && (
                    <div className="mt-2 mt-sm-0 flex-shrink-0">
                      <span className="savings-pill-highlight">
                        ✨ Hemat {result.savingsPercent}% di LPH UIN SGD
                      </span>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                      <span className="sr-only">Menghitung...</span>
                    </div>
                    <p className="text-muted mt-3 mb-0" style={{ fontSize: '14px' }}>Menghitung estimasi tarif pemeriksaan...</p>
                  </div>
                ) : result ? (
                  <>
                    {/* DESKTOP TABLE VIEW (>= 576px) */}
                    <div className="calc-table-container d-none d-sm-block">
                      <div className="table-responsive">
                        <table className="calc-table-modern">
                          <thead>
                            <tr>
                              <th>Komponen Pemeriksaan</th>
                              <th className="text-right" style={{ minWidth: '130px' }}>Standar BPJPH</th>
                              <th className="text-right" style={{ minWidth: '150px' }}>Tarif LPH UIN SGD</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.breakdown.map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ fontWeight: 500 }}>{row.item}</td>
                                <td className="text-right text-muted">{formatRupiah(row.bpjph)}</td>
                                <td className="text-right font-weight-bold" style={{ color: '#059669' }}>
                                  {formatRupiah(row.lph)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* MOBILE CARD VIEW (< 576px) - Android Optimized */}
                    <div className="d-block d-sm-none mb-3">
                      {result.breakdown.map((row, idx) => (
                        <div key={idx} className="calc-mobile-card">
                          <div className="calc-mobile-card-title">{row.item}</div>
                          <div className="calc-mobile-card-rates">
                            <div className="rate-item">
                              <span className="rate-lbl">Standar BPJPH:</span>
                              <span className="rate-val bpjph">{formatRupiah(row.bpjph)}</span>
                            </div>
                            <div className="rate-item text-right">
                              <span className="rate-lbl">Tarif LPH UIN SGD:</span>
                              <span className="rate-val lph">{formatRupiah(row.lph)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* TOTAL HIGHLIGHT BOX */}
                    <div className="calc-total-box">
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px', color: '#166534' }}>
                          Total Estimasi Biaya
                        </div>
                        <div style={{ fontSize: '12px', color: '#15803D' }}>
                          Pemeriksaan &amp; Audit Lapangan
                        </div>
                      </div>
                      <div className="calc-total-prices text-right">
                        <span className="mr-3 text-muted" style={{ textDecoration: 'line-through', fontSize: '14px' }}>
                          {formatRupiah(result.totalBpjph)}
                        </span>
                        <span style={{ color: '#005a36', fontSize: '22px', fontWeight: 800 }}>
                          {formatRupiah(result.totalLph)}
                        </span>
                      </div>
                    </div>

                    {/* SAVINGS ALERT BOX */}
                    <div className="alert mb-4" style={{ backgroundColor: '#ECFDF5', border: '1.5px solid #A7F3D0', borderRadius: '12px', padding: '16px 20px', color: '#065F46' }}>
                      <div className="d-flex align-items-start">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0 mt-1">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <div>
                          <strong style={{ fontSize: '14.5px', display: 'block', marginBottom: '2px' }}>
                            Estimasi Penghematan: {formatRupiah(result.savingsNominal)} ({result.savingsPercent}%)
                          </strong>
                          <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#047857' }}>
                            {result.notes || 'Termasuk pemeriksaan kehalalan produk pangan sederhana dan audit lapangan dasar.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="calc-actions-wrap d-flex flex-wrap gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary mr-sm-2 mb-2 d-inline-flex align-items-center justify-content-center"
                        style={{ borderRadius: '10px', fontWeight: 600, fontSize: '14px', padding: '10px 18px', borderColor: '#CBD5E1', color: '#334155' }}
                        onClick={() => window.print()}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                        Cetak Simulasi
                      </button>
                      <button
                        type="button"
                        className="btn btn-style2 mb-2 d-inline-flex align-items-center justify-content-center"
                        style={{ borderRadius: '10px', fontWeight: 600, fontSize: '14px', padding: '10px 22px' }}
                        onClick={handleDownloadPDF}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download PDF Estimasi
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
