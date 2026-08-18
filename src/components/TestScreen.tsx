import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { Question, LikertScore } from '../types';
import { LIKERT_OPTIONS } from '../data/questions';

interface TestScreenProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, LikertScore>;
  onAnswer: (questionId: number, value: LikertScore) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  userName?: string;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  questions,
  currentIndex,
  answers,
  onAnswer,
  onPrevious,
  onNext,
  onFinish,
  userName
}) => {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion?.id];
  const isAnswered = currentAnswer !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Handle option selection
  const handleSelectOption = (value: LikertScore) => {
    onAnswer(currentQuestion.id, value);
    // Auto advance after slight delay for visual feedback if not last
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        onNext();
      }
    }, 280);
  };

  // Keyboard navigation support (1 to 7 keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (LIKERT_OPTIONS[index]) {
          handleSelectOption(LIKERT_OPTIONS[index].value);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        if (currentIndex > 0) onPrevious();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        if (currentIndex < totalQuestions - 1 && isAnswered) onNext();
      }
    },
    [currentIndex, isAnswered, totalQuestions, currentQuestion]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      {/* Top Progress & Status */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2 text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>سوال {currentIndex + 1} از {totalQuestions}</span>
            {userName && <span className="text-slate-400 font-normal">| {userName}</span>}
          </div>
          <div className="text-slate-500 font-medium">
            {answeredCount} پاسخ داده شده ({Math.round((answeredCount / totalQuestions) * 100)}٪)
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-l from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>دسته‌بندی: {currentQuestion.categoryTitle}</span>
          <span className="hidden sm:inline">راهنما: می‌توانید از کلیدهای ۱ تا ۷ کیبورد نیز استفاده کنید</span>
        </div>
      </div>

      {/* Main Question Card with Motion */}
      <div className="relative min-h-[360px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100 border border-slate-200 space-y-8 flex-1 flex flex-col justify-between"
          >
            {/* Question Text */}
            <div className="text-center space-y-4 pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {currentQuestion.categoryTitle}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 leading-snug px-2">
                «{currentQuestion.text}»
              </h2>
            </div>

            {/* Likert Scale Choices */}
            <div className="space-y-4">
              {/* Desktop / Tablet Horizontal Scale */}
              <div className="pt-4 pb-2">
                {/* Range Pole Labels */}
                <div className="flex justify-between items-center px-2 mb-4 text-xs sm:text-sm font-bold">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    موافقم
                  </span>
                  <span className="text-slate-400 text-xs font-normal">خنثی / بدون نظر</span>
                  <span className="text-rose-700 flex items-center gap-1">
                    مخالفم
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </span>
                </div>

                {/* Circles Bar Container */}
                <div className="flex items-center justify-between gap-1 sm:gap-2 px-1 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                  {LIKERT_OPTIONS.map((opt, idx) => {
                    const isSelected = currentAnswer === opt.value;
                    return (
                      <button
                        key={opt.value}
                        id={`btn-option-${currentQuestion.id}-${opt.value}`}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`group relative flex flex-col items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none`}
                        title={`${opt.labelFa} (کلید ${idx + 1})`}
                      >
                        <div
                          className={`
                            ${opt.size} rounded-full flex items-center justify-center transition-all duration-200
                            border-2 font-bold text-xs sm:text-sm
                            ${
                              isSelected
                                ? `${opt.colorClass} shadow-md scale-110 ring-4 ring-offset-2 ${opt.ringClass}`
                                : 'bg-white border-slate-300 text-slate-400 hover:border-slate-400 hover:scale-105 group-hover:bg-slate-50'
                            }
                          `}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                          {!isSelected && (
                            <span className="text-[10px] text-slate-300 group-hover:text-slate-500 transition-colors">
                              {idx + 1}
                            </span>
                          )}
                        </div>

                        {/* Hover/Active label */}
                        <span
                          className={`text-[10px] sm:text-xs mt-2 text-center whitespace-nowrap transition-colors hidden md:block ${
                            isSelected ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'
                          }`}
                        >
                          {opt.labelFa}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile option label helper */}
                {isAnswered && (
                  <div className="md:hidden text-center mt-3 text-xs font-bold text-indigo-700 bg-indigo-50/70 py-1.5 px-3 rounded-lg">
                    انتخاب شما: {LIKERT_OPTIONS.find((o) => o.value === currentAnswer)?.labelFa}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions inside Card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                id="btn-prev-question"
                onClick={onPrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-slate-100 active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>سوال قبلی</span>
              </button>

              {isLastQuestion ? (
                <button
                  id="btn-finish-test"
                  onClick={onFinish}
                  disabled={!isAnswered}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
                    isAnswered
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>مشاهده نتیجه تست</span>
                </button>
              ) : (
                <button
                  id="btn-next-question"
                  onClick={onNext}
                  disabled={!isAnswered}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isAnswered
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md active:scale-95 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>سوال بعدی</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Question Jump Dots */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-600">
          <span>نقشه سوالات:</span>
          <span>{answeredCount} از {totalQuestions} پاسخ</span>
        </div>
        <div className="grid grid-cols-14 sm:grid-cols-28 gap-1">
          {questions.map((q, idx) => {
            const hasAns = answers[q.id] !== undefined;
            const isCurr = idx === currentIndex;
            return (
              <button
                key={q.id}
                id={`btn-dot-question-${q.id}`}
                onClick={() => {
                  // Direct jump
                  const diff = idx - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                  }
                }}
                className={`h-6 rounded-md text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurr
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1 scale-110 z-10'
                    : hasAns
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={`رفتن به سوال ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
