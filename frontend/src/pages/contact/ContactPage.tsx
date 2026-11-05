import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="site-main" id="main">
      {/* HERO BANNER DARI TEMPLATE */}
      <section
        id="hero"
        className="hero-banner hero-banner-style2"
        style={{ backgroundImage: "url('/assets/images/img_006.jpg')" }}
      >
        <div className="hero-banner-content bg-overlay-4 text-center">
          <div className="container">
            <h1 className="heading heading-large hero-banner-heading">
              <em>Kontak &amp; Lokasi Kantor</em>
            </h1>
            <p style={{ color: '#FFFFFF', fontSize: '18px', maxWidth: '750px', margin: '15px auto 25px auto' }}>
              Lembaga Pemeriksa Halal Universitas Islam Negeri Sunan Gunung Djati Bandung
            </p>
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

      {/* CONTACT DETAILS & FORM */}
      <section className="py-5" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="container">
          <div className="row">
            {/* Info Card */}
            <div className="col-lg-5 mb-4">
              <div className="card shadow-sm p-4 h-100" style={{ borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
                <div className="badge badge-green mb-2">SEKRETARIAT &amp; LAB</div>
                <h3 className="heading heading-dark heading-medium mb-4">
                  <em>Kantor Pusat LPH UIN SGD</em>
                </h3>

                <div className="d-flex flex-column gap-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  <div className="mb-3">
                    <strong style={{ color: 'var(--color-primary-600, #272353)' }}>📍 Alamat Kantor:</strong>
                    <div className="text-muted mt-1">
                      Gedung Halal Center / Laboratorium Terpadu Lantai 3<br />
                      UIN Sunan Gunung Djati Kampus 1<br />
                      Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung, Jawa Barat 40614
                    </div>
                  </div>

                  <div className="mb-3">
                    <strong style={{ color: 'var(--color-primary-600, #272353)' }}>🕒 Jam Layanan:</strong>
                    <div className="text-muted mt-1">
                      Senin – Jumat: 08.00 – 16.00 WIB<br />
                      Sabtu, Minggu &amp; Hari Libur: Tutup
                    </div>
                  </div>

                  <div className="mb-3">
                    <strong style={{ color: 'var(--color-primary-600, #272353)' }}>📞 Telepon &amp; WhatsApp:</strong>
                    <div className="text-muted mt-1">
                      Telepon: (022) 7800525<br />
                      WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary-500, #059669)', fontWeight: 600 }}>+62 812-3456-7890</a>
                    </div>
                  </div>

                  <div className="mb-3">
                    <strong style={{ color: 'var(--color-primary-600, #272353)' }}>✉️ Email Resmi:</strong>
                    <div className="text-muted mt-1">
                      halalcenter@uinsgd.ac.id
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-top">
                  <iframe
                    title="Peta Lokasi LPH UIN SGD"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6728073539284!2d107.71536787499659!3d-6.929653893070183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c32cd712c497%3A0x6b7720fcbe44f568!2sUIN%20Sunan%20Gunung%20Djati%20Bandung!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="col-lg-7">
              <div className="card shadow-sm p-4" style={{ borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
                <div className="badge badge-green mb-2">LAYANAN PESAN</div>
                <h3 className="heading heading-dark heading-medium mb-2">
                  <em>Kirimkan Pertanyaan atau Pesan</em>
                </h3>
                <p className="wysiwyg-text mb-4">
                  Silakan isi formulir di bawah ini untuk konsultasi, penjadwalan audit, atau permohonan informasi kemitraan.
                </p>

                {sent ? (
                  <div className="text-center py-5">
                    <div className="badge badge-green mb-3 p-2 font-weight-bold" style={{ fontSize: '14px' }}>PESAN TERKIRIM</div>
                    <h4 className="heading heading-dark heading-small">Terima kasih atas pesan Anda!</h4>
                    <p className="wysiwyg-text">Tim sekretariat kami akan merespon melalui kontak yang Anda sediakan dalam kurun 1x24 jam.</p>
                    <button onClick={() => setSent(false)} className="btn btn-style1 mt-3">
                      <span>Kirim Pesan Lain</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="Nama Anda"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Email *</label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          placeholder="email@anda.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Telepon / WhatsApp</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0812xxxxxxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Perihal Pesan *</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="Perihal"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label style={{ fontWeight: 600, fontSize: '13px' }}>Isi Pesan *</label>
                      <textarea
                        rows={5}
                        required
                        className="form-control"
                        placeholder="Tuliskan pesan Anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-style2" style={{ padding: '12px 32px' }}>
                      <span>Kirim Pesan Sekarang</span>
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
