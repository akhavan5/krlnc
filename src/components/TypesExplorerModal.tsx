import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowLeft, Users, Briefcase, Award, Heart, CheckCircle2 } from 'lucide-react';
import { PersonalityTypeDetails, PersonalityGroup } from '../types';
import { PERSONALITY_TYPES } from '../data/personalityTypes';

interface TypesExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GROUPS: { key: PersonalityGroup; titleFa: string; color: string; desc: string }[] = [
  {
    key: 'analysts',
    titleFa: 'تحلیل‌گران (Analysts)',
    color: 'from-purple-600 to-indigo-700',
    desc: 'تفکر استراتژیک، منطق‌گرایی، خوداتکایی و حل معماهای پیچیده'
  },
  {
    key: 'diplomats',
    titleFa: 'دیپلمات‌ها (Diplomats)',
    color: 'from-emerald-600 to-teal-700',
    desc: 'همدلی، آرمان‌گرایی، اصالت روحی و الهام‌بخشی به انسان‌ها'
  },
  {
    key: 'sentinels',
    titleFa: 'نگهبانان (Sentinels)',
    color: 'from-blue-600 to-cyan-700',
    desc: 'نظم، مسئولیت‌پذیری، پایبندی به اصول و حفظ ثبات جامعه'
  },
  {
    key: 'explorers',
    titleFa: 'کاوشگران (Explorers)',
    color: 'from-amber-500 to-orange-600',
    desc: 'انعطاف‌پذیری، زندگی در لحظه، چابکی عملی و ذوق حسی و هنری'
  }
];

export const TypesExplorerModal: React.FC<TypesExplorerModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<PersonalityTypeDetails | null>(null);

  if (!isOpen) return null;

  const allTypes = Object.values(PERSONALITY_TYPES);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                راهنمای جامع ۱۶ تیپ شخصیتی MBTI
              </h2>
              <p className="text-xs text-slate-500">برای مشاهده جزئیات کامل روی هر تیپ کلیک کنید</p>
            </div>
          </div>

          <button
            id="btn-close-explorer-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          {GROUPS.map((group) => {
            const typesInGroup = allTypes.filter((t) => t.group === group.key);
            return (
              <div key={group.key} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${group.color}`} />
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{group.titleFa}</h3>
                    <p className="text-xs text-slate-500">{group.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {typesInGroup.map((type) => (
                    <button
                      key={type.code}
                      id={`btn-type-card-${type.code}`}
                      onClick={() => setSelectedType(type)}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-right group flex flex-col justify-between space-y-3 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {type.code}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${type.groupColor.badgeBg}`}>
                            {type.titleEn}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">{type.titleFa}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {type.tagline}
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 pt-1">
                        <span>مشاهده جزئیات کامل</span>
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nested Type Details Sub-Modal */}
      <AnimatePresence>
        {selectedType && (
          <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Detail Header */}
              <div className="p-6 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-mono text-slate-900">{selectedType.code}</span>
                    <span className="text-lg font-extrabold text-slate-800">- {selectedType.titleFa}</span>
                  </div>
                  <p className="text-xs text-slate-500">{selectedType.tagline}</p>
                </div>
                <button
                  id="btn-close-type-detail"
                  onClick={() => setSelectedType(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-base">درباره این تیپ:</h4>
                  <p className="leading-relaxed text-justify">{selectedType.summary}</p>
                  <p className="leading-relaxed text-justify pt-1">{selectedType.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <h5 className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>نقاط قوت اصلی</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedType.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      <span>مشاغل ایده‌آل</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedType.careerPaths.map((c, idx) => (
                        <li key={idx}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-150 space-y-2">
                  <h5 className="font-bold text-purple-900 text-xs flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>مشاهیر و شخصیت‌های هم‌تیپ</span>
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedType.famousPeople.map((p, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-white border border-purple-100">
                        <span className="font-bold text-slate-800 block">{p.name}</span>
                        <span className="text-[11px] text-slate-500">{p.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
