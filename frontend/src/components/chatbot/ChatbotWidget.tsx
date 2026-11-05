import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  sender: 'BOT' | 'USER' | 'ADMIN';
  text: string;
  time: string;
  canContactAdmin?: boolean;
  waUrl?: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'BOT',
      text: 'Halo! Selamat datang di layanan informasi LPH UIN Sunan Gunung Djati Bandung. Ada yang bisa kami bantu seputar pendaftaran, persyaratan dokumen, atau tarif sertifikasi halal?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Connect socket if switching to Live Chat
  useEffect(() => {
    if (isLiveMode && !socket) {
      const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
      const s = io(socketUrl);
      s.emit('start_user_chat', { sessionId, userLabel: 'Tamu Website' });

      s.on('live_chat_connected', (data: { isAdminOnline: boolean; message: string }) => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'conn_' + Date.now(),
            sender: 'ADMIN',
            text: data.message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      });

      s.on('new_message', (msg: { sender: string; content: string }) => {
        if (msg.sender === 'ADMIN') {
          setMessages((prev) => [
            ...prev,
            {
              id: 'admin_' + Date.now(),
              sender: 'ADMIN',
              text: msg.content,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }
      });

      setSocket(s);

      return () => {
        s.disconnect();
      };
    }
  }, [isLiveMode]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      sender: 'USER',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    if (isLiveMode && socket) {
      socket.emit('user_send_message', { sessionId, content: query });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/chat/ask', { question: query, sessionId });
      const data = res.data;

      const botMsg: Message = {
        id: 'bot_' + Date.now(),
        sender: 'BOT',
        text: data.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        canContactAdmin: data.canContactAdmin,
        waUrl: data.waUrl,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'BOT',
          text: 'Mohon maaf, koneksi ke asisten AI sedang mengalami gangguan. Anda dapat menghubungi admin kami melalui WhatsApp.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          canContactAdmin: true,
          waUrl: 'https://wa.me/6281234567890',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div
        id="floating-whatsapp"
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: 'var(--color-primary-600)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            boxShadow: '0 8px 24px rgba(39, 35, 83, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'transform 0.2s, background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-700)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-600)')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>
            {isOpen ? 'Tutup Asisten' : 'Konsultasi Halal AI'}
          </span>
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div
            style={{
              width: '360px',
              maxWidth: '90vw',
              height: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: 'var(--color-primary-600)',
                color: '#FFFFFF',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  AI
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Asisten Halal LPH UIN SGD</div>
                  <div style={{ fontSize: '11px', opacity: 0.85 }}>
                    {isLiveMode ? '🟢 Terhubung ke Live Admin' : '🤖 Asisten Penjawab Otomatis'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Banner */}
            <div
              style={{
                backgroundColor: '#F8F7FF',
                padding: '8px 16px',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <span style={{ color: '#4B5563' }}>
                {isLiveMode ? 'Sedang Live Chat' : 'Mode Asisten Cerdas'}
              </span>
              {!isLiveMode ? (
                <button
                  onClick={() => setIsLiveMode(true)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-primary-600)',
                    color: 'var(--color-primary-600)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    padding: '2px 8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Hubungkan ke Admin Live
                </button>
              ) : (
                <button
                  onClick={() => setIsLiveMode(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #9CA3AF',
                    color: '#6B7280',
                    borderRadius: '4px',
                    fontSize: '11px',
                    padding: '2px 8px',
                    cursor: 'pointer',
                  }}
                >
                  Kembali ke AI
                </button>
              )}
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#FAFAFA',
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'USER' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '10px 14px',
                      borderRadius:
                        m.sender === 'USER' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      backgroundColor:
                        m.sender === 'USER'
                          ? 'var(--color-primary-600)'
                          : m.sender === 'ADMIN'
                          ? 'var(--color-secondary-500)'
                          : '#FFFFFF',
                      color: m.sender === 'USER' || m.sender === 'ADMIN' ? '#FFFFFF' : '#1F2937',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      border: m.sender === 'BOT' ? '1px solid #E5E7EB' : 'none',
                    }}
                  >
                    {m.text}

                    {/* Fallback buttons if AI can't answer confidently */}
                    {m.canContactAdmin && (
                      <div
                        style={{
                          marginTop: '10px',
                          paddingTop: '8px',
                          borderTop: '1px dashed #D1D5DB',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <button
                          onClick={() => setIsLiveMode(true)}
                          className="btn btn-sm btn-outline-primary"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                        >
                          💬 Buka Live Chat Admin
                        </button>
                        {m.waUrl && (
                          <a
                            href={m.waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#25D366',
                              color: '#fff',
                              fontSize: '11px',
                              padding: '4px 8px',
                              textDecoration: 'none',
                              textAlign: 'center',
                            }}
                          >
                            🟢 Lanjut ke WhatsApp Admin
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>
                    {m.time}
                  </span>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-start', color: '#6B7280', fontSize: '12px' }}>
                  ⏳ Asisten sedang mengetik...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              style={{
                display: 'flex',
                padding: '12px',
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                gap: '8px',
              }}
            >
              <input
                type="text"
                placeholder={
                  isLiveMode ? 'Kirim pesan ke admin...' : 'Ketik pertanyaan seputar halal...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: '1px solid #D1D5DB',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  backgroundColor: 'var(--color-primary-600)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.6 : 1,
                }}
              >
                ➔
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

