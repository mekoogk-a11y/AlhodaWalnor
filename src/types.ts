export type CategoryId =
  | "all"
  | "shubuhat"
  | "quran"
  | "sunnah"
  | "aqeedah"
  | "uloom_quran"
  | "uloom_hadith"
  | "scholars"
  | "rebuttals"
  | "encyclopedia"
  | "assistant";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  iconName: string;
}

export interface QuranEvidence {
  surah: string;
  ayahNumber: string | number;
  text: string;
  tafsirSummary?: string;
  tafsirSource?: string;
}

export interface HadithEvidence {
  narrator: string;
  text: string;
  source: string;
  authenticity: "صحيح" | "متفق عليه" | "حسن";
}

export interface ScholarQuote {
  scholar: string;
  era?: string;
  quote: string;
  book: string;
  volumePage?: string;
}

export interface ReferenceSource {
  title: string;
  author: string;
  details: string;
  category: "تفسير" | "حديث" | "علوم الحديث" | "علوم القرآن" | "عقيدة وأصول" | "تاريخ وأركيولوجيا" | "لغة ومعاجم" | string;
}

export interface ArticleSection {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  objection: string; // الاعتراض أو دليل المشكك
  scholarlyAnswer: string; // الجواب العلمي
  quranEvidences: QuranEvidence[];
  hadithEvidences?: HadithEvidence[];
  scholarQuotes: ScholarQuote[];
  summary: string; // الخلاصة
  references: ReferenceSource[];
}

export interface MisconceptionItem {
  id: string;
  title: string;
  category: CategoryId;
  whatIsDoubt: string; // ما هي الشبهة؟
  skepticProof: string; // دليل المشكك
  scientificAnswer: string; // الجواب العلمي
  quranEvidence: QuranEvidence[]; // الدليل من القرآن
  hadithEvidence: HadithEvidence[]; // الدليل من السنة
  scholarsQuotes: ScholarQuote[]; // أقوال علماء أهل السنة
  summary: string; // الخلاصة
  references: ReferenceSource[]; // الأدلة والمراجع
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelNotice?: string;
}
