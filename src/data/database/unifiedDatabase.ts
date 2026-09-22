import {
  KnowledgeDiscipline,
  UnifiedSearchResult,
  DatabaseSource,
} from "./types";
import { quranDatabase } from "./quranData";
import { hadithDatabase } from "./hadithData";
import { tafsirDatabase } from "./tafsirData";
import { aqeedahFiqhDatabase } from "./aqeedahFiqhData";
import { seerahHistoryDatabase } from "./seerahHistoryData";
import { comparativeReligionDatabase } from "./comparativeReligionData";
import { sourcesCatalog } from "./sourcesCatalog";
import { qaDatabase } from "./qaData";
import { misconceptionsDatabase } from "../misconceptionsData";
import { mainArticleSections } from "../mainArticle";

export const DISCIPLINE_LABELS: Record<KnowledgeDiscipline, string> = {
  quran: "القرآن الكريم",
  hadith: "السنة والحديث",
  tafsir: "التفسير وعلوم القرآن",
  aqeedah: "العقيدة والتوحيد",
  fiqh: "الفقه وأصوله",
  seerah: "السيرة النبوية",
  history: "التاريخ والآثار",
  comparative_religion: "مقارنة الأديان",
  refutations: "الرد على الشبهات",
  articles: "المقالات والدراسات",
  fatwas: "الفتاوى والأحكام",
};

// Flatten all entries into a unified searchable index
export function getAllSearchableRecords(): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];

  // 1. Quran Verses
  quranDatabase.forEach((q) => {
    results.push({
      id: q.id,
      discipline: "quran",
      disciplineLabel: DISCIPLINE_LABELS.quran,
      title: `سورة ${q.surahName} [آية ${q.verseNumber}]`,
      authorOrSource: "القرآن الكريم - كلام رب العالمين المتواتر قطعي الثبوت",
      topic: q.theme,
      snippet: q.arabicText,
      fullContent: `${q.arabicText}\n\nبيان المعنى والتفسير:\n${q.tafsirSnippet}`,
      primaryReference: `المصحف الشريف - سورة ${q.surahName} آية ${q.verseNumber}`,
      tags: [...q.keyTopics, q.surahName],
    });
  });

  // 2. Hadith Records
  hadithDatabase.forEach((h) => {
    results.push({
      id: h.id,
      discipline: "hadith",
      disciplineLabel: DISCIPLINE_LABELS.hadith,
      title: `${h.bookName} - حديث رقم ${h.hadithNumber}`,
      authorOrSource: `${h.author} | الراوي: ${h.narrator}`,
      topic: h.chapter,
      snippet: h.arabicMatn,
      fullContent: `الحديث:\n${h.arabicMatn}\n\nالتخريج والدرجة: [${h.takhrijGrade}]\n\nالشرح والفوائد:\n${h.commentarySnippet}`,
      primaryReference: `${h.bookName}، رقم ${h.hadithNumber}، ${h.chapter}`,
      tags: [...h.topics, h.bookName, h.narrator],
    });
  });

  // 3. Tafsir Records
  tafsirDatabase.forEach((t) => {
    results.push({
      id: t.id,
      discipline: "tafsir",
      disciplineLabel: DISCIPLINE_LABELS.tafsir,
      title: `${t.bookTitle} - سورة ${t.surahName} [آية ${t.verseNumber}]`,
      authorOrSource: t.mufassir,
      topic: t.keyBenefit,
      snippet: t.tafsirText.slice(0, 180) + "...",
      fullContent: `${t.tafsirText}\n\nالفائدة الأصولية:\n${t.keyBenefit}\n\nالموضع: ${t.volumePage || "معتمد"}`,
      primaryReference: `${t.bookTitle}، ${t.mufassir} (${t.volumePage || ""})`,
      tags: [t.surahName, t.mufassir, "تفسير"],
    });
  });

  // 4. Aqeedah & Fiqh Statements
  aqeedahFiqhDatabase.forEach((s) => {
    results.push({
      id: s.id,
      discipline: s.discipline === "aqeedah" ? "aqeedah" : "fiqh",
      disciplineLabel: DISCIPLINE_LABELS[s.discipline === "aqeedah" ? "aqeedah" : "fiqh"],
      title: `${s.bookTitle} - ${s.scholar}`,
      authorOrSource: `${s.scholar} (${s.era})`,
      topic: s.topic,
      snippet: s.text.slice(0, 180) + "...",
      fullContent: `${s.text}\n\nالمصدر: ${s.bookTitle} - ${s.volumePage}`,
      primaryReference: `${s.bookTitle}، ${s.scholar}، ${s.volumePage}`,
      tags: [...s.tags, s.scholar],
    });
  });

  // 5. Seerah & History
  seerahHistoryDatabase.forEach((sh) => {
    results.push({
      id: sh.id,
      discipline: "history",
      disciplineLabel: DISCIPLINE_LABELS.history,
      title: sh.title,
      authorOrSource: `${sh.author} | الحقبة: ${sh.era}`,
      topic: sh.summary,
      snippet: sh.summary.slice(0, 180) + "...",
      fullContent: `البيان التاريخي:\n${sh.summary}\n\nالأدلة التاريخية والآثارية:\n${sh.historicalEvidence}${
        sh.archaeologicalProof ? `\n\nالتوثيق الآثاري:\n${sh.archaeologicalProof}` : ""
      }`,
      primaryReference: `${sh.sourceBook} - ${sh.author}`,
      tags: sh.tags,
    });
  });

  // 6. Comparative Religion
  comparativeReligionDatabase.forEach((cr) => {
    results.push({
      id: cr.id,
      discipline: "comparative_religion",
      disciplineLabel: DISCIPLINE_LABELS.comparative_religion,
      title: cr.topic,
      authorOrSource: "دراسات مقارنة الأديان الموثقة",
      topic: `مقارنة بين: ${cr.faithsCovered.join(" و ")}`,
      snippet: cr.originalTextsComparison.slice(0, 180) + "...",
      fullContent: `مقارنة النصوص الأصلية:\n${cr.originalTextsComparison}\n\nالتحليل العلمي والتاريخي:\n${cr.scholarlyAnalysis}\n\nالرؤية والبرهان الإسلامي:\n${cr.islamicPerspective}\n\nالمصادر المعتمدة:\n${cr.sources.join(" • ")}`,
      primaryReference: cr.sources[0] || "مقارنة الأديان - دراسات إسلامية موثقة",
      tags: [...cr.faithsCovered, "مقارنة الأديان", "التوحيد"],
    });
  });

  // 7. Refutations from Misconceptions Directory
  misconceptionsDatabase.forEach((m) => {
    const quranText = m.quranEvidence.map((q) => `${q.surah} [آية ${q.ayahNumber}]: ${q.text}`).join("\n");
    const hadithText = m.hadithEvidence.map((h) => `${h.source} (${h.authenticity}): ${h.text}`).join("\n");
    const quotesText = m.scholarsQuotes.map((s) => `${s.scholar} [${s.book}]: ${s.quote}`).join("\n");

    results.push({
      id: `refutation-${m.id}`,
      discipline: "refutations",
      disciplineLabel: DISCIPLINE_LABELS.refutations,
      title: m.title,
      authorOrSource: "منصة الهدى والنور - موسوعة الرد على الشبهات",
      topic: m.summary,
      snippet: m.scientificAnswer.slice(0, 200) + "...",
      fullContent: `ما هي الشبهة:\n${m.whatIsDoubt}\n\nدليل المشكك:\n${m.skepticProof}\n\nالجواب العلمي المفصل:\n${m.scientificAnswer}\n\nالدليل من القرآن:\n${quranText}\n\nالدليل من السنة:\n${hadithText}\n\nأقوال أئمة أهل السنة:\n${quotesText}\n\nالخلاصة:\n${m.summary}`,
      primaryReference: "منصة الهدى والنور - تحقيق علماء أهل السنة",
      tags: m.tags,
    });
  });

  // 8. Main Article Sections (11 Detailed Sections)
  mainArticleSections.forEach((sec) => {
    const quranText = sec.quranEvidences.map((q) => `${q.surah} [آية ${q.ayahNumber}]: ${q.text}`).join("\n");
    const hadithText = (sec.hadithEvidences || []).map((h) => `${h.source} (${h.authenticity}): ${h.text}`).join("\n");
    const quotesText = sec.scholarQuotes.map((s) => `${s.scholar} [${s.book}]: ${s.quote}`).join("\n");

    results.push({
      id: `article-section-${sec.number}`,
      discipline: "articles",
      disciplineLabel: DISCIPLINE_LABELS.articles,
      title: `المبحث ${sec.number}: ${sec.title}`,
      authorOrSource: "دراسة موسوعية موثقة - علوم القرآن والردود",
      topic: sec.summary,
      snippet: sec.scholarlyAnswer.slice(0, 200) + "...",
      fullContent: `البيان العلمي:\n${sec.scholarlyAnswer}\n\nالأدلة من القرآن:\n${quranText}\n\nالأدلة من السنة:\n${hadithText}\n\nأقوال أئمة التفسير:\n${quotesText}`,
      primaryReference: "موسوعة درء التعارض ونفي الاختلاف عن القرآن الكريم",
      tags: ["تناقضات القرآن", "سورة فصلت", "الجمع بين الآيات", "أيام الخلق", sec.title],
    });
  });

  // 9. Q&A Pairs
  qaDatabase.forEach((qa) => {
    results.push({
      id: qa.id,
      discipline: qa.discipline,
      disciplineLabel: DISCIPLINE_LABELS[qa.discipline] || "سؤال وجواب",
      title: qa.question,
      authorOrSource: "سؤال وجواب علمي موثق",
      topic: qa.answerSummary,
      snippet: qa.detailedAnswer.slice(0, 180) + "...",
      fullContent: `السؤال:\n${qa.question}\n\nالخلاصة:\n${qa.answerSummary}\n\nالجواب العلمي:\n${qa.detailedAnswer}\n\nالمصادر والاستشهادات:\n${qa.citations.map((c) => `• ${c.source}: ${c.text} [${c.reference}]`).join("\n")}`,
      primaryReference: qa.citations[0]?.reference || "منصة الهدى والنور",
      tags: qa.tags,
    });
  });

  return results;
}

// Unified Search Engine
export function searchUnifiedDatabase(
  query: string,
  discipline?: KnowledgeDiscipline | "all",
  options?: { limit?: number; minMatchCount?: number }
): UnifiedSearchResult[] {
  const allRecords = getAllSearchableRecords();
  const q = query.trim().toLowerCase();

  if (!q) {
    if (discipline && discipline !== "all") {
      return allRecords.filter((r) => r.discipline === discipline).slice(0, options?.limit || 20);
    }
    return allRecords.slice(0, options?.limit || 20);
  }

  // Split query into keywords
  const keywords = q
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);

  const scored = allRecords
    .map((record) => {
      let score = 0;
      const titleLower = record.title.toLowerCase();
      const topicLower = record.topic.toLowerCase();
      const contentLower = record.fullContent.toLowerCase();
      const authorLower = record.authorOrSource.toLowerCase();

      // Check discipline filter first
      if (discipline && discipline !== "all" && record.discipline !== discipline) {
        return { record, score: 0 };
      }

      // Exact phrase match
      if (titleLower.includes(q)) score += 30;
      if (topicLower.includes(q)) score += 20;
      if (contentLower.includes(q)) score += 15;

      // Keyword matches
      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 10;
        if (topicLower.includes(kw)) score += 6;
        if (authorLower.includes(kw)) score += 5;
        if (contentLower.includes(kw)) score += 3;
        if (record.tags.some((t) => t.toLowerCase().includes(kw))) score += 8;
      }

      return { record: { ...record, relevanceScore: score }, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.record);

  return scored.slice(0, options?.limit || 30);
}

// Retrieve Grounded Citations for AI Assistant (RAG Pipeline)
export function retrieveRAGContext(query: string): {
  contextText: string;
  citations: {
    id: string;
    title: string;
    author: string;
    reference: string;
    type: string;
    snippet: string;
  }[];
  hasSufficientContext: boolean;
} {
  const searchResults = searchUnifiedDatabase(query, "all", { limit: 5 });

  if (searchResults.length === 0 || (searchResults[0]?.relevanceScore || 0) < 6) {
    return {
      contextText: "",
      citations: [],
      hasSufficientContext: false,
    };
  }

  const citations = searchResults.map((r, index) => ({
    id: r.id,
    title: r.title,
    author: r.authorOrSource,
    reference: r.primaryReference,
    type: r.disciplineLabel,
    snippet: r.snippet.slice(0, 160) + "...",
  }));

  const contextText = searchResults
    .map((r, i) => {
      return `[المصدر ${i + 1}]:\nالعنوان: ${r.title}\nالجهة/المؤلف: ${r.authorOrSource}\nالتوثيق: ${r.primaryReference}\nالمحتوى المعتمد:\n${r.fullContent}\n`;
    })
    .join("\n-------------------------\n");

  return {
    contextText,
    citations,
    hasSufficientContext: true,
  };
}
