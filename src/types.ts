export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  positivePole: Pole; // Choosing "Agree" pushes towards this pole
  negativePole: Pole; // Choosing "Disagree" pushes towards this pole
  categoryTitle: string;
}

export type LikertScore = -3 | -2 | -1 | 0 | 1 | 2 | 3;

export interface DimensionResult {
  dimension: Dimension;
  pole: Pole;
  percentage: number; // 50 - 100%
  score: number;
  poleNameFa: string;
  oppositePoleNameFa: string;
  poleCode: Pole;
  oppositePoleCode: Pole;
  summary: string;
}

export interface TestResult {
  id: string;
  type: string; // e.g. "INTJ"
  date: string;
  timestamp: number;
  userName?: string;
  userEmail?: string;
  dimensions: {
    EI: DimensionResult;
    SN: DimensionResult;
    TF: DimensionResult;
    JP: DimensionResult;
  };
  answers: Record<number, LikertScore>;
}

export type PersonalityGroup = 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

export interface PersonalityTypeDetails {
  code: string;
  titleFa: string;
  titleEn: string;
  group: PersonalityGroup;
  groupNameFa: string;
  groupColor: {
    badgeBg: string;
    badgeText: string;
    gradientFrom: string;
    gradientTo: string;
    cardBorder: string;
    accentColor: string;
  };
  tagline: string;
  summary: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  romanticRelationships: string;
  careerPaths: string[];
  famousPeople: { name: string; role: string }[];
  growthAdvice: string[];
}
