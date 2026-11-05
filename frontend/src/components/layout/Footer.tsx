import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer  className="footer">
    <div className="footer-menu">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <a href="#">
                        <img src="/assets/images/img_037.png" alt="Logo Lab LPH UIN SGD" className="img-fluid footer-logo entered lazyloaded"   />                    </a>
                    <div>
                        <a href="/layanan/kalkulator-harga" className="btn btn-style2 btn-icon btn-style4"><i className="custom-icon icon-search"></i>Cek Estimasi Tarif LPH UIN</a>
                    </div>
                    <div className="social-media">
                        <a href="https://www.instagram.com/lppom_mui/" target="_blank" aria-label="Instagram" className="social-media-item"><i className="custom-icon icon-instagram"></i></a>
                        <a href="https://www.facebook.com/halalindonesia/" target="_blank" aria-label="Facebook" className="social-media-item"><i className="custom-icon icon-facebook"></i></a>
                        <a href="https://id.linkedin.com/company/lppommui-official" target="_blank" aria-label="Linkedin" className="social-media-item"><i className="custom-icon icon-linkedin"></i></a>
                        <a href="https://www.youtube.com/@HalalIndonesia" target="_blank" aria-label="Youtube" className="social-media-item"><i className="custom-icon icon-youtube"></i></a>
                        <a href="https://x.com/lppom_mui" target="_blank" aria-label="X" className="social-media-item"><i className="custom-icon icon-x"></i></a>
                        <a href="https://www.tiktok.com/@lppom_mui" target="_blank" aria-label="Tiktok" className="social-media-item"><i className="custom-icon icon-tiktok"></i></a>
                    </div>
                </div>

                
                <div className="col-md-2 mb-4">
                    <h5 className="heading-menu">Jelajahi</h5>
                    <ul className="list-unstyled menu-list">
                        <ul className="list-unstyled menu-list"><li id="menu-item-323" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-7 current_page_item menu-item-323"><a href="/" aria-current="page">Beranda</a></li>
<li id="menu-item-325" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-325"><a href="/tentang-lph">Tentang Kami</a></li>
<li id="menu-item-326" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-326"><a href="/layanan/kalkulator-harga">Layanan</a></li>
<li id="menu-item-327" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-327"><a href="/berita">Berita</a></li>
<li id="menu-item-328" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-328"><a href="/ruang-umk">Pojok UMK</a></li>
<li id="menu-item-324" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-324"><a href="/layanan/qna">FAQ</a></li>
<li id="menu-item-329" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-329"><a href="/category/fatwa-regulasi/fatwa-mui">Fatwa MUI</a></li>
<li id="menu-item-330" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-330"><a href="/category/fatwa-regulasi/regulasi">Regulasi</a></li>
<li id="menu-item-33146" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-33146"><a rel="privacy-policy" href="https://halalmui.org/kebijakan-privasi/">Kebijakan Privasi</a></li>
</ul>                    </ul>
                </div>

                
                <div className="col-md-3 mb-4">
                    <h5 className="heading-menu">Layanan Kami</h5>
                    <ul className="list-unstyled menu-list">
                        <ul className="list-unstyled menu-list"><li id="menu-item-332" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-332"><a href="https://halalmui.org/layanan-lppom/pemeriksaan-kehalalan-produk/">Pemeriksaan Kehalalan Produk</a></li>
<li id="menu-item-33815" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-33815"><a href="https://halalmui.org/layanan-lppom/uji-laboratorium/">Uji Laboratorium</a></li>
</ul>                    </ul>
                </div>

                
                <div className="col-md-3 mb-4">
                    <h5 className="heading-menu">Kontak</h5>
                    <ul className="list-unstyled menu-list">
                        <li><i className="custom-icon icon-phone"></i>Call Center: <a href="tel:14056" aria-label="Call Center">14056</a></li>
                        <li><i className="custom-icon icon-email"></i><a href="mailto:customercare@halalmui.org" aria-label="Email">customercare@halalmui.org</a></li>
                        <li><i className="custom-icon icon-web"></i><a href="/" target="_blank" aria-label="Website">halalmui.org</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="copyright">
        <div className="container-fluid">
            <span className="copyright-text">© COPYRIGHT LPH UIN SGD 2026. All Right Reserved</span>
        </div>
    </div>
</footer>
  );
};
