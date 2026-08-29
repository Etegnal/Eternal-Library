'use client';

import React, { useState, useEffect } from 'react';
import {
  Brain,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface OptionInput {
  optionText: string;
  metaphorExplanation: string;
}

interface QuestionInput {
  questionText: string;
  options: OptionInput[];
}

interface TestData {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  category?: string | null;
  createdAt: string;
  questions: {
    id: string;
    questionText: string;
    order: number;
    options: {
      id: string;
      optionText: string;
      metaphorExplanation: string;
      order: number;
    }[];
  }[];
}

export default function AdminTestsManager() {
  const [tests, setTests] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Psikolojik Test');
  const [questions, setQuestions] = useState<QuestionInput[]>([
    {
      questionText: '',
      options: [
        { optionText: '', metaphorExplanation: '' },
        { optionText: '', metaphorExplanation: '' },
      ],
    },
  ]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tests');
      if (res.ok) {
        const data = await res.json();
        setTests(data);
      }
    } catch (e) {
      console.error('Error fetching tests:', e);
    } finally {
      setLoading(false);
    }
  };

  const openNewTestModal = () => {
    setEditingTestId(null);
    setTitle('');
    setDescription('');
    setCoverImage('');
    setCategory('Psikolojik Test');
    setQuestions([
      {
        questionText: '1. Ormanda yürürken karşınıza ilk ne çıkıyor?',
        options: [
          {
            optionText: 'A) Derin ve karanlık bir patika',
            metaphorExplanation: 'Patika, hayat yolculuğunuzdaki belirsizliklere karşı cesaretinizi temsil eder.',
          },
          {
            optionText: 'B) Berrak ve sakin bir dere',
            metaphorExplanation: 'Dere, zihninizin berraklığını ve duygusal dengenizi simgeler.',
          },
        ],
      },
    ]);
    setMessage(null);
    setShowModal(true);
  };

  const openEditTestModal = (test: TestData) => {
    setEditingTestId(test.id);
    setTitle(test.title);
    setDescription(test.description);
    setCoverImage(test.coverImage || '');
    setCategory(test.category || 'Psikolojik Test');
    setQuestions(
      test.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((opt) => ({
          optionText: opt.optionText,
          metaphorExplanation: opt.metaphorExplanation,
        })),
      }))
    );
    setMessage(null);
    setShowModal(true);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: [
          { optionText: '', metaphorExplanation: '' },
          { optionText: '', metaphorExplanation: '' },
        ],
      },
    ]);
  };

  const removeQuestion = (qIndex: number) => {
    if (questions.length <= 1) {
      alert('Test en az 1 soru içermelidir.');
      return;
    }
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ optionText: '', metaphorExplanation: '' });
    setQuestions(updated);
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    if (questions[qIndex].options.length <= 1) {
      alert('Bir soru en az 1 şık içermelidir.');
      return;
    }
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, idx) => idx !== optIndex);
    setQuestions(updated);
  };

  const handleQuestionTextChange = (qIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].questionText = text;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, field: 'optionText' | 'metaphorExplanation', value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex][field] = value;
    setQuestions(updated);
  };

  const handleSaveTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage({ type: 'error', text: 'Lütfen test başlığı ve açıklamasını doldurun.' });
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        setMessage({ type: 'error', text: `${i + 1}. sorunun metni boş bırakılamaz.` });
        return;
      }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].optionText.trim()) {
          setMessage({ type: 'error', text: `${i + 1}. sorunun ${j + 1}. şık metni boş olamaz.` });
          return;
        }
      }
    }

    setSaving(true);
    setMessage(null);

    const payload = {
      title,
      description,
      coverImage: coverImage.trim() || null,
      category,
      questions,
    };

    try {
      const url = editingTestId ? `/api/admin/tests/${editingTestId}` : '/api/admin/tests';
      const method = editingTestId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: editingTestId ? 'Test başarıyla güncellendi!' : 'Yeni test başarıyla oluşturuldu!' });
        fetchTests();
        setTimeout(() => {
          setShowModal(false);
        }, 1200);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'İşlem başarısız oldu.' });
      }
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Sunucuyla bağlantı kurulamadı.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTest = async (id: string, testTitle: string) => {
    if (!confirm(`"${testTitle}" psikolojik testini silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/tests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTests(tests.filter((t) => t.id !== id));
      } else {
        alert('Test silinirken hata oluştu.');
      }
    } catch (e) {
      console.error(e);
      alert('Sunucu hatası.');
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-sm">
            <Brain className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-[#362215]">
              Psikolojik Testler Yönetimi
            </h2>
            <p className="text-xs text-[#78350F] font-sans">
              Yeni psikolojik testler ekleyin, soruları kurgulayın ve şıkların metaforik analizlerini tanımlayın.
            </p>
          </div>
        </div>

        <button
          onClick={openNewTestModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9A3412] to-[#78350F] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 shadow-md transition-all shrink-0 border border-amber-500/50"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Test Ekle</span>
        </button>
      </div>

      {/* TESTS GRID / TABLE */}
      {loading ? (
        <div className="text-center py-12 text-stone-500 font-serif text-sm">
          Psikolojik testler yükleniyor...
        </div>
      ) : tests.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#FFFDF9] border border-dashed border-amber-300 space-y-3">
          <Brain className="w-12 h-12 mx-auto text-amber-700/40" />
          <p className="font-serif text-[#5C4033] font-medium">
            Henüz eklenmiş psikolojik test bulunmuyor.
          </p>
          <button
            onClick={openNewTestModal}
            className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 border border-amber-300 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            İlk Testi Ekleyin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {test.category || 'Psikolojik Test'}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {new Date(test.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#362215] line-clamp-1">
                  {test.title}
                </h3>

                <p className="text-xs text-[#5C4033] line-clamp-2 leading-relaxed">
                  {test.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6D7BC]/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>{test.questions?.length || 0} Soru İçeriyor</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditTestModal(test)}
                    className="p-2 rounded-lg text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors text-xs font-semibold flex items-center gap-1"
                    title="Düzenle"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    onClick={() => handleDeleteTest(test.id, test.title)}
                    className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors text-xs font-semibold flex items-center gap-1"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-2xl space-y-6 p-6 sm:p-8 my-8 text-[#362215]">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300">
                  <Brain className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#362215]">
                    {editingTestId ? 'Psikolojik Testi Düzenle' : 'Yeni Psikolojik Test Ekle'}
                  </h3>
                  <p className="text-xs text-[#78350F]">
                    Soruları ve her şıkka ait metaforik açıklama metinlerini girin.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-stone-500 hover:text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STATUS MESSAGE */}
            {message && (
              <div
                className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  message.type === 'success'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSaveTest} className="space-y-6">
              {/* TEST METADATA SECTION */}
              <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#78350F] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Test Genel Bilgileri</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#78350F]">
                      Test Başlığı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ruhun Aynası: İçsel Yolculuk Testi"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#78350F]">
                      Kategori
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Karakter Analizi, Metaforik Test"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#78350F]">
                    Giriş Açıklama Metni *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Bu test kullanıcılara ne sunuyor? Girişte ne okuyacaklar?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#78350F]">
                    Kapak Görseli URL (Opsiyonel)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* QUESTIONS SECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#78350F] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Sorular ve Şıklar / Metafor Açıklamaları</span>
                  </h4>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Soru Ekle</span>
                  </button>
                </div>

                {questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="p-5 rounded-xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-4 relative"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E6D7BC]/60">
                      <span className="font-serif font-bold text-xs text-amber-950 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                        {qIndex + 1}. Soru
                      </span>

                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Soruyu Sil</span>
                      </button>
                    </div>

                    {/* QUESTION TEXT INPUT */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#78350F]">
                        Soru Metni
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={`Örn: ${qIndex + 1}. Ormanda ilerlerken önünüze ne çıkıyor?`}
                        value={q.questionText}
                        onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600 font-serif"
                      />
                    </div>

                    {/* OPTIONS OF THIS QUESTION */}
                    <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-amber-300">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#5C4033] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                          <span>Şıklar ve Metafor Açıklamaları</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="text-[11px] font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 border border-amber-300"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Şık Ekle</span>
                        </button>
                      </div>

                      {q.options.map((opt, optIndex) => (
                        <div
                          key={optIndex}
                          className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200/80 space-y-2.5 relative"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-amber-800">
                              Şık {String.fromCharCode(65 + optIndex)}
                            </span>

                            {q.options.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeOption(qIndex, optIndex)}
                                className="text-[11px] text-rose-700 hover:text-rose-900 flex items-center gap-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Şıkkı Sil</span>
                              </button>
                            )}
                          </div>

                          <div className="space-y-1">
                            <input
                              type="text"
                              required
                              placeholder={`Örn: ${String.fromCharCode(65 + optIndex)}) Derin ve sessiz bir nehir.`}
                              value={opt.optionText}
                              onChange={(e) =>
                                handleOptionChange(qIndex, optIndex, 'optionText', e.target.value)
                              }
                              className="w-full px-3 py-1.5 rounded-md bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-amber-900/90">
                              💡 Metafor Açıklama Metni (Kullanıcı bu şıkkı seçerse okuyacağı analiz)
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Bu şıkkı seçtiyseniz: Nehir zihninizin bilinçaltı derinliğini ve sakin kalma arzunuzu simgeler..."
                              value={opt.metaphorExplanation}
                              onChange={(e) =>
                                handleOptionChange(qIndex, optIndex, 'metaphorExplanation', e.target.value)
                              }
                              className="w-full px-3 py-1.5 rounded-md bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] focus:outline-none focus:border-amber-600 font-serif italic"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL FOOTER */}
              <div className="pt-4 border-t border-[#E6D7BC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9A3412] to-[#78350F] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 shadow-md transition-all border border-amber-500/50 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Kaydediliyor...' : 'Testi Kaydet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
