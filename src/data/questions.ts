import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // ====================== E vs I (برون‌گرایی در برابر درون‌گرایی) ======================
  {
    id: 1,
    text: 'حضور در جمع‌های شلوغ و پرانرژی باعث تجدید قوای روحی من می‌شود تا اینکه خسته‌ام کند.',
    dimension: 'EI',
    positivePole: 'E',
    negativePole: 'I',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 2,
    text: 'معمولاً شروع‌کننده مکالمه با افراد ناآشنا در مهمانی‌ها یا محیط‌های کاری هستم.',
    dimension: 'EI',
    positivePole: 'E',
    negativePole: 'I',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 3,
    text: 'پس از یک هفته کاری پرتنش، ترجیح می‌دهم در خلوت و سکوت خانه استراحت کنم تا با دوستان بیرون بروم.',
    dimension: 'EI',
    positivePole: 'I',
    negativePole: 'E',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 4,
    text: 'دوست دارم افکار و ایده‌هایم را با صدای بلند و در حین گفتگو با دیگران حلاجی کنم.',
    dimension: 'EI',
    positivePole: 'E',
    negativePole: 'I',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 5,
    text: 'داشتن یک دایره محدود اما بسیار صمیمی از دوستان را به ارتباط با افراد زیاد ترجیح می‌دهم.',
    dimension: 'EI',
    positivePole: 'I',
    negativePole: 'E',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 6,
    text: 'وقتی در جمعی قرار می‌گیرم، تمایل دارم در کانون توجه یا هدایت گروه باشم.',
    dimension: 'EI',
    positivePole: 'E',
    negativePole: 'I',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },
  {
    id: 7,
    text: 'قبل از صحبت کردن، ترجیح می‌دهم جملات و ایده‌هایم را در ذهن سبک‌سنگین کنم.',
    dimension: 'EI',
    positivePole: 'I',
    negativePole: 'E',
    categoryTitle: 'انرژی و تعاملات اجتماعی'
  },

  // ====================== S vs N (حسی در برابر شهودی / دریافت اطلاعات) ======================
  {
    id: 8,
    text: 'در بررسی پروژه‌ها، به حقایق عینی، جزئیات و داده‌های ملموس بیشتر از ایده‌های انتزاعی و فرضی تکیه می‌کنم.',
    dimension: 'SN',
    positivePole: 'S',
    negativePole: 'N',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 9,
    text: 'بیشتر به امکانات و پتانسیل‌های آینده فکر می‌کنم تا واقعیت‌های زمان حال.',
    dimension: 'SN',
    positivePole: 'N',
    negativePole: 'S',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 10,
    text: 'علاقه‌مندم که چرایی پدیده‌ها و الگوهای پنهان پشت رویدادها را کشف کنم.',
    dimension: 'SN',
    positivePole: 'N',
    negativePole: 'S',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 11,
    text: 'پیروی از روش‌های آزموده‌شده و اثبات‌شده را به ابداع روش‌های جدید و غیرقابل‌پیش‌بینی ترجیح می‌دهم.',
    dimension: 'SN',
    positivePole: 'S',
    negativePole: 'N',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 12,
    text: 'اغلب غرق در تخیلات، فلسفه‌بافی یا سناریوهای فرضی می‌شوم و از واقعیت اطراف فاصله می‌گیرم.',
    dimension: 'SN',
    positivePole: 'N',
    negativePole: 'S',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 13,
    text: 'هنگام اجرای یک کار، تمرکز بر دستورالعمل‌های گام‌به‌گام و دقیق برایم آرامش‌بخش است.',
    dimension: 'SN',
    positivePole: 'S',
    negativePole: 'N',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },
  {
    id: 14,
    text: 'همیشه به دنبال دیدن «تصویر بزرگ» و معنای کلی قضایا هستم تا پرداختن به جزئیات ریز.',
    dimension: 'SN',
    positivePole: 'N',
    negativePole: 'S',
    categoryTitle: 'دریافت و پردازش اطلاعات'
  },

  // ====================== T vs F (فکری/منطقی در برابر احساسی / تصمیم‌گیری) ======================
  {
    id: 15,
    text: 'در تصمیم‌گیری‌های مهم، منطق بی‌طرف و واقعیت‌های عقلانی بر احساسات فردی ارجحیت دارند.',
    dimension: 'TF',
    positivePole: 'T',
    negativePole: 'F',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 16,
    text: 'هنگام قضاوت در یک اختلاف، حفظ احساسات و همدلی با طرفین برایم مهم‌تر از اثبات حقانیت فنی است.',
    dimension: 'TF',
    positivePole: 'F',
    negativePole: 'T',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 17,
    text: 'اگر انتقادی منطقی اما کمی تلخ باشد، ترجیح می‌دهم بدون تعارف آن را بشنوم و بگویم.',
    dimension: 'TF',
    positivePole: 'T',
    negativePole: 'F',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 18,
    text: 'تصمیماتم را بر اساس ارزش‌های انسانی، اخلاقی و حفظ هماهنگی گروهی پایه‌ریزی می‌کنم.',
    dimension: 'TF',
    positivePole: 'F',
    negativePole: 'T',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 19,
    text: 'معمولاً تحت تأثیر داستان‌های احساسی یا غم‌انگیز دیگران به‌سرعت منقلب می‌شوم.',
    dimension: 'TF',
    positivePole: 'F',
    negativePole: 'T',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 20,
    text: 'کارایی، بهینه‌سازی و دستیابی به هدف برای من اولویت بالاتری نسبت به خوشایند بودن مسیر دارد.',
    dimension: 'TF',
    positivePole: 'T',
    negativePole: 'F',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },
  {
    id: 21,
    text: 'قضاوت بر اساس اصول اخلاقی و مهربانی را بهتر از قضاوت سخت‌گیرانه بر پایه قوانین خشک می‌دانم.',
    dimension: 'TF',
    positivePole: 'F',
    negativePole: 'T',
    categoryTitle: 'نحوه تصمیم‌گیری و ارزیابی'
  },

  // ====================== J vs P (قضاوتی/ساختارمند در برابر ادراکی/انعطاف‌پذیر) ======================
  {
    id: 22,
    text: 'همیشه کارهایم را با برنامه‌ریزی دقیق، چک‌لیست و تقویم مشخص پیش می‌برم.',
    dimension: 'JP',
    positivePole: 'J',
    negativePole: 'P',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 23,
    text: 'انعطاف‌پذیری و تصمیم‌گیری‌های لحظه‌ای و بداهه را به پایبندی به برنامه‌های سفت‌وسخت ترجیح می‌دهم.',
    dimension: 'JP',
    positivePole: 'P',
    negativePole: 'J',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 24,
    text: 'از بلاتکلیفی و پروژه‌های باز و تمام‌نشده بیزارم و مایل به بستن سریع پرونده‌ها هستم.',
    dimension: 'JP',
    positivePole: 'J',
    negativePole: 'P',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 25,
    text: 'معمولاً کارها را تا نزدیک شدن به مهلت نهایی (Deadline) به تعویق می‌اندازم و تحت فشار انگیزه می‌گیرم.',
    dimension: 'JP',
    positivePole: 'P',
    negativePole: 'J',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 26,
    text: 'محیط زندگی و میز کارم همیشه مرتب و سازمان‌یافته است.',
    dimension: 'JP',
    positivePole: 'J',
    negativePole: 'P',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 27,
    text: 'دوست دارم گزینه‌ها را تا آخرین لحظه باز نگه دارم تا در صورت تغییر شرایط بتوانم تصمیم جدیدی بگیرم.',
    dimension: 'JP',
    positivePole: 'P',
    negativePole: 'J',
    categoryTitle: 'سبک زندگی و سازماندهی'
  },
  {
    id: 28,
    text: 'پایان دادن به یک کار به موقع طبق برنامه، برایم رضایت‌بخش‌تر از شروع هیجان‌انگیز چندین کار همزمان است.',
    dimension: 'JP',
    positivePole: 'J',
    negativePole: 'P',
    categoryTitle: 'سبک زندگی و سازماندهی'
  }
];

export const LIKERT_OPTIONS = [
  { value: 3 as const, labelFa: 'کاملاً موافقم', shortLabel: 'موافقم++', colorClass: 'bg-emerald-600 border-emerald-600 text-white', ringClass: 'ring-emerald-500', size: 'w-13 h-13 md:w-14 md:h-14', borderActive: 'border-emerald-600 bg-emerald-50 text-emerald-800' },
  { value: 2 as const, labelFa: 'موافقم', shortLabel: 'موافقم', colorClass: 'bg-emerald-500 border-emerald-500 text-white', ringClass: 'ring-emerald-400', size: 'w-11 h-11 md:w-12 md:h-12', borderActive: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
  { value: 1 as const, labelFa: 'تا حدی موافقم', shortLabel: 'کمی موافق', colorClass: 'bg-emerald-400 border-emerald-400 text-white', ringClass: 'ring-emerald-300', size: 'w-9 h-9 md:w-10 md:h-10', borderActive: 'border-emerald-400 bg-emerald-50 text-emerald-600' },
  { value: 0 as const, labelFa: 'نظری ندارم / خنثی', shortLabel: 'خنثی', colorClass: 'bg-slate-400 border-slate-400 text-white', ringClass: 'ring-slate-300', size: 'w-8 h-8 md:w-9 md:h-9', borderActive: 'border-slate-400 bg-slate-100 text-slate-700' },
  { value: -1 as const, labelFa: 'تا حدی مخالفم', shortLabel: 'کمی مخالف', colorClass: 'bg-rose-400 border-rose-400 text-white', ringClass: 'ring-rose-300', size: 'w-9 h-9 md:w-10 md:h-10', borderActive: 'border-rose-400 bg-rose-50 text-rose-600' },
  { value: -2 as const, labelFa: 'مخالفم', shortLabel: 'مخالفم', colorClass: 'bg-rose-500 border-rose-500 text-white', ringClass: 'ring-rose-400', size: 'w-11 h-11 md:w-12 md:h-12', borderActive: 'border-rose-500 bg-rose-50 text-rose-700' },
  { value: -3 as const, labelFa: 'کاملاً مخالفم', shortLabel: 'مخالفم++', colorClass: 'bg-rose-600 border-rose-600 text-white', ringClass: 'ring-rose-500', size: 'w-13 h-13 md:w-14 md:h-14', borderActive: 'border-rose-600 bg-rose-50 text-rose-800' },
];
