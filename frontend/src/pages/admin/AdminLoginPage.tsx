import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@lph-uinsgd.ac.id');
  const [password, setPassword] = useState('admin123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('lph_admin_token', res.data.token);
        localStorage.setItem('lph_admin_user', JSON.stringify(res.data.user));
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F7FF',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(39,35,83,0.08)',
          padding: '40px',
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-600)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '24px',
              marginBottom: '16px',
            }}
          >
            LPH
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-primary-600)', margin: '0 0 6px 0' }}>
            Portal Petugas Admin
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            LPH UIN Sunan Gunung Djati Bandung
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ fontSize: '13px', borderRadius: '8px', padding: '10px 14px' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label style={{ fontWeight: 600, fontSize: '13px' }}>Email Petugas</label>
            <input
              type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ fontWeight: 600, fontSize: '13px' }}>Kata Sandi</label>
            <input
              type="password"
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-style1 btn-block"
            style={{ width: '100%', padding: '12px', fontSize: '15px' }}
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Admin Panel'}</span>
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#9CA3AF' }}>
          Akses terbatas hanya untuk staf & auditor resmi LPH UIN SGD.
        </div>
      </div>
    </div>
  );
};

