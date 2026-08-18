import React from 'react';
import { X, History, Trash2, ArrowLeft, Calendar, UserCheck, Sparkles } from 'lucide-react';
import { TestResult } from '../types';
import { PERSONALITY_TYPES } from '../data/personalityTypes';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TestResult[];
  onSelectResult: (result: TestResult) => void;
  onDeleteResult: (id: string) => void;
  onStartNewTest: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onDeleteResult,
  onStartNewTest
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                سوابق آزمون‌های شما
              </h2>
              <p className="text-xs text-slate-500">
                {history.length > 0 ? `${history.length} نتیجه ذخیره شده در حافظه مرورگر` : 'هنوز تستی ذخیره نشده است'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-history-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <History className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">سابقه‌ای یافت نشد</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  با تکمیل آزمون MBTI، کارنامه و نتایج تحلیلی شما به صورت خودکار در این بخش قابل مشاهده خواهد بود.
                </p>
              </div>
              <button
                id="btn-history-start-test"
                onClick={() => {
                  onClose();
                  onStartNewTest();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>شروع آزمون جدید</span>
              </button>
            </div>
          ) : (
            history.map((item) => {
              const typeDetails = PERSONALITY_TYPES[item.type];
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-lg text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                        {item.type}
                      </span>
                      <span className="font-bold text-slate-800 text-sm">
                        {typeDetails?.titleFa || 'تیپ شخصیتی'}
                      </span>
                      {item.userName && (
                        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {item.userName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      {item.userEmail && <span>ایمیل: {item.userEmail}</span>}
                    </div>

                    {/* Mini Dimension Tags */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1">
                      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {item.dimensions.EI.pole}: {item.dimensions.EI.percentage}٪
                      </span>
                      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {item.dimensions.SN.pole}: {item.dimensions.SN.percentage}٪
                      </span>
                      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {item.dimensions.TF.pole}: {item.dimensions.TF.percentage}٪
                      </span>
                      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {item.dimensions.JP.pole}: {item.dimensions.JP.percentage}٪
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      id={`btn-view-history-${item.id}`}
                      onClick={() => {
                        onSelectResult(item);
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>مشاهده کارنامه</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`btn-delete-history-${item.id}`}
                      onClick={() => onDeleteResult(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="حذف از سوابق"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
