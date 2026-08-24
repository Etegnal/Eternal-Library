'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId, title }: { postId: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${title}" başlıklı içeriği silmek istediğinize emin misiniz?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Silme işlemi esnasında hata oluştu.');
      }
    } catch (e) {
      console.error(e);
      alert('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-100 transition-colors"
      title="İçeriği Sil"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
