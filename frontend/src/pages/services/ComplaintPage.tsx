import React, { useState } from 'react';
import { api } from '../../services/api';
import type { Complaint } from '../../types';

export const ComplaintPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FORM' | 'TRACK'>('FORM');

  // Form State
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('PELAYANAN');
  const [description, setDescription] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Track State
  const [searchTicket, setSearchTicket] = useState('');
  const [trackResult, setTrackResult] = useState<Complaint | null>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmittedTicket(null);

    try {
      const formData = new FormData();
      formData.append('name', isAnonymous ? 'Anonim' : reporterName);
      formData.append('contact', isAnonymous ? '-' : reporterContact);
      formData.append('contactType', reporterContact.includes('@') ? 'EMAIL' : 'WHATSAPP');
      formData.append('category', category);
      formData.append('description', description);
      if (evidenceFile) {
        formData.append('evidence', evidenceFile);
      }

      const res = await api.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setSubmittedTicket(res.data.data.ticketCode);
        setReporterName('');
        setReporterContact('');
        setDescription('');
        setEvidenceFile(null);
      }
    } catch (err) {
      alert('Gagal mengirimkan pengaduan. Silakan periksa kembali kelengkapan form.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicket.trim()) return;

    setTrackLoading(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await api.get(`/complaints/track/${encodeURIComponent(searchTicket.trim())}`);
      if (res.data.success) {
        setTrackResult(res.data.data);
      }
    } catch (err: any) {
      setTrackError(err.response?.data?.error || 'Nomor tiket tidak ditemukan dalam basis data.');
    } finally {
      setTrackLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return <span className="badge badge-warning">DITERIMA</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-info">SEDANG DIPROSES</span>;
      case 'RESOLVED':
        return <span className="badge badge-green">SELESAI DITANGANI</span>;
      default:
        return <span className="badge badge-light">{status}</span>;
    }
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
        style={{ backgroundImage: "url('/assets/images/hero_faq.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading">
              <em>Layanan Pengaduan &amp; Whistleblowing</em>
            </h1>
            <p className="text-white mt-3 mb-4" style={{ fontSize: '18px' }}>
              Komitmen Integritas, Transparansi, dan Akuntabilitas Layanan Sertifikasi Halal LPH UIN SGD Bandung
            </p>
            <a className="btn btn-large btn-icon btn-style4 hero-banner-btn" href="#pengaduan">
              Buat / Lacak Pengaduan <i className="custom-icon icon-arrow-down"></i>
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
      <section className="py-5" id="pengaduan">
        <div className="container">
          <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === 'FORM' ? 'btn-style2' : 'btn-style1'}`}
                onClick={() => setActiveTab('FORM')}
              >
                <span>Buat Pengaduan Baru</span>
              </button>
              <button
                type="button"
                className={`btn ${activeTab === 'TRACK' ? 'btn-style2' : 'btn-style1'}`}
                onClick={() => setActiveTab('TRACK')}
              >
                <span>Lacak Status Tiket</span>
              </button>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {activeTab === 'FORM' ? (
                <div className="card card-custom p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge badge-green mr-2">WHISTLEBLOWING SYSTEM</span>
                    <h4 className="heading heading-dark heading-medium mb-0">Formulir Pengaduan Resmi</h4>
                  </div>
                  <p className="wysiwyg-text mb-4">
                    Sampaikan keluhan, ketidaksesuaian prosedur, atau dugaan pelanggaran kode etik oleh auditor/petugas kami. Identitas Anda dijamin kerahasiaannya.
                  </p>

                  {submittedTicket && (
                    <div className="alert alert-success mb-4" style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }}>
                      <h5 className="font-weight-bold mb-1">Pengaduan Berhasil Terkirim!</h5>
                      <p className="mb-2">Simpan nomor tiket pengaduan berikut untuk melacak progres penanganan:</p>
                      <div className="p-3 bg-white rounded border font-weight-bold text-center" style={{ fontSize: '20px', letterSpacing: '1px', color: '#1874A5' }}>
                        {submittedTicket}
                      </div>
                      <small className="d-block mt-2 text-muted">Tim Pengawasan Internal LPH UIN SGD akan menindaklanjuti dalam 1-3 hari kerja.</small>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="anonCheck"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <label className="form-check-label font-weight-bold" htmlFor="anonCheck">
                        Kirim sebagai Pelapor Anonim (Rahasiakan Identitas Saya)
                      </label>
                    </div>

                    {!isAnonymous && (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="font-weight-bold" htmlFor="repName">Nama Lengkap</label>
                          <input
                            type="text"
                            id="repName"
                            className="form-control"
                            required
                            placeholder="Nama Anda"
                            value={reporterName}
                            onChange={(e) => setReporterName(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="font-weight-bold" htmlFor="repContact">No. HP / WhatsApp / Email</label>
                          <input
                            type="text"
                            id="repContact"
                            className="form-control"
                            required
                            placeholder="0812xxxx / email@domain.com"
                            value={reporterContact}
                            onChange={(e) => setReporterContact(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="form-group mb-3">
                      <label className="font-weight-bold" htmlFor="catSelect">Kategori Pengaduan</label>
                      <select
                        id="catSelect"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="PELAYANAN">Kualitas Pelayanan &amp; Komunikasi</option>
                        <option value="AUDITOR">Kinerja &amp; Kode Etik Auditor Halal</option>
                        <option value="TARIF">Ketidaksesuaian Biaya / Pungli</option>
                        <option value="WAKTU">Keterlambatan Proses / Waktu Layanan</option>
                        <option value="LAINNYA">Lain-lain</option>
                      </select>
                    </div>

                    <div className="form-group mb-4">
                      <label className="font-weight-bold" htmlFor="descText">Uraian Kejadian / Kronologi Lengkap</label>
                      <textarea
                        id="descText"
                        className="form-control"
                        rows={4}
                        required
                        placeholder="Jelaskan detail kejadian, tanggal, pihak yang terlibat, serta kronologi permasalahan..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-group mb-4">
                      <label className="font-weight-bold" htmlFor="fileEvid">Lampiran Bukti (Opsional - Dokumen / Foto / Screenshot)</label>
                      <input
                        type="file"
                        id="fileEvid"
                        className="form-control-file"
                        onChange={(e) => setEvidenceFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <small className="text-muted">Format: PDF, JPG, PNG (Maks 5MB)</small>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-style2 w-100"
                    >
                      <span>{loading ? 'Mengirimkan...' : 'Kirim Pengaduan Resmi'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="card card-custom p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge badge-green mr-2">TRACKING</span>
                    <h4 className="heading heading-dark heading-medium mb-0">Cek Status Pengaduan</h4>
                  </div>
                  <p className="wysiwyg-text mb-4">
                    Masukkan nomor tiket pengaduan Anda untuk memantau tahapan tindak lanjut dan respon dari tim pemeriksa internal.
                  </p>

                  <form onSubmit={handleTrack} className="mb-4">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan Nomor Tiket (Contoh: LPH-202611-6188)"
                        value={searchTicket}
                        onChange={(e) => setSearchTicket(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          type="submit"
                          disabled={trackLoading || !searchTicket.trim()}
                          className="btn btn-style2"
                        >
                          <span>{trackLoading ? 'Mencari...' : 'Lacak Tiket'}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {trackError && (
                    <div className="alert alert-danger" role="alert">
                      {trackError}
                    </div>
                  )}

                  {trackResult && (
                    <div className="border rounded p-4 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="font-weight-bold mb-0 text-primary">{trackResult.ticketCode}</h5>
                        {getStatusBadge(trackResult.status)}
                      </div>
                      <div className="mb-2"><strong>Kategori:</strong> {trackResult.category}</div>
                      <div className="mb-2"><strong>Pelapor:</strong> {trackResult.name}</div>
                      <div className="mb-2"><strong>Tanggal Masuk:</strong> {new Date(trackResult.submittedAt).toLocaleDateString('id-ID', { dateStyle: 'full' })}</div>
                      <div className="mb-3"><strong>Uraian:</strong> {trackResult.description}</div>

                      {trackResult.adminReply ? (
                        <div className="alert alert-info mt-3 mb-0" style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', color: '#0369A1' }}>
                          <h6 className="font-weight-bold mb-1">Tanggapan Resmi LPH UIN SGD:</h6>
                          <p className="mb-0">{trackResult.adminReply}</p>
                        </div>
                      ) : (
                        <div className="alert alert-secondary mt-3 mb-0">
                          Pengaduan sedang dalam proses verifikasi dan telaah tim pengawas internal LPH UIN Sunan Gunung Djati Bandung.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
