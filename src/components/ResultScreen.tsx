import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Share2, 
  RotateCcw, 
  BookmarkCheck, 
  Check, 
  Copy, 
  Printer, 
  Download, 
  Users, 
  Briefcase, 
  Heart, 
  TrendingUp, 
  ShieldAlert, 
  Award, 
  BookOpen,
  Mail,
  UserCheck,
  Compass,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { TestResult, PersonalityTypeDetails } from '../types';
import { PERSONALITY_TYPES, DIMENSIONS_INFO } from '../data/personalityTypes';
import { saveResultToHistory } from '../utils/calculator';

interface ResultScreenProps {
  result: TestResult;
  onRetake: () => void;
  onOpenExplorer: () => void;
  onOpenTypeDetail: (typeCode: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRetake,
  onOpenExplorer,
  onOpenTypeDetail
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths' | 'careers' | 'relationships' | 'famous' | 'growth'>('overview');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState(result.userEmail || '');
  const [nameInput, setNameInput] = useState(result.userName || '');
  const printableRef = useRef<HTMLDivElement>(null);

  const typeInfo: PersonalityTypeDetails = PERSONALITY_TYPES[result.type] || PERSONALITY_TYPES['INTJ'];

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti not available');
    }
  }, []);

  const handleCopySummary = () => {
    const text = `🎯 نتیجه تست شخصیت‌شناسی MBTI من:
تیپ شخصیتی: ${result.type} - ${typeInfo.titleFa} (${typeInfo.groupNameFa})
«${typeInfo.tagline}»

📊 ابعاد شخصیتی:
• انرژی: ${result.dimensions.EI.poleNameFa} (${result.dimensions.EI.percentage}٪)
• اطلاعات: ${result.dimensions.SN.poleNameFa} (${result.dimensions.SN.percentage}٪)
• تصمیم‌گیری: ${result.dimensions.TF.poleNameFa} (${result.dimensions.TF.percentage}٪)
• سبک زندگی: ${result.dimensions.JP.poleNameFa} (${result.dimensions.JP.percentage}٪)

🌟 نقاط قوت اصلی:
${typeInfo.strengths.slice(0, 3).map((s) => `• ${s}`).join('\n')}

💼 مشاغل پیشنهادی:
${typeInfo.careerPaths.slice(0, 3).map((c) => `• ${c}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedResult: TestResult = {
      ...result,
      userName: nameInput.trim() || undefined,
      userEmail: emailInput.trim() || undefined
    };
    saveResultToHistory(updatedResult);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10" ref={printableRef}>
      {/* Hero Result Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center relative overflow-hidden space-y-6"
      >
        <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${typeInfo.groupColor.gradientFrom} ${typeInfo.groupColor.gradientTo}`} />
        
        {/* Archetype Group Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className={`px-4 py-1 rounded-full text-xs sm:text-sm font-bold border ${typeInfo.groupColor.badgeBg}`}>
            دسته‌بندی: {typeInfo.groupNameFa}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            تاریخ آزمون: {result.date}
          </span>
        </div>

        {/* User Name if available */}
        {result.userName && (
          <div className="text-slate-500 font-medium text-sm">
            کارنامه شخصیت‌شناسی برای: <span className="font-bold text-slate-800">{result.userName}</span>
          </div>
        )}

        {/* Type Code & Persian Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-wider text-slate-900 font-mono">
              {result.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800">
            {typeInfo.titleFa}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-400">
            {typeInfo.titleEn}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed italic bg-slate-50 py-3 px-5 rounded-2xl border border-slate-150">
          «{typeInfo.tagline}»
        </p>

        {/* Action Buttons Top */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="btn-copy-summary"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">کپی شد!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>کپی خلاصه نتیجه</span>
              </>
            )}
          </button>

          <button
            id="btn-print-result"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>چاپ / ذخیره PDF</span>
          </button>

          <button
            id="btn-retake-test"
            onClick={onRetake}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-indigo-600" />
            <span>تکرار آزمون</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Dimension Percentage Bars */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
        <div className="border-b border-slate-150 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              نمودار درصد ابعاد ۴ گانه شخصیت شما
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              تفکیک تمایلات رفتاری شما در هر یک از محورهای روان‌شناختی
            </p>
          </div>
          <Sparkles className="w-6 h-6 text-indigo-500 hidden sm:block" />
        </div>

        <div className="space-y-6">
          {/* Dimension 1: EI */}
          <DimensionBar
            dimResult={result.dimensions.EI}
            leftPoleCode="E"
            rightPoleCode="I"
            leftPoleLabel="برون‌گرا (E)"
            rightPoleLabel="درون‌گرا (I)"
            barColor="bg-indigo-600"
          />

          {/* Dimension 2: SN */}
          <DimensionBar
            dimResult={result.dimensions.SN}
            leftPoleCode="S"
            rightPoleCode="N"
            leftPoleLabel="حسی (S)"
            rightPoleLabel="شهودی (N)"
            barColor="bg-emerald-600"
          />

          {/* Dimension 3: TF */}
          <DimensionBar
            dimResult={result.dimensions.TF}
            leftPoleCode="T"
            rightPoleCode="F"
            leftPoleLabel="منطقی (T)"
            rightPoleLabel="احساسی (F)"
            barColor="bg-rose-600"
          />

          {/* Dimension 4: JP */}
          <DimensionBar
            dimResult={result.dimensions.JP}
            leftPoleCode="J"
            rightPoleCode="P"
            leftPoleLabel="قضاوتی / منظم (J)"
            rightPoleLabel="ادراکی / منعطف (P)"
            barColor="bg-amber-600"
          />
        </div>
      </div>

      {/* Deep-Dive Tabs Section */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/70 p-2 gap-1.5 scrollbar-none">
          <TabButton
            id="tab-overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<BookOpen className="w-4 h-4" />}
            label="تحلیل جامع و ویژگی‌ها"
          />
          <TabButton
            id="tab-strengths"
            active={activeTab === 'strengths'}
            onClick={() => setActiveTab('strengths')}
            icon={<Award className="w-4 h-4" />}
            label="نقاط قوت و ضعف"
          />
          <TabButton
            id="tab-careers"
            active={activeTab === 'careers'}
            onClick={() => setActiveTab('careers')}
            icon={<Briefcase className="w-4 h-4" />}
            label="مشاغل سازگار"
          />
          <TabButton
            id="tab-relationships"
            active={activeTab === 'relationships'}
            onClick={() => setActiveTab('relationships')}
            icon={<Heart className="w-4 h-4" />}
            label="روابط عاطفی"
          />
          <TabButton
            id="tab-famous"
            active={activeTab === 'famous'}
            onClick={() => setActiveTab('famous')}
            icon={<Users className="w-4 h-4" />}
            label="مشاهیر هم‌تیپ"
          />
          <TabButton
            id="tab-growth"
            active={activeTab === 'growth'}
            onClick={() => setActiveTab('growth')}
            icon={<TrendingUp className="w-4 h-4" />}
            label="نقشه رشد فردی"
          />
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  درباره کهن‌الگوی {typeInfo.titleFa}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base text-justify">
                  {typeInfo.summary}
                </p>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base text-justify pt-2">
                  {typeInfo.description}
                </p>
              </div>

              {/* 4 Poles Quick Recap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                  <span className="text-xs font-bold text-indigo-700">جهت‌گیری انرژی</span>
                  <p className="text-xs text-slate-700">{result.dimensions.EI.summary}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <span className="text-xs font-bold text-emerald-700">پردازش اطلاعات</span>
                  <p className="text-xs text-slate-700">{result.dimensions.SN.summary}</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <span className="text-xs font-bold text-rose-700">فرآیند تصمیم‌گیری</span>
                  <p className="text-xs text-slate-700">{result.dimensions.TF.summary}</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
                  <span className="text-xs font-bold text-amber-700">سبک زیست و نظم</span>
                  <p className="text-xs text-slate-700">{result.dimensions.JP.summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Strengths & Weaknesses */}
          {activeTab === 'strengths' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {/* Strengths */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>نقاط قوت برجسته</span>
                </div>
                <ul className="space-y-3">
                  {typeInfo.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses / Challenges */}
              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-4">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>چالش‌ها و نقاط قابل بهبود</span>
                </div>
                <ul className="space-y-3">
                  {typeInfo.weaknesses.map((weak, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Careers */}
          {activeTab === 'careers' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  مشاغل و حوزه‌های حرفه‌ای ایده‌آل برای {typeInfo.titleFa}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  افراد با تیپ شخصیتی {result.type} زمانی که در محیط‌هایی با استقلال، چالش فکری و سازگار با ارزش‌هایشان فعالیت کنند به بالاترین بهره‌وری و رضایت شغلی می‌رسند.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {typeInfo.careerPaths.map((career, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-200 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-2xs font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Relationships */}
          {activeTab === 'relationships' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-pink-50/40 border border-pink-150 space-y-4">
                <div className="flex items-center gap-2 text-pink-800 font-bold text-base">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span>سبک تعامل در روابط عاطفی و هم‌سرگزینی</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base text-justify">
                  {typeInfo.romanticRelationships}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">نکته کلیدی برای بهبود روابط:</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  آگاهی از تفاوت‌های فردی شریک زندگی و عدم انتظار تطابق صددرصدی با استانداردهای شخصی، کلید ایجاد آرامش و پیوند پایدار است.
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Famous Personalities */}
          {activeTab === 'famous' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  چهره‌های سرشناس و تاریخی هم‌تیپ شما ({result.type})
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  شخصیت‌های موفقی که با تکیه بر کهن‌الگوی رفتاری مشابه، اثری ماندگار در تاریخ و دنیای معاصر بر جای گذاشته‌اند:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {typeInfo.famousPeople.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1 hover:border-indigo-300 transition-colors"
                  >
                    <div className="font-extrabold text-slate-900 text-base">{person.name}</div>
                    <div className="text-xs text-indigo-600 font-medium">{person.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Growth Advice */}
          {activeTab === 'growth' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  نقشه راه رشد و توسعه فردی اختصاصی
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  توصیه‌های کاربردی برای متوازن‌سازی ابعاد شخصیتی و دستیابی به کمال فردی:
                </p>
              </div>

              <div className="space-y-3">
                {typeInfo.growthAdvice.map((adv, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-150 flex items-start gap-3"
                  >
                    <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{adv}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save & Archive Section (Optional Email / Name save) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <BookmarkCheck className="w-5 h-5 text-indigo-600" />
          <span>ذخیره و ثبت دائمی این نتیجه</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          می‌توانید این کارنامه را با نام و ایمیل دلخواه در حافظه مرورگر خود ذخیره کنید تا در دفعات بعدی همیشه به آن دسترسی داشته باشید.
        </p>

        <form onSubmit={handleSaveResult} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">نام شما:</label>
            <div className="relative">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="مثلاً: سارا"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">ایمیل (اختیاری):</label>
            <div className="relative">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-end">
            <button
              id="btn-save-result-submit"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>در سوابق ذخیره شد!</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>ذخیره در نتایج من</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Explore All Types Footer CTA */}
      <div className="text-center pt-4">
        <button
          id="btn-result-explore-types"
          onClick={onOpenExplorer}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>مشاهده و مقایسه تمام ۱۶ تیپ شخصیتی</span>
        </button>
      </div>
    </div>
  );
};

interface DimensionBarProps {
  dimResult: {
    dimension: string;
    pole: string;
    percentage: number;
    poleNameFa: string;
    oppositePoleNameFa: string;
    summary: string;
  };
  leftPoleCode: string;
  rightPoleCode: string;
  leftPoleLabel: string;
  rightPoleLabel: string;
  barColor: string;
}

const DimensionBar: React.FC<DimensionBarProps> = ({
  dimResult,
  leftPoleCode,
  rightPoleCode,
  leftPoleLabel,
  rightPoleLabel,
  barColor
}) => {
  const isLeftDominant = dimResult.pole === leftPoleCode;
  const leftPercent = isLeftDominant ? dimResult.percentage : 100 - dimResult.percentage;
  const rightPercent = 100 - leftPercent;

  return (
    <div className="space-y-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className={`flex items-center gap-1.5 ${isLeftDominant ? 'font-extrabold text-indigo-900' : 'text-slate-500 font-medium'}`}>
          <span>{leftPoleLabel}</span>
          <span className="text-xs bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono">
            {leftPercent}٪
          </span>
        </div>

        <div className={`flex items-center gap-1.5 ${!isLeftDominant ? 'font-extrabold text-indigo-900' : 'text-slate-500 font-medium'}`}>
          <span className="text-xs bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono">
            {rightPercent}٪
          </span>
          <span>{rightPoleLabel}</span>
        </div>
      </div>

      {/* Double-sided percentage bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
        <div
          className={`h-full transition-all duration-500 ${isLeftDominant ? barColor : 'bg-slate-300'}`}
          style={{ width: `${leftPercent}%` }}
        />
        <div
          className={`h-full transition-all duration-500 ${!isLeftDominant ? barColor : 'bg-slate-300'}`}
          style={{ width: `${rightPercent}%` }}
        />
      </div>

      <p className="text-[11px] sm:text-xs text-slate-500 leading-normal pt-1">
        {dimResult.summary}
      </p>
    </div>
  );
};

interface TabButtonProps {
  id: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ id, active, onClick, icon, label }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
        active
          ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
