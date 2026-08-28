'use client';

import React, { useState } from 'react';
import { X, Mail, Send, Check, Loader2, ShieldAlert, Sparkles } from 'lucide-react';

interface SendEmailModalProps {
  initialRecipientEmail?: string;
  initialRecipientName?: string;
  onClose: () => void;
}

export default function SendEmailModal({
  initialRecipientEmail = 'erenaoyunda@gmail.com',
  initialRecipientName = 'Yasin Eren',
  onClose,
}: SendEmailModalProps) {
  const [recipientEmail, setRecipientEmail] = useState(initialRecipientEmail);
  const [recipientName, setRecipientName] = useState(initialRecipientName);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [statusResult, setStatusResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSending(true);
    setStatusResult(null);

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusResult({
          success: true,
          message: data.message || `E-posta başarıyla iletildi! (${data.deliveredTo?.join(', ')})`,
        });
      } else {
        setStatusResult({
          success: false,
          message: data.error || data.message || 'E-posta gönderimi başarısız oldu.',
        });
      }
    } catch (err: any) {
      setStatusResult({
        success: false,
        message: 'Ağ hatası oluştu, e-posta gönderilemedi.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="bg-[#FFFDF9] border-2 border-[#E6D7BC] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="p-6 bg-[#FEFBF3] border-b border-[#E6D7BC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center shadow-fire border border-amber-500/40">
              <Mail className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#362215]">
                E-Posta Gönderici
              </h3>
              <p className="text-xs text-[#5C4033] font-sans">
                Kullanıcıya veya topluluğa özel e-posta iletisi gönderin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-amber-900 hover:bg-amber-100/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LIVE SYSTEM BANNER */}
        <div className="px-6 py-3 bg-emerald-100/80 border-b border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Canlı E-Posta Sistemi Aktif:</strong> E-postanız doğrudan seçilen alıcının (veya 'all' yazıldığında <strong>tüm kayıtlı kullanıcıların</strong>) e-posta adresine iletilecektir.
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Recipient Selection */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#78350F] uppercase tracking-wider">
              Alıcı E-Posta Adresi
            </label>
            <input
              type="text"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Örn: erenaoyunda@gmail.com veya 'all' (Tüm Üyeler)"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#FEFBF3] border border-[#E6D7BC] text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600 shadow-sm"
            />
          </div>

          {/* Subject Line */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#78350F] uppercase tracking-wider">
              E-Posta Konusu
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Örn: Eternal Library'den Özel Bildirim..."
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#FEFBF3] border border-[#E6D7BC] text-xs text-[#362215] font-serif focus:outline-none focus:border-amber-600 shadow-sm"
            />
          </div>

          {/* Message Body */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#78350F] uppercase tracking-wider">
              Mesaj İçeriği
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kullanıcıya iletmek istediğiniz özel mesajınızı buraya yazın..."
              required
              className="w-full p-4 rounded-xl bg-[#FEFBF3] border border-[#E6D7BC] text-xs text-[#362215] font-serif leading-relaxed focus:outline-none focus:border-amber-600 shadow-sm resize-none"
            />
          </div>

          {/* STATUS RESULT NOTIFICATION */}
          {statusResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                statusResult.success
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-rose-100 text-rose-900 border-rose-300'
              }`}
            >
              {statusResult.success ? <Check className="w-4 h-4 text-emerald-700" /> : <ShieldAlert className="w-4 h-4 text-rose-700" />}
              <span>{statusResult.message}</span>
            </div>
          )}

          {/* BUTTONS */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-amber-100/60 hover:bg-amber-100 text-[#78350F] font-bold text-xs border border-amber-200 transition-colors cursor-pointer"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              disabled={sending}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center justify-center gap-2 border border-amber-500/40 cursor-pointer"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>E-Postayı Gönder</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
