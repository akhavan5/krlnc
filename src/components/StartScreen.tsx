import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Brain, 
  Users, 
  Eye, 
  HeartHandshake, 
  Compass, 
  Play, 
  RotateCcw,
  UserCheck
} from 'lucide-react';
import { DIMENSIONS_INFO } from '../data/personalityTypes';

interface StartScreenProps {
  onStartTest: (userName?: string) => void;
  onResumeTest?: () => void;
  hasResumeProgress: boolean;
  onOpenExplorer: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartTest,
  onResumeTest,
  hasResumeProgress,
  onOpenExplorer
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartTest(name);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>بر اساس استاندارد ۱۶ تیپ شخصیتی مایرز-بریگز (MBTI)</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight"
        >
          شخصیت واقعی خود را <span className="bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">کشف کنید</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          تنها با پاسخ به ۲۸ پرسش استاندارد در کمتر از ۷ دقیقه، ابعاد روانی، نقاط قوت، کهن‌الگوی رفتاری و مشاغل ایده‌آل متناسب با تیپ شخصیتی‌تان را بشناسید.
        </motion.p>
      </div>

      {/* Start / Action Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-slate-150 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="max-w-md mx-auto space-y-2">
              <label htmlFor="user-name-input" className="block text-sm font-semibold text-slate-700 text-right">
                نام یا عنوان شما (اختیاری):
              </label>
              <div className="relative">
                <input
                  id="user-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: سارا، علی..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 text-sm transition-all text-right placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                  maxLength={40}
                />
                <UserCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xs text-slate-500 text-right">
                در صورت تمایل نام شما در کارنامه و فایل خروجی نتیجه آزمون درج خواهد شد.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                id="btn-start-test"
                type="submit"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>شروع آزمون رایگان</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              {hasResumeProgress && onResumeTest && (
                <button
                  id="btn-resume-test"
                  type="button"
                  onClick={onResumeTest}
                  className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="ادامه از آخرین سوال پاسخ داده شده"
                >
                  <RotateCcw className="w-4 h-4 text-indigo-600" />
                  <span>ادامه آزمون نیمه‌کاره</span>
                </button>
              )}
            </div>
          </form>

          {/* Quick Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-150 text-xs text-slate-600">
            <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>مدت زمان: حدود ۵ الی ۷ دقیقه</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>کاملاً محرمانه و بدون نیاز به ورود</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>تحلیل دقیق ۴ بعد و ۱۶ کهن‌الگو</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Dimensions Explanation Bento */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            ۴ محور کلیدی ارزیابی شخصیت
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            تست مایرز-بریگز نحوه درک جهان، تصمیم‌گیری و سبک زندگی شما را در ۴ بعد بررسی می‌کند:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Axis 1: E vs I */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  E / I
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {DIMENSIONS_INFO.EI.titleFa}
                </h3>
              </div>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-indigo-700 block mb-1">برون‌گرا (E)</span>
                <p className="text-slate-600 leading-snug">کسب انرژی از جمع، فعالیت‌های بیرونی و ارتباطات فعال</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-purple-700 block mb-1">درون‌گرا (I)</span>
                <p className="text-slate-600 leading-snug">کسب انرژی از خلوت، تعمق ذهنی و گروه‌های کوچک صمیمی</p>
              </div>
            </div>
          </div>

          {/* Axis 2: S vs N */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  S / N
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {DIMENSIONS_INFO.SN.titleFa}
                </h3>
              </div>
              <Eye className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">حسی (S)</span>
                <p className="text-slate-600 leading-snug">تمرکز بر حقایق عینی، داده‌های ملموس و شواهد تجربی زمان حال</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-teal-700 block mb-1">شهودی (N)</span>
                <p className="text-slate-600 leading-snug">تمرکز بر مفاهیم کلان، الگوهای پنهان و احتمالات و آینده‌نگری</p>
              </div>
            </div>
          </div>

          {/* Axis 3: T vs F */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                  T / F
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {DIMENSIONS_INFO.TF.titleFa}
                </h3>
              </div>
              <Brain className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-rose-700 block mb-1">منطقی (T)</span>
                <p className="text-slate-600 leading-snug">تصمیم‌گیری بر مبنای عقل، تحلیل بی‌طرفانه و اصول منطقی</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-pink-700 block mb-1">احساسی (F)</span>
                <p className="text-slate-600 leading-snug">تصمیم‌گیری بر مبنای ارزش‌های اخلاقی، همدلی و انسجام انسانی</p>
              </div>
            </div>
          </div>

          {/* Axis 4: J vs P */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                  J / P
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {DIMENSIONS_INFO.JP.titleFa}
                </h3>
              </div>
              <Compass className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-amber-700 block mb-1">قضاوتی (J)</span>
                <p className="text-slate-600 leading-snug">علاقه‌مند به نظم، برنامه‌ریزی، زمان‌بندی دقیق و تصمیم‌گیری قاطع</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-orange-700 block mb-1">ادراکی (P)</span>
                <p className="text-slate-600 leading-snug">علاقه‌مند به انعطاف‌پذیری، بداهه‌پردازی و باز نگه داشتن انتخاب‌ها</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Tips */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-100/80 space-y-3">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-indigo-600" />
          <span>توصیه‌هایی برای دستیابی به دقیق‌ترین نتیجه:</span>
        </h3>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>صداقت کامل:</strong> به سوالات بر اساس «آنچه واقعاً هستید» پاسخ دهید، نه «آنچه دوست دارید باشید».</li>
          <li><strong>پاسخ بدون وسواس:</strong> اولین حسی که با خواندن سوال به ذهنتان می‌رسد معمولاً صحیح‌ترین پاسخ است.</li>
          <li><strong>پرهیز از پاسخ‌های خنثی:</strong> تا حد امکان از گزینه «نظری ندارم / خنثی» پرهیز کنید تا نتیجه با درصد تفکیک بالاتری محاسبه شود.</li>
        </ul>
      </div>

      {/* Explore Types Card */}
      <div className="text-center pt-2">
        <button
          id="btn-start-explore-types"
          onClick={onOpenExplorer}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>می‌خواهید با هر ۱۶ تیپ شخصیتی به صورت مستقیم آشنا شوید؟ کلیک کنید</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
