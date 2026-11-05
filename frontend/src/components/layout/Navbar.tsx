import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const header = document.querySelector('#navbar');
    const button = document.getElementById('btnSearchProduct');
    if (!header || !button) return;

    const updateHeaderClass = () => {
      if (isHome) {
        if (window.scrollY > 80) {
          header.classList.add('alternative');
          button.classList.remove('btn-style1');
          button.classList.add('btn-style2');
        } else {
          header.classList.remove('alternative');
          button.classList.remove('btn-style2');
          button.classList.add('btn-style1');
        }
      } else {
        header.classList.add('alternative');
        button.classList.remove('btn-style1');
        button.classList.add('btn-style2');
      }
    };

    updateHeaderClass();
    window.addEventListener('scroll', updateHeaderClass);
    return () => window.removeEventListener('scroll', updateHeaderClass);
  }, [isHome]);

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${!isHome ? 'alternative' : ''}`} id="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img
            alt="Logo LPH UIN SGD"
            className="img-fluid header-logo entered lazyloaded"
            height="44"
            src="/assets/images/beranda_000.png"
            width="98"
          />
          <img
            alt="Logo LPH UIN SGD"
            className="img-fluid header-logo-white"
            height="44"
            src="/assets/images/beranda_002.png"
            width="98"
          />
        </Link>
        
        <div className="multilanguage-mobile">
          <a className="gt-current-lang notranslate glink nturl" data-gt-lang="id" href="#" title="Indonesian">
            ID
          </a>
          <span className="linespace">|</span>
          <a className="notranslate glink nturl" data-gt-lang="en" href="#" title="English">
            EN
          </a>
        </div>

        <button
          aria-controls="navbarMenu"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          id="navbarToggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${mobileMenuOpen ? 'show' : ''}`} id="navbarMenu">
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/" onClick={closeMenu}>
                Beranda
              </Link>
            </li>

            {/* Dropdown Tentang */}
            <li className={`nav-item dropdown ${openDropdown === 'tentang' ? 'show' : ''}`}>
              <a
                aria-expanded={openDropdown === 'tentang'}
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                onClick={(e) => toggleDropdown('tentang', e)}
              >
                Tentang Kami
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58021 10.8267 7.06688 10.3133L2.72021 5.96667" stroke="#229CD1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5"></path>
                </svg>
              </a>
              <div className={`dropdown-menu dropdown-menu-left ${openDropdown === 'tentang' ? 'show' : ''}`}>
                <Link className="dropdown-item d-flex align-items-center" to="/tentang" onClick={closeMenu}>
                  Profil & Sejarah LPH
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/layanan/qna" onClick={closeMenu}>
                  FAQ & Halal QnA
                </Link>
              </div>
            </li>

            {/* Dropdown Layanan */}
            <li className={`nav-item dropdown ${openDropdown === 'layanan' ? 'show' : ''}`}>
              <a
                aria-expanded={openDropdown === 'layanan'}
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                onClick={(e) => toggleDropdown('layanan', e)}
              >
                Layanan LPH
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58021 10.8267 7.06688 10.3133L2.72021 5.96667" stroke="#229CD1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5"></path>
                </svg>
              </a>
              <div className={`dropdown-menu dropdown-menu-left ${openDropdown === 'layanan' ? 'show' : ''}`}>
                <Link className="dropdown-item d-flex align-items-center" to="/layanan/kalkulator" onClick={closeMenu}>
                  Kalkulator Tarif
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/layanan/pengaduan" onClick={closeMenu}>
                  Pengaduan & Whistleblowing
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/layanan/kepuasan" onClick={closeMenu}>
                  Survei Kepuasan Pelanggan
                </Link>
              </div>
            </li>

            {/* Dropdown Berita */}
            <li className={`nav-item dropdown ${openDropdown === 'berita' ? 'show' : ''}`}>
              <a
                aria-expanded={openDropdown === 'berita'}
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                onClick={(e) => toggleDropdown('berita', e)}
              >
                News & Update
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58021 10.8267 7.06688 10.3133L2.72021 5.96667" stroke="#229CD1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5"></path>
                </svg>
              </a>
              <div className={`dropdown-menu dropdown-menu-left ${openDropdown === 'berita' ? 'show' : ''}`}>
                <Link className="dropdown-item d-flex align-items-center" to="/berita" onClick={closeMenu}>
                  Berita & Kegiatan
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/pengumuman" onClick={closeMenu}>
                  Pengumuman Resmi
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive('/kontak') ? 'active' : ''}`} to="/kontak" onClick={closeMenu}>
                Kontak
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-style2" to="/layanan/kalkulator" id="btnSearchProduct" onClick={closeMenu}>
                <span>Hitung Tarif Halal</span>
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center nav-item-language">
              <a className="gt-current-lang notranslate glink nturl" data-gt-lang="id" href="#" title="Indonesian">
                ID
              </a>
              <span className="linespace">|</span>
              <a className="notranslate glink nturl" data-gt-lang="en" href="#" title="English">
                EN
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
