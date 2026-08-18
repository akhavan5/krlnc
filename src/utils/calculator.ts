import { QUESTIONS } from '../data/questions';
import { Dimension, DimensionResult, LikertScore, Pole, TestResult } from '../types';

export function calculateTestResult(
  answers: Record<number, LikertScore>,
  userName?: string,
  userEmail?: string
): TestResult {
  // Initialize dimension scores
  const scores: Record<Dimension, { positive: number; negative: number; maxScore: number }> = {
    EI: { positive: 0, negative: 0, maxScore: 0 },
    SN: { positive: 0, negative: 0, maxScore: 0 },
    TF: { positive: 0, negative: 0, maxScore: 0 },
    JP: { positive: 0, negative: 0, maxScore: 0 },
  };

  QUESTIONS.forEach((q) => {
    const rawVal = answers[q.id] ?? 0;
    const dimension = q.dimension;
    scores[dimension].maxScore += 3;

    // rawVal is from -3 (strongly disagree) to +3 (strongly agree)
    if (q.positivePole === 'E' || q.positivePole === 'S' || q.positivePole === 'T' || q.positivePole === 'J') {
      // Positive pole is first letter (E, S, T, J)
      if (rawVal > 0) {
        scores[dimension].positive += rawVal;
      } else if (rawVal < 0) {
        scores[dimension].negative += Math.abs(rawVal);
      }
    } else {
      // Positive pole is second letter (I, N, F, P)
      if (rawVal > 0) {
        scores[dimension].negative += rawVal;
      } else if (rawVal < 0) {
        scores[dimension].positive += Math.abs(rawVal);
      }
    }
  });

  const getDimensionResult = (
    dimension: Dimension,
    poleA: Pole,
    poleB: Pole,
    nameA: string,
    nameB: string
  ): DimensionResult => {
    const scoreA = scores[dimension].positive;
    const scoreB = scores[dimension].negative;
    const total = scoreA + scoreB;

    let dominantPole: Pole;
    let percentage: number;
    let poleNameFa: string;
    let oppositePoleNameFa: string;
    let oppositePoleCode: Pole;

    if (scoreA >= scoreB) {
      dominantPole = poleA;
      oppositePoleCode = poleB;
      poleNameFa = nameA;
      oppositePoleNameFa = nameB;
      percentage = total === 0 ? 50 : Math.round((scoreA / total) * 100);
    } else {
      dominantPole = poleB;
      oppositePoleCode = poleA;
      poleNameFa = nameB;
      oppositePoleNameFa = nameA;
      percentage = Math.round((scoreB / total) * 100);
    }

    // Cap at minimum 51% if one is dominant or 50% if exact tie
    if (percentage < 50) percentage = 50;

    let summary = '';
    if (dimension === 'EI') {
      summary = dominantPole === 'E' 
        ? `شما ${percentage}٪ برون‌گرا هستید و از تعامل با جهان بیرون و افراد انرژی می‌گیرید.`
        : `شما ${percentage}٪ درون‌گرا هستید و از تأمل و خلوت شخصی انرژی کسب می‌کنید.`;
    } else if (dimension === 'SN') {
      summary = dominantPole === 'S'
        ? `شما ${percentage}٪ حسی هستید و بر حقایق ملموس و شواهد عینی تمرکز دارید.`
        : `شما ${percentage}٪ شهودی هستید و به الگوهای کلان و احتمالات آینده توجه می‌کنید.`;
    } else if (dimension === 'TF') {
      summary = dominantPole === 'T'
        ? `شما ${percentage}٪ منطقی هستید و تصمیمات را با عقل و استدلال بی‌طرفانه می‌گیرید.`
        : `شما ${percentage}٪ احساسی هستید و تصمیمات را با همدلی و ارزش‌های انسانی می‌سنجید.`;
    } else if (dimension === 'JP') {
      summary = dominantPole === 'J'
        ? `شما ${percentage}٪ ساختارگرا (قضاوتی) هستید و از برنامه‌ریزی دقیق لذت می‌برید.`
        : `شما ${percentage}٪ منعطف (ادراکی) هستید و گزینه‌ها را باز نگه می‌دارید.`;
    }

    return {
      dimension,
      pole: dominantPole,
      percentage,
      score: dominantPole === poleA ? scoreA : scoreB,
      poleNameFa,
      oppositePoleNameFa,
      poleCode: dominantPole,
      oppositePoleCode,
      summary
    };
  };

  const dimEI = getDimensionResult('EI', 'E', 'I', 'برون‌گرا (Extravert)', 'درون‌گرا (Introvert)');
  const dimSN = getDimensionResult('SN', 'S', 'N', 'حسی (Sensing)', 'شهودی (Intuitive)');
  const dimTF = getDimensionResult('TF', 'T', 'F', 'منطقی (Thinking)', 'احساسی (Feeling)');
  const dimJP = getDimensionResult('JP', 'J', 'P', 'قضاوتی (Judging)', 'ادراکی (Perceiving)');

  const typeCode = `${dimEI.pole}${dimSN.pole}${dimTF.pole}${dimJP.pole}`;
  const now = new Date();

  return {
    id: `mbti_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    type: typeCode,
    date: now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }),
    timestamp: now.getTime(),
    userName: userName?.trim() || undefined,
    userEmail: userEmail?.trim() || undefined,
    dimensions: {
      EI: dimEI,
      SN: dimSN,
      TF: dimTF,
      JP: dimJP,
    },
    answers
  };
}

const STORAGE_KEY = 'mbti_test_history_v1';
const CURRENT_PROGRESS_KEY = 'mbti_current_progress_v1';

export function saveResultToHistory(result: TestResult): void {
  try {
    const existing = getSavedHistory();
    const updated = [result, ...existing.filter((r) => r.id !== result.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export function getSavedHistory(): TestResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read from local storage', e);
    return [];
  }
}

export function deleteSavedResult(id: string): TestResult[] {
  try {
    const history = getSavedHistory().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return history;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return [];
  }
}

export function saveCurrentProgress(answers: Record<number, LikertScore>, currentStep: number): void {
  try {
    sessionStorage.setItem(CURRENT_PROGRESS_KEY, JSON.stringify({ answers, currentStep }));
  } catch (e) {
    console.error(e);
  }
}

export function loadCurrentProgress(): { answers: Record<number, LikertScore>; currentStep: number } | null {
  try {
    const data = sessionStorage.getItem(CURRENT_PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function clearCurrentProgress(): void {
  try {
    sessionStorage.removeItem(CURRENT_PROGRESS_KEY);
  } catch (e) {
    console.error(e);
  }
}
