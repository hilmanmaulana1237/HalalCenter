import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-menu py-5">
        <div className="container-fluid px-lg-5">
          <div className="row">
            {/* Column 1: Info & Call to Action */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link to="/">
                <img
                  src="/assets/images/uin_sgd/uin_00.webp"
                  alt="Logo Halal Center UIN SGD Bandung"
                  className="img-fluid footer-logo entered lazyloaded mb-3"
                  style={{ maxHeight: '65px', objectFit: 'contain' }}
                />
              </Link>
              <p className="text-muted small pr-lg-4" style={{ lineHeight: '1.6' }}>
                Pusat Halal (Halal Center) UIN Sunan Gunung Djati Bandung melalui visi <strong>"Halalsphere University"</strong> mengintegrasikan riset multidisiplin, pemeriksaan halal reguler (LPH), pendampingan UMK (LP3H), laboratorium terpadu, dan pelatihan kompetensi SDM halal.
              </p>
              <div className="mt-3">
                <Link to="/layanan/kalkulator-harga" className="btn btn-style2 btn-icon btn-style4 btn-sm">
                  <i className="custom-icon icon-search"></i> Hitung Estimasi Tarif LPH
                </Link>
              </div>
            </div>

            {/* Column 2: Jelajahi */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="heading-menu font-weight-bold mb-3" style={{ color: '#005a36' }}>Jelajahi</h5>
              <ul className="list-unstyled menu-list">
                <li className="mb-2"><Link to="/">Beranda</Link></li>
                <li className="mb-2"><Link to="/tentang">Tentang Kami</Link></li>
                <li className="mb-2"><Link to="/layanan/kalkulator-harga">Kalkulator Tarif</Link></li>
                <li className="mb-2"><Link to="/berita">Berita &amp; Artikel</Link></li>
                <li className="mb-2"><Link to="/layanan/qna">Pusat Bantuan (FAQ)</Link></li>
                <li className="mb-2"><Link to="/kontak">Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Column 3: Layanan Kami */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="heading-menu font-weight-bold mb-3" style={{ color: '#005a36' }}>Unit Layanan</h5>
              <ul className="list-unstyled menu-list">
                <li className="mb-2"><Link to="/tentang#services">Lembaga Pemeriksa Halal (LPH)</Link></li>
                <li className="mb-2"><Link to="/tentang#services">Lembaga Pendamping PPH (LP3H)</Link></li>
                <li className="mb-2"><Link to="/tentang#services">Laboratorium Pengujian &amp; Kalibrasi</Link></li>
                <li className="mb-2"><Link to="/tentang#services">Lembaga Pelatihan JPH (LPJPH)</Link></li>
                <li className="mb-2"><Link to="/tentang#services">Akademi Juru Sembelih Halal (JULEHA)</Link></li>
                <li className="mb-2"><a href="https://journal.uinsgd.ac.id/index.php/ijhr" target="_blank" rel="noopener noreferrer">Indonesian Journal of Halal Research</a></li>
              </ul>
            </div>

            {/* Column 4: Kontak Resmi */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="heading-menu font-weight-bold mb-3" style={{ color: '#005a36' }}>Kontak Resmi</h5>
              <ul className="list-unstyled menu-list">
                <li className="mb-2">
                  <i className="custom-icon icon-phone mr-2" style={{ color: '#005a36' }}></i>
                  WA / Call Center: <a href="https://wa.me/6282118201232" target="_blank" rel="noopener noreferrer">+62 821 1820 1232</a>
                </li>
                <li className="mb-2">
                  <i className="custom-icon icon-phone mr-2" style={{ color: '#005a36' }}></i>
                  Telepon: <a href="tel:0227800525">(022) 7800525</a>
                </li>
                <li className="mb-2">
                  <i className="custom-icon icon-email mr-2" style={{ color: '#005a36' }}></i>
                  <a href="mailto:halal@uinsgd.ac.id">halal@uinsgd.ac.id</a>
                </li>
                <li className="mb-2">
                  <i className="custom-icon icon-web mr-2" style={{ color: '#005a36' }}></i>
                  <a href="https://halal.uinsgd.ac.id" target="_blank" rel="noopener noreferrer">halal.uinsgd.ac.id</a>
                </li>
                <li className="mt-2 text-muted small">
                  <strong>Kampus 2:</strong> Jl. Cimencrang, Gede Bage, Bandung 40294<br />
                  <strong>Kampus 1:</strong> Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright py-3" style={{ backgroundColor: '#00472a', color: '#e5e7eb' }}>
        <div className="container-fluid text-center">
          <span className="copyright-text small">
            &copy; 2026 Halal Center &amp; Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
