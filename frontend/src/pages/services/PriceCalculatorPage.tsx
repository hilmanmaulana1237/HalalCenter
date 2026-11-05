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
      <section className="py-5" id="kalkulator">
        <div className="container">
          <div className="row">
            {/* INPUT PANEL */}
            <div className="col-lg-5 mb-4">
              <div className="card card-custom p-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge badge-green mr-2">SIMULASI</span>
                  <h4 className="heading heading-dark heading-medium mb-0">Parameter Usaha</h4>
                </div>
                <p className="wysiwyg-text mb-4">
                  Pilih skema layanan, skala usaha, dan estimasi produk/bahan untuk menghitung simulasi tarif pemeriksaan.
                </p>

                <div className="form-group mb-3">
                  <label className="font-weight-bold" htmlFor="svcTypeSelect">Skema Layanan</label>
                  <select
                    id="svcTypeSelect"
                    className="form-control"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option value="REGULER">Sertifikasi Baru (Reguler)</option>
                    <option value="PERPANJANGAN">Perpanjangan Sertifikat Halal</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="font-weight-bold" htmlFor="scaleSelect">Skala Usaha</label>
                  <select
                    id="scaleSelect"
                    className="form-control"
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
                  <div className="col-6 mb-3">
                    <label className="font-weight-bold" htmlFor="prodInput">Jumlah Produk</label>
                    <input
                      id="prodInput"
                      type="number"
                      min="1"
                      max="500"
                      className="form-control"
                      value={productCount}
                      onChange={(e) => setProductCount(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="font-weight-bold" htmlFor="ingrInput">Jumlah Bahan</label>
                    <input
                      id="ingrInput"
                      type="number"
                      min="1"
                      max="1000"
                      className="form-control"
                      value={ingredientCount}
                      onChange={(e) => setIngredientCount(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-style1 w-100 mt-2"
                  onClick={() => {
                    setServiceType('REGULER');
                    setBusinessScale('MIKRO');
                    setProductCount(1);
                    setIngredientCount(5);
                  }}
                >
                  <span>Reset Parameter</span>
                </button>
              </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="col-lg-7 mb-4">
              <div className="card card-custom p-4" id="calc-summary-card">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                  <div>
                    <span className="badge badge-green mr-2">HASIL ESTIMASI</span>
                    <h4 className="heading heading-dark heading-medium d-inline-block mb-0">Rincian Komparasi Tarif</h4>
                  </div>
                  {result && (
                    <span className="badge badge-light-green font-weight-bold mt-2 mt-md-0">
                      Hemat {result.savingsPercent}% di LPH UIN SGD
                    </span>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Menghitung...</span>
                    </div>
                  </div>
                ) : result ? (
                  <>
                    <div className="table-responsive mb-4">
                      <table className="table table-striped table-hover mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th>Komponen Pemeriksaan</th>
                            <th className="text-right">Standar BPJPH</th>
                            <th className="text-right">Tarif LPH UIN SGD</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.breakdown.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.item}</td>
                              <td className="text-right">{formatRupiah(row.bpjph)}</td>
                              <td className="text-right font-weight-bold" style={{ color: '#059669' }}>
                                {formatRupiah(row.lph)}
                              </td>
                            </tr>
                          ))}
                          <tr className="table-success font-weight-bold" style={{ fontSize: '16px' }}>
                            <td>Total Estimasi Biaya</td>
                            <td className="text-right text-muted" style={{ textDecoration: 'line-through' }}>
                              {formatRupiah(result.totalBpjph)}
                            </td>
                            <td className="text-right" style={{ color: '#1874A5', fontSize: '18px' }}>
                              {formatRupiah(result.totalLph)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="alert alert-success mb-4" style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }}>
                      <div className="d-flex align-items-center">
                        <i className="custom-icon icon-verified mr-2"></i>
                        <div>
                          <strong>Estimasi Penghematan: {formatRupiah(result.savingsNominal)} ({result.savingsPercent}%)</strong>
                          <div style={{ fontSize: '13px' }}>
                            {result.notes || 'LPH UIN SGD Bandung memberikan efisiensi biaya audit terjangkau dengan standar akreditasi resmi BPJPH.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-style1 mr-2"
                        onClick={() => window.print()}
                      >
                        <span>Cetak Simulasi</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-style2"
                        onClick={handleDownloadPDF}
                      >
                        <span>Download PDF Estimasi</span>
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
