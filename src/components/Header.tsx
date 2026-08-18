import React from 'react';
import { Compass, History, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenExplorer: () => void;
  onGoHome: () => void;
  historyCount: number;
  currentScreen: 'start' | 'test' | 'result';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenExplorer,
  onGoHome,
  historyCount,
  currentScreen
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="btn-header-home"
          onClick={onGoHome}
          className="flex items-center gap-3 group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>تست شخصیت‌شناسی</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase">
                MBTI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">کشف کهن‌الگو، ابعاد درونی و نقشه راه رشد فردی</p>
          </div>
        </button>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-open-explorer"
            onClick={onOpenExplorer}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            title="مشاهده همه ۱۶ تیپ شخصیتی"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">۱۶ تیپ شخصیتی</span>
            <span className="sm:hidden">تیپ‌ها</span>
          </button>

          <button
            id="btn-open-history"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors relative"
            title="نتایج ذخیره شده"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">نتایج من</span>
            <span className="sm:hidden">نتایج</span>
            {historyCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-indigo-600 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {currentScreen === 'test' && (
            <button
              id="btn-header-quit-test"
              onClick={onGoHome}
              className="text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
            >
              خروج از آزمون
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
