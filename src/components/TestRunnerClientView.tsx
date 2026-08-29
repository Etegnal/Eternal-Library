'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Award,
  Share2,
} from 'lucide-react';

interface Option {
  id: string;
  optionText: string;
  metaphorExplanation: string;
  order: number;
}

interface Question {
  id: string;
  questionText: string;
  order: number;
  options: Option[];
}

interface TestDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  category?: string | null;
  questions: Question[];
}

interface Props {
  test: TestDetail;
}

export default function TestRunnerClientView({ test }: Props) {
  // Step 0: Intro, 1..N: Questions, N+1: Results
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: optionId }

  const questions = test.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = currentStep > 0 && currentStep <= totalQuestions ? questions[currentStep - 1] : null;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const saveTestResultRecord = async () => {
    try {
      const formattedAnswers = questions.map((q) => {
        const selectedOptId = answers[q.id];
        const selectedOpt = q.options.find((opt) => opt.id === selectedOptId);
        return {
          questionText: q.questionText,
          selectedOptionText: selectedOpt?.optionText || 'Seçilmedi',
          metaphorExplanation: selectedOpt?.metaphorExplanation || '',
        };
      });

      await fetch('/api/tests/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: test.id,
          testTitle: test.title,
          answers: formattedAnswers,
        }),
      });
    } catch (e) {
      console.error('Failed to post test record:', e);
    }
  };

  const handleNext = () => {
    if (currentStep < totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    } else {
      saveTestResultRecord();
      setCurrentStep(totalQuestions + 1); // Move to results
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0); // Back to intro
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const isCurrentQuestionAnswered = currentQuestion ? Boolean(answers[currentQuestion.id]) : false;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* BACK TO TESTS CATALOG BUTTON */}
      <div className="flex items-center justify-between">
        <Link
          href="/testler"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 hover:text-white bg-amber-950/80 hover:bg-amber-900 px-3.5 py-1.5 rounded-full border border-amber-700/60 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Psikolojik Testler</span>
        </Link>

        {currentStep > 0 && currentStep <= totalQuestions && (
          <span className="text-xs font-bold font-mono text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/60">
            Soru {currentStep} / {totalQuestions}
          </span>
        )}
      </div>

      {/* STEP 0: INTRO SCREEN */}
      {currentStep === 0 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2A160A]/95 border border-amber-800/60 shadow-2xl text-center space-y-6 relative overflow-hidden text-amber-100">
          {test.coverImage && (
            <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-[#E6D7BC]">
              <img
                src={test.coverImage}
                alt={test.title}
                className="w-full h-full object-cover filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600/40 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>{test.category || 'Psikolojik Test'}</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight drop-shadow-md">
            {test.title}
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-amber-200/90 max-w-2xl mx-auto leading-relaxed">
            "{test.description}"
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] text-[#FEF3C7] text-sm font-bold uppercase tracking-wider shadow-lg transition-all border border-amber-500/50 flex items-center justify-center gap-2 group scale-105"
            >
              <span>Testi Başlat</span>
              <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1..N: QUESTION SCREEN */}
      {currentQuestion && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#2A160A]/95 border border-amber-800/60 shadow-2xl space-y-8 relative text-amber-100">
          {/* PROGRESS BAR */}
          <div className="w-full h-2.5 rounded-full bg-amber-950 overflow-hidden border border-amber-800/60">
            <div
              className="h-full bg-gradient-to-r from-[#9A3412] to-[#78350F] transition-all duration-300"
              style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
            />
          </div>

          {/* QUESTION HEADER */}
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block">
              {currentStep}. Soru
            </span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-white leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* OPTIONS LIST */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-amber-900/90 border-amber-500 text-white shadow-lg scale-[1.01]'
                      : 'bg-amber-950/40 border-amber-800/50 hover:bg-amber-900/40 text-amber-100 hover:border-amber-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                        isSelected
                          ? 'bg-[#9A3412] text-amber-100 border-amber-500'
                          : 'bg-amber-950 text-amber-300 border-amber-700/60'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-serif text-sm sm:text-base leading-normal">
                      {option.optionText}
                    </span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* BOTTOM NAVIGATION */}
          <div className="pt-6 border-t border-amber-900/50 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-xs font-bold border border-amber-700/60 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Soru</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider shadow-md transition-all border border-amber-500/50 flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>{currentStep === totalQuestions ? 'Test Sonucunu Gör' : 'Sonraki Soru'}</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN: METAPHOR & PSYCHOLOGICAL ANALYSIS */}
      {currentStep > totalQuestions && (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2A160A]/95 border border-amber-800/60 shadow-2xl space-y-8 text-amber-100 relative overflow-hidden">
          {/* DECORATIVE TOP BADGE */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-200 flex items-center justify-center mx-auto shadow-lg border border-amber-500/40">
              <Award className="w-8 h-8 text-amber-300" />
            </div>

            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block">
              Test Tamamlandı
            </span>

            <h2 className="font-serif font-bold text-3xl text-white drop-shadow-md">
              Metaforik & Psikolojik Analiziniz
            </h2>

            <p className="font-serif italic text-sm text-amber-200/90 max-w-xl mx-auto leading-relaxed">
              Verdiğiniz yanıtlar doğrultusunda zihninizin ve ruhunuzun seçtiği sembollerin derin açıklamaları aşağıda derlenmiştir.
            </p>
          </div>

          {/* ANSWERS & METAPHORS LIST */}
          <div className="space-y-6 pt-4">
            {questions.map((q, qIdx) => {
              const selectedOptId = answers[q.id];
              const selectedOpt = q.options.find((opt) => opt.id === selectedOptId);

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-amber-800/50 pb-3">
                    <span className="font-serif font-bold text-sm text-white">
                      {qIdx + 1}. Soru: {q.questionText}
                    </span>
                  </div>

                  {selectedOpt ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-200 bg-amber-900/60 px-3 py-1.5 rounded-lg border border-amber-700/60">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Seçiminiz: {selectedOpt.optionText}</span>
                      </div>

                      {selectedOpt.metaphorExplanation ? (
                        <div className="p-4 rounded-xl bg-[#190B05]/90 border border-amber-800/60 space-y-1.5 shadow-inner">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Metafor Analizi</span>
                          </span>
                          <p className="font-serif italic text-sm text-amber-100 leading-relaxed">
                            "{selectedOpt.metaphorExplanation}"
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-amber-200/60 italic">
                          Bu şık için özel bir metafor açıklaması girilmemiş.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-rose-400 italic">
                      Bu soru yanıtlanmadı.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="pt-6 border-t border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-xs font-bold border border-amber-700/60 transition-colors flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-amber-800" />
              <span>Testi Yeniden Çöz</span>
            </button>

            <Link
              href="/testler"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider shadow-md transition-all border border-amber-500/50 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Diğer Testleri İncele</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
