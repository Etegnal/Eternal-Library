'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteLetterButtonProps {
  letterId: string;
  subject: string;
}

export default function DeleteLetterButton({ letterId, subject }: DeleteLetterButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${subject}" konusunu içeren mektubu silmek istediğinize emin misiniz?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/letters/${letterId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Mektup silinemedi.');
      } else {
        router.refresh();
      }
    } catch (err) {
      alert('Silme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-xl text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
      title="Mektubu Sil"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-red-600" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
