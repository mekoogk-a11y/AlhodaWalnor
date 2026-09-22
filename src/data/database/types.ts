export type KnowledgeDiscipline =
  | "quran"
  | "hadith"
  | "tafsir"
  | "aqeedah"
  | "fiqh"
  | "seerah"
  | "history"
  | "comparative_religion"
  | "refutations"
  | "articles"
  | "fatwas";

export interface DatabaseSource {
  id: string;
  title: string;
  author: string;
  era: string; // e.g., "المتقدمون - القرن الثالث الهجري"
  discipline: KnowledgeDiscipline;
  description: string;
  volumePage?: string;
  authenticityStatus: "متواتر" | "صحيح" | "حسن" | "موثق تاريخياً" | "إجماع";
  downloadUrl?: string;
  verified: boolean;
}

export interface QuranVerseRecord {
  id: string;
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  juzNumber: number;
  arabicText: string;
  theme: string;
  keyTopics: string[];
  tafsirSnippet: string;
}

export interface HadithRecord {
  id: string;
  bookName: string; // e.g., "صحيح البخاري"
  author: string; // e.g., "الإمام البخاري"
  hadithNumber: string;
  chapter: string;
  narrator: string; // الصحابي الراوي
  arabicMatn: string;
  takhrijGrade: "صحيح" | "حسن" | "متفق عليه";
  commentarySnippet: string;
  topics: string[];
}

export interface TafsirRecord {
  id: string;
  mufassir: string; // e.g., "ابن كثير"
  bookTitle: string; // e.g., "تفسير القرآن العظيم"
  surahName: string;
  verseNumber: string;
  tafsirText: string;
  keyBenefit: string;
  volumePage?: string;
}

export interface ScholarStatementRecord {
  id: string;
  scholar: string; // e.g., "شيخ الإسلام ابن تيمية"
  era: string;
  bookTitle: string; // e.g., "درء تعارض العقل والنقل"
  volumePage: string;
  topic: string; // e.g., "استحالة تعارض العقل الصريح مع النقل الصحيح"
  discipline: "aqeedah" | "fiqh" | "usul";
  text: string;
  tags: string[];
}

export interface SeerahHistoryRecord {
  id: string;
  title: string;
  era: string;
  sourceBook: string;
  author: string;
  summary: string;
  historicalEvidence: string;
  archaeologicalProof?: string;
  tags: string[];
}

export interface ComparativeReligionRecord {
  id: string;
  topic: string;
  faithsCovered: string[]; // e.g., ["الإسلام", "المسيحية", "اليهودية"]
  originalTextsComparison: string;
  scholarlyAnalysis: string;
  islamicPerspective: string;
  historicalDocumentation: string;
  sources: string[];
}

export interface QAPairRecord {
  id: string;
  question: string;
  discipline: KnowledgeDiscipline;
  answerSummary: string;
  detailedAnswer: string;
  citations: {
    source: string;
    text: string;
    reference: string;
  }[];
  tags: string[];
}

export interface UnifiedSearchResult {
  id: string;
  discipline: KnowledgeDiscipline;
  disciplineLabel: string;
  title: string;
  authorOrSource: string;
  topic: string;
  snippet: string;
  fullContent: string;
  primaryReference: string;
  tags: string[];
  relevanceScore?: number;
}
