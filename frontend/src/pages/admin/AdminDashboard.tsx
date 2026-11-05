import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, formatDate, formatRupiah } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'NEWS' | 'ANNOUNCEMENTS' | 'KB' | 'RATES' | 'SATISFACTION' | 'COMPLAINTS' | 'SETTINGS'>('NEWS');

  // Module data states
  const [newsList, setNewsList] = useState<any[]>([]);
  const [announcementList, setAnnouncementList] = useState<any[]>([]);
  const [kbList, setKbList] = useState<any[]>([]);
  const [unansweredList, setUnansweredList] = useState<any[]>([]);
  const [ratesList, setRatesList] = useState<any[]>([]);
  const [satisfactionList, setSatisfactionList] = useState<any[]>([]);
  const [satisfactionStats, setSatisfactionStats] = useState<any>(null);
  const [complaintList, setComplaintList] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  // Modals state
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'AGENDA',
    status: 'PUBLISHED',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
  });

  const [kbModalOpen, setKbModalOpen] = useState(false);
  const [editingKb, setEditingKb] = useState<any>(null);
  const [kbForm, setKbForm] = useState({ question: '', answer: '', tags: '' });

  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<any>(null);
  const [rateForm, setRateForm] = useState({
    serviceType: 'REGULER',
    businessScale: 'MIKRO',
    label: '',
    bpjphPrice: 0,
    lphPrice: 0,
    formulaNotes: '',
  });

  const [replyComplaintModal, setReplyComplaintModal] = useState<any>(null);
  const [complaintReplyText, setComplaintReplyText] = useState('');
  const [complaintStatusSelect, setComplaintStatusSelect] = useState('IN_PROGRESS');

  // Verify auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lph_admin_user');
    const token = localStorage.getItem('lph_admin_token');
    if (!token || !storedUser) {
      navigate('/admin/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    loadCurrentTabData(activeTab);
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('lph_admin_token');
    localStorage.removeItem('lph_admin_user');
    navigate('/admin/login');
  };

  const loadCurrentTabData = async (tab: string) => {
    setLoading(true);
    try {
      if (tab === 'NEWS') {
        const res = await api.get('/news/admin/list');
        if (res.data.success) setNewsList(res.data.data);
      } else if (tab === 'ANNOUNCEMENTS') {
        const res = await api.get('/announcements/admin/list');
        if (res.data.success) setAnnouncementList(res.data.data);
      } else if (tab === 'KB') {
        const [kbRes, unRes] = await Promise.all([
          api.get('/chat/admin/kb'),
          api.get('/chat/admin/unanswered'),
        ]);
        if (kbRes.data.success) setKbList(kbRes.data.data);
        if (unRes.data.success) setUnansweredList(unRes.data.data);
      } else if (tab === 'RATES') {
        const res = await api.get('/calculator/admin/rates');
        if (res.data.success) setRatesList(res.data.data);
      } else if (tab === 'SATISFACTION') {
        const res = await api.get('/satisfaction/admin/list');
        if (res.data.success) {
          setSatisfactionList(res.data.data);
          setSatisfactionStats(res.data.stats);
        }
      } else if (tab === 'COMPLAINTS') {
        const res = await api.get('/complaints/admin/list');
        if (res.data.success) setComplaintList(res.data.data);
      } else if (tab === 'SETTINGS') {
        const res = await api.get('/settings');
        if (res.data.success) setSettings(res.data.data);
      }
    } catch (err) {
      console.error('Error loading tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  // NEWS Handlers
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await api.put(`/news/admin/${editingNews.id}`, newsForm);
      } else {
        await api.post('/news/admin/create', newsForm);
      }
      setNewsModalOpen(false);
      setEditingNews(null);
      loadCurrentTabData('NEWS');
    } catch (err) {
      alert('Gagal menyimpan berita');
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      await api.delete(`/news/admin/${id}`);
      loadCurrentTabData('NEWS');
    }
  };

  // KB Handlers
  const handleSaveKb = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingKb) {
        await api.put(`/chat/admin/kb/${editingKb.id}`, kbForm);
      } else {
        await api.post('/chat/admin/kb', kbForm);
      }
      setKbModalOpen(false);
      setEditingKb(null);
      loadCurrentTabData('KB');
    } catch (err) {
      alert('Gagal menyimpan Knowledge Base');
    }
  };

  const handleDeleteKb = async (id: number) => {
    if (confirm('Hapus pertanyaan ini dari Knowledge Base?')) {
      await api.delete(`/chat/admin/kb/${id}`);
      loadCurrentTabData('KB');
    }
  };

  // RATE Handlers
  const handleSaveRate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRate) {
        await api.put(`/calculator/admin/rates/${editingRate.id}`, rateForm);
      } else {
        await api.post('/calculator/admin/rates', rateForm);
      }
      setRateModalOpen(false);
      setEditingRate(null);
      loadCurrentTabData('RATES');
    } catch (err) {
      alert('Gagal menyimpan tarif');
    }
  };

  const handleDeleteRate = async (id: number) => {
    if (confirm('Hapus tarif ini?')) {
      await api.delete(`/calculator/admin/rates/${id}`);
      loadCurrentTabData('RATES');
    }
  };

  // COMPLAINT Handlers
  const handleSaveComplaintReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyComplaintModal) return;
    try {
      await api.put(`/complaints/admin/${replyComplaintModal.id}`, {
        status: complaintStatusSelect,
        adminReply: complaintReplyText,
      });
      setReplyComplaintModal(null);
      loadCurrentTabData('COMPLAINTS');
    } catch (err) {
      alert('Gagal memperbarui pengaduan');
    }
  };

  // SETTINGS Handlers
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/settings/admin/update', { settings });
      alert('Pengaturan situs berhasil disimpan!');
    } catch (err) {
      alert('Gagal memperbarui pengaturan situs');
    }
  };

  return (
    <div style={{ backgroundColor: '#F8F7FF', minHeight: '90vh', paddingBottom: '80px' }}>
      {/* Admin Topbar */}
      <div style={{ backgroundColor: 'var(--color-primary-600)', color: '#FFFFFF', padding: '20px 0' }}>
        <div className="container-fluid" style={{ paddingLeft: '5%', paddingRight: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
              Panel Pengelola LPH UIN Sunan Gunung Djati
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
              Dashboard Administrasi & Layanan
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{user?.name || 'Petugas Admin'}</div>
              <span className="badge badge-light" style={{ fontSize: '11px' }}>{user?.role || 'SUPER_ADMIN'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-light"
              style={{ borderRadius: '6px' }}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="container-fluid" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '30px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '2px solid #E5E7EB' }}>
          {[
            { id: 'NEWS', label: '📰 Berita & Acara' },
            { id: 'ANNOUNCEMENTS', label: '📢 Pengumuman' },
            { id: 'KB', label: '🧠 Knowledge Base (FAQ)' },
            { id: 'RATES', label: '💰 Tarif Kalkulator' },
            { id: 'SATISFACTION', label: '⭐ Kepuasan Pelanggan' },
            { id: 'COMPLAINTS', label: '🚨 Pengaduan Masuk' },
            { id: 'SETTINGS', label: '⚙️ Pengaturan Situs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px 8px 0 0',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-primary-600)' : '#4B5563',
                fontWeight: activeTab === tab.id ? 800 : 600,
                fontSize: '14px',
                cursor: 'pointer',
                borderTop: activeTab === tab.id ? '3px solid var(--color-primary-600)' : '3px solid transparent',
                boxShadow: activeTab === tab.id ? '0 -2px 6px rgba(0,0,0,0.04)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0 0 16px 16px', padding: '30px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #E5E7EB', borderTop: 'none' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
              Memuat data...
            </div>
          ) : (
            <>
              {/* TAB 1: NEWS */}
              {activeTab === 'NEWS' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                      Daftar Publikasi Berita, Agenda & Acara
                    </h4>
                    <button
                      onClick={() => {
                        setEditingNews(null);
                        setNewsForm({
                          title: '',
                          content: '',
                          excerpt: '',
                          category: 'AGENDA',
                          status: 'PUBLISHED',
                          eventDate: '',
                          eventTime: '',
                          eventLocation: '',
                        });
                        setNewsModalOpen(true);
                      }}
                      className="btn btn-style1 btn-sm"
                    >
                      <span>+ Buat Berita Baru</span>
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th>Judul Berita</th>
                          <th>Kategori</th>
                          <th>Tanggal Rilis</th>
                          <th>Status</th>
                          <th>Waktu / Lokasi Agenda</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsList.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <strong>{item.title}</strong>
                            </td>
                            <td>
                              <span className="badge badge-light">{item.category}</span>
                            </td>
                            <td>{formatDate(item.publishedAt)}</td>
                            <td>
                              <span className={`badge ${item.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              {item.eventDate ? (
                                <span style={{ fontSize: '11px', color: '#6B7280' }}>
                                  📅 {formatDate(item.eventDate)} {item.eventLocation && `(${item.eventLocation})`}
                                </span>
                              ) : (
                                '-'
                              )}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                onClick={() => {
                                  setEditingNews(item);
                                  setNewsForm({
                                    title: item.title,
                                    content: item.content,
                                    excerpt: item.excerpt || '',
                                    category: item.category,
                                    status: item.status,
                                    eventDate: item.eventDate ? item.eventDate.slice(0, 10) : '',
                                    eventTime: item.eventTime || '',
                                    eventLocation: item.eventLocation || '',
                                  });
                                  setNewsModalOpen(true);
                                }}
                                className="btn btn-sm btn-outline-primary mr-2"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteNews(item.id)}
                                className="btn btn-sm btn-outline-danger"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: ANNOUNCEMENTS */}
              {activeTab === 'ANNOUNCEMENTS' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                      Daftar Pengumuman Resmi
                    </h4>
                    <button
                      onClick={async () => {
                        const title = prompt('Judul Pengumuman:');
                        if (!title) return;
                        const content = prompt('Isi Pengumuman:');
                        if (!content) return;
                        const isPinned = confirm('Sematkan pengumuman ini di beranda? (Pinned)');
                        await api.post('/announcements/admin/create', { title, content, isPinned });
                        loadCurrentTabData('ANNOUNCEMENTS');
                      }}
                      className="btn btn-style1 btn-sm"
                    >
                      <span>+ Buat Pengumuman Baru</span>
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th>Judul Pengumuman</th>
                          <th>Disematkan (Pinned)</th>
                          <th>Tanggal Rilis</th>
                          <th>Lampiran</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {announcementList.map((item) => (
                          <tr key={item.id}>
                            <td><strong>{item.title}</strong></td>
                            <td>{item.isPinned ? '📌 Ya (Pinned)' : 'Tidak'}</td>
                            <td>{formatDate(item.publishedAt)}</td>
                            <td>{item.attachmentName || '-'}</td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                onClick={async () => {
                                  if (confirm('Hapus pengumuman ini?')) {
                                    await api.delete(`/announcements/admin/${item.id}`);
                                    loadCurrentTabData('ANNOUNCEMENTS');
                                  }
                                }}
                                className="btn btn-sm btn-outline-danger"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: KNOWLEDGE BASE (FAQ) */}
              {activeTab === 'KB' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                        Knowledge Base Chatbot & QnA AI
                      </h4>
                      <small style={{ color: '#6B7280' }}>
                        Basis pengetahuan ini dipakai oleh Robot AI pada Chatbot Widget dan halaman QnA untuk menjawab pertanyaan publik.
                      </small>
                    </div>
                    <button
                      onClick={() => {
                        setEditingKb(null);
                        setKbForm({ question: '', answer: '', tags: '' });
                        setKbModalOpen(true);
                      }}
                      className="btn btn-style1 btn-sm"
                    >
                      <span>+ Tambah Pertanyaan (FAQ)</span>
                    </button>
                  </div>

                  <div className="table-responsive mb-5">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th style={{ width: '30%' }}>Pertanyaan</th>
                          <th style={{ width: '50%' }}>Jawaban AI</th>
                          <th>Kata Kunci / Tag</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kbList.map((item) => (
                          <tr key={item.id}>
                            <td><strong>{item.question}</strong></td>
                            <td style={{ color: '#4B5563' }}>{item.answer}</td>
                            <td><span className="badge badge-light">{item.tags}</span></td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                onClick={() => {
                                  setEditingKb(item);
                                  setKbForm({ question: item.question, answer: item.answer, tags: item.tags || '' });
                                  setKbModalOpen(true);
                                }}
                                className="btn btn-sm btn-outline-primary mr-2"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteKb(item.id)}
                                className="btn btn-sm btn-outline-danger"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Unanswered Questions Log */}
                  <h5 style={{ fontWeight: 800, color: '#B45309', marginBottom: '12px' }}>
                    ⚠️ Log Pertanyaan Pengguna yang Belum Terjawab Otomatis (Perlu Ditambahkan FAQ)
                  </h5>
                  {unansweredList.length === 0 ? (
                    <div style={{ color: '#6B7280', fontSize: '13px' }}>Semua pertanyaan pengguna berhasil dijawab oleh AI.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered" style={{ fontSize: '12px' }}>
                        <thead style={{ backgroundColor: '#FEF3C7' }}>
                          <tr>
                            <th>Pertanyaan dari Pengguna</th>
                            <th>Waktu Ditanyakan</th>
                            <th>Aksi Cepat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unansweredList.map((un) => (
                            <tr key={un.id}>
                              <td>{un.question}</td>
                              <td>{formatDate(un.askedAt)}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    setEditingKb(null);
                                    setKbForm({ question: un.question, answer: '', tags: '' });
                                    setKbModalOpen(true);
                                  }}
                                  className="btn btn-xs btn-outline-primary"
                                  style={{ padding: '2px 6px', fontSize: '11px' }}
                                >
                                  Buat Jawaban FAQ
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: RATES (KALKULATOR) */}
              {activeTab === 'RATES' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                        Kelola Tarif Kalkulator Harga (BPJPH vs LPH UIN SGD)
                      </h4>
                      <small style={{ color: '#6B7280' }}>
                        Seluruh tarif dan aturan hitung tersimpan di database dan dapat diubah sewaktu-waktu tanpa redeploy (Blueprint 7.4).
                      </small>
                    </div>
                    <button
                      onClick={() => {
                        setEditingRate(null);
                        setRateForm({
                          serviceType: 'REGULER',
                          businessScale: 'MIKRO',
                          label: '',
                          bpjphPrice: 0,
                          lphPrice: 0,
                          formulaNotes: '',
                        });
                        setRateModalOpen(true);
                      }}
                      className="btn btn-style1 btn-sm"
                    >
                      <span>+ Tambah Skema Tarif</span>
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th>Skema & Skala</th>
                          <th>Label Layanan</th>
                          <th>Tarif BPJPH</th>
                          <th>Tarif LPH UIN SGD</th>
                          <th>Selisih Penghematan</th>
                          <th>Catatan</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratesList.map((item) => {
                          const diff = item.bpjphPrice - item.lphPrice;
                          const pct = item.bpjphPrice > 0 ? ((diff / item.bpjphPrice) * 100).toFixed(1) : 0;
                          return (
                            <tr key={item.id}>
                              <td>
                                <span className="badge badge-info mr-1">{item.serviceType}</span>
                                <span className="badge badge-secondary">{item.businessScale}</span>
                              </td>
                              <td><strong>{item.label}</strong></td>
                              <td style={{ color: '#6B7280' }}>{formatRupiah(item.bpjphPrice)}</td>
                              <td style={{ fontWeight: 800, color: 'var(--color-secondary-600)' }}>
                                {formatRupiah(item.lphPrice)}
                              </td>
                              <td>
                                <span style={{ color: '#059669', fontWeight: 700 }}>
                                  Hemat {formatRupiah(diff)} ({pct}%)
                                </span>
                              </td>
                              <td style={{ fontSize: '11px', color: '#6B7280' }}>{item.formulaNotes || '-'}</td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <button
                                  onClick={() => {
                                    setEditingRate(item);
                                    setRateForm({
                                      serviceType: item.serviceType,
                                      businessScale: item.businessScale,
                                      label: item.label,
                                      bpjphPrice: item.bpjphPrice,
                                      lphPrice: item.lphPrice,
                                      formulaNotes: item.formulaNotes || '',
                                    });
                                    setRateModalOpen(true);
                                  }}
                                  className="btn btn-sm btn-outline-primary mr-2"
                                  style={{ padding: '2px 8px', fontSize: '12px' }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteRate(item.id)}
                                  className="btn btn-sm btn-outline-danger"
                                  style={{ padding: '2px 8px', fontSize: '12px' }}
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: SATISFACTION */}
              {activeTab === 'SATISFACTION' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                      Hasil Survei Kepuasan Pelanggan
                    </h4>
                    <a
                      href="http://localhost:5000/api/satisfaction/admin/export"
                      download
                      className="btn btn-outline-success btn-sm"
                    >
                      📥 Ekspor ke CSV / Excel
                    </a>
                  </div>

                  {/* Summary Cards */}
                  {satisfactionStats && (
                    <div className="row mb-4">
                      <div className="col-md-3 mb-3">
                        <div style={{ backgroundColor: '#F8F7FF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Rata-rata Rating Umum</span>
                          <h3 style={{ color: 'var(--color-primary-600)', fontWeight: 800, margin: '4px 0 0 0' }}>
                            ⭐ {satisfactionStats.avgOverall} / 5
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div style={{ backgroundColor: '#F8F7FF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Kecepatan Layanan</span>
                          <h3 style={{ color: 'var(--color-secondary-600)', fontWeight: 800, margin: '4px 0 0 0' }}>
                            ⭐ {satisfactionStats.avgSpeed} / 5
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div style={{ backgroundColor: '#F8F7FF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Keramahan Petugas</span>
                          <h3 style={{ color: '#D97706', fontWeight: 800, margin: '4px 0 0 0' }}>
                            ⭐ {satisfactionStats.avgFriendliness} / 5
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div style={{ backgroundColor: '#F8F7FF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Total Responden</span>
                          <h3 style={{ color: '#374151', fontWeight: 800, margin: '4px 0 0 0' }}>
                            {satisfactionStats.total} Orang
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="table-responsive">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th>Pelanggan</th>
                          <th>Layanan</th>
                          <th>Rating Umum</th>
                          <th>Kecepatan</th>
                          <th>Keramahan</th>
                          <th>Komentar / Saran</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {satisfactionList.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <strong>{item.name || 'Anonim'}</strong>
                              {item.contact && <div style={{ fontSize: '11px', color: '#6B7280' }}>{item.contact}</div>}
                            </td>
                            <td>{item.serviceUsed}</td>
                            <td><strong style={{ color: '#F59E0B' }}>⭐ {item.rating}</strong></td>
                            <td>{item.speedRating}/5</td>
                            <td>{item.friendlinessRating}/5</td>
                            <td style={{ color: '#4B5563', fontStyle: 'italic' }}>{item.comment || '-'}</td>
                            <td>{formatDate(item.submittedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: COMPLAINTS */}
              {activeTab === 'COMPLAINTS' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', margin: 0 }}>
                      Daftar Pengaduan & Keluhan Masuk
                    </h4>
                    <a
                      href="http://localhost:5000/api/complaints/admin/export"
                      download
                      className="btn btn-outline-success btn-sm"
                    >
                      📥 Ekspor Pengaduan (CSV)
                    </a>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover" style={{ fontSize: '13px' }}>
                      <thead style={{ backgroundColor: '#F9FAFB' }}>
                        <tr>
                          <th>Kode Tiket</th>
                          <th>Pelapor</th>
                          <th>Kontak</th>
                          <th>Kategori</th>
                          <th>Status</th>
                          <th>Uraian Pengaduan</th>
                          <th>Balasan Admin</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaintList.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span style={{ fontWeight: 800, color: 'var(--color-primary-600)' }}>
                                {item.ticketCode}
                              </span>
                            </td>
                            <td><strong>{item.name}</strong></td>
                            <td>
                              {item.contact} ({item.contactType})
                            </td>
                            <td>{item.category}</td>
                            <td>
                              <span className={`badge ${item.status === 'RESOLVED' ? 'badge-success' : item.status === 'IN_PROGRESS' ? 'badge-info' : 'badge-warning'}`}>
                                {item.status}
                              </span>
                            </td>
                            <td style={{ maxWidth: '240px', color: '#4B5563' }}>{item.description}</td>
                            <td style={{ maxWidth: '200px', fontStyle: 'italic', color: '#059669' }}>
                              {item.adminReply || '-'}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                onClick={() => {
                                  setReplyComplaintModal(item);
                                  setComplaintReplyText(item.adminReply || '');
                                  setComplaintStatusSelect(item.status);
                                }}
                                className="btn btn-sm btn-outline-primary"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                              >
                                Tanggapi / Update
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS */}
              {activeTab === 'SETTINGS' && (
                <div>
                  <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', marginBottom: '20px' }}>
                    Pengaturan Umum Situs & Kontak
                  </h4>

                  <form onSubmit={handleSaveSettings} style={{ maxWidth: '680px' }}>
                    <div className="form-group mb-3">
                      <label style={{ fontWeight: 600, fontSize: '13px' }}>Nama Lembaga</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings['site_name'] || ''}
                        onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                        style={{ borderRadius: '8px' }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ fontWeight: 600, fontSize: '13px' }}>Nomor WhatsApp Admin (Untuk Live Chat & Fallback Bot)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: 6281234567890"
                        value={settings['whatsapp'] || ''}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        style={{ borderRadius: '8px' }}
                      />
                      <small style={{ color: '#6B7280' }}>Gunakan format angka tanpa spasi (diawali 62).</small>
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ fontWeight: 600, fontSize: '13px' }}>Alamat Kantor</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        value={settings['address'] || ''}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        style={{ borderRadius: '8px' }}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Telepon Kantor</label>
                        <input
                          type="text"
                          className="form-control"
                          value={settings['phone'] || ''}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6 form-group mb-3">
                        <label style={{ fontWeight: 600, fontSize: '13px' }}>Email Resmi</label>
                        <input
                          type="email"
                          className="form-control"
                          value={settings['email'] || ''}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-style1" style={{ padding: '10px 24px' }}>
                      <span>Simpan Perubahan Pengaturan</span>
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal: Add/Edit News */}
      {newsModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', marginBottom: '16px' }}>
              {editingNews ? 'Edit Berita' : 'Tambah Berita / Acara Baru'}
            </h4>
            <form onSubmit={handleSaveNews}>
              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Judul Berita</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Kategori</label>
                  <select
                    className="form-control"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                  >
                    <option value="AGENDA">AGENDA</option>
                    <option value="ACARA">ACARA</option>
                    <option value="KEGIATAN">KEGIATAN</option>
                  </select>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Status</label>
                  <select
                    className="form-control"
                    value={newsForm.status}
                    onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value })}
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Tanggal Acara (Opsional)</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newsForm.eventDate}
                    onChange={(e) => setNewsForm({ ...newsForm, eventDate: e.target.value })}
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Waktu Acara (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 09.00 - 12.00 WIB"
                    className="form-control"
                    value={newsForm.eventTime}
                    onChange={(e) => setNewsForm({ ...newsForm, eventTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Lokasi Acara (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Aula Kampus 1 UIN SGD"
                  className="form-control"
                  value={newsForm.eventLocation}
                  onChange={(e) => setNewsForm({ ...newsForm, eventLocation: e.target.value })}
                />
              </div>

              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                />
              </div>

              <div className="form-group mb-4">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Konten Berita (HTML / Teks)</label>
                <textarea
                  rows={6}
                  required
                  className="form-control"
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setNewsModalOpen(false)} className="btn btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn btn-style1">
                  <span>Simpan Berita</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit KB */}
      {kbModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '550px', width: '100%', padding: '30px' }}>
            <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', marginBottom: '16px' }}>
              {editingKb ? 'Edit Pertanyaan FAQ' : 'Tambah FAQ Baru'}
            </h4>
            <form onSubmit={handleSaveKb}>
              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Pertanyaan</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={kbForm.question}
                  onChange={(e) => setKbForm({ ...kbForm, question: e.target.value })}
                />
              </div>

              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Jawaban Resmi AI</label>
                <textarea
                  rows={4}
                  required
                  className="form-control"
                  value={kbForm.answer}
                  onChange={(e) => setKbForm({ ...kbForm, answer: e.target.value })}
                />
              </div>

              <div className="form-group mb-4">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Kata Kunci / Tag (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  placeholder="syarat, umkm, bpjph"
                  className="form-control"
                  value={kbForm.tags}
                  onChange={(e) => setKbForm({ ...kbForm, tags: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setKbModalOpen(false)} className="btn btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn btn-style1">
                  <span>Simpan Entri</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Rate */}
      {rateModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '550px', width: '100%', padding: '30px' }}>
            <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', marginBottom: '16px' }}>
              {editingRate ? 'Edit Skema Tarif' : 'Tambah Skema Tarif Baru'}
            </h4>
            <form onSubmit={handleSaveRate}>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Skema Layanan</label>
                  <select
                    className="form-control"
                    value={rateForm.serviceType}
                    onChange={(e) => setRateForm({ ...rateForm, serviceType: e.target.value })}
                  >
                    <option value="REGULER">REGULER</option>
                    <option value="PERPANJANGAN">PERPANJANGAN</option>
                  </select>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Skala Usaha</label>
                  <select
                    className="form-control"
                    value={rateForm.businessScale}
                    onChange={(e) => setRateForm({ ...rateForm, businessScale: e.target.value })}
                  >
                    <option value="MIKRO">MIKRO</option>
                    <option value="KECIL">KECIL</option>
                    <option value="MENENGAH">MENENGAH</option>
                    <option value="BESAR">BESAR</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Label Tampilan Layanan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Usaha Mikro (Barang Olahan)"
                  className="form-control"
                  value={rateForm.label}
                  onChange={(e) => setRateForm({ ...rateForm, label: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Tarif Acuan BPJPH (Rp)</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={rateForm.bpjphPrice}
                    onChange={(e) => setRateForm({ ...rateForm, bpjphPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label style={{ fontWeight: 600, fontSize: '13px' }}>Tarif LPH UIN SGD (Rp)</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={rateForm.lphPrice}
                    onChange={(e) => setRateForm({ ...rateForm, lphPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Catatan Formula / Keterangan</label>
                <input
                  type="text"
                  className="form-control"
                  value={rateForm.formulaNotes}
                  onChange={(e) => setRateForm({ ...rateForm, formulaNotes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setRateModalOpen(false)} className="btn btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn btn-style1">
                  <span>Simpan Tarif</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reply Complaint */}
      {replyComplaintModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '550px', width: '100%', padding: '30px' }}>
            <h4 style={{ fontWeight: 800, color: 'var(--color-primary-600)', marginBottom: '8px' }}>
              Tindak Lanjut Pengaduan
            </h4>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
              Kode Tiket: <strong>{replyComplaintModal.ticketCode}</strong> dari <strong>{replyComplaintModal.name}</strong>
            </div>

            <form onSubmit={handleSaveComplaintReply}>
              <div className="form-group mb-3">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Ubah Status Pengaduan</label>
                <select
                  className="form-control"
                  value={complaintStatusSelect}
                  onChange={(e) => setComplaintStatusSelect(e.target.value)}
                >
                  <option value="RECEIVED">RECEIVED (Diterima)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Sedang Diproses)</option>
                  <option value="RESOLVED">RESOLVED (Selesai Ditindaklanjuti)</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Balasan / Catatan Resmi Tindak Lanjut Admin</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan respon atau penjelasan solusi untuk pelapor..."
                  className="form-control"
                  value={complaintReplyText}
                  onChange={(e) => setComplaintReplyText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setReplyComplaintModal(null)} className="btn btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn btn-style1">
                  <span>Simpan Tindak Lanjut</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

