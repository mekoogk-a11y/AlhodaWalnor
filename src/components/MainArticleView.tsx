import React, { useState } from "react";
import { mainArticleIntro, mainArticleSections } from "../data/mainArticle";
import { ArticleSection } from "../types";
import {
  BookOpen,
  Scroll,
  HelpCircle,
  FileQuestion,
  CheckCircle2,
  Quote,
  Sparkles,
  ExternalLink,
  Bookmark,
  Share2,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  List,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { ReferencesModal } from "./ReferencesModal";

export const MainArticleView: React.FC = () => {
  const [selectedSectionModal, setSelectedSectionModal] = useState<ArticleSection | null>(null);
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Article Header Card */}
      <header className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#C5A265]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0EAE1] pb-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F1D36] text-[#FAF7F2]">
              دراسة موسوعية موثقة
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF7F2] text-[#8C6D34] border border-[#E8DFC8]">
              علوم القرآن ورد الشبهات
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font size adjustment */}
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E2DACF] text-xs font-medium text-[#465A73]">
              <button
                onClick={() => setFontSizeOffset((prev) => Math.max(-2, prev - 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="تصغير الخط"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[11px] font-mono">حجم الخط</span>
              <button
                onClick={() => setFontSizeOffset((prev) => Math.min(4, prev + 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="تكبير الخط"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share / Copy */}
            <button
              onClick={handleCopyLink}
              className="p-2 bg-[#FAF7F2] hover:bg-[#F3EFE9] border border-[#E2DACF] rounded-xl text-[#0F1D36] text-xs flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
              title="مشاركة رابط البحث"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? "تم النسخ" : "مشاركة"}</span>
            </button>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1D36] font-quran leading-tight sm:leading-snug mb-6">
          {mainArticleIntro.title}
        </h1>

        {/* Basmalah */}
        <div className="text-center my-6">
          <span className="text-2xl sm:text-3xl font-bold font-quran text-[#B8934C] tracking-wide inline-block py-2 px-6 rounded-2xl bg-[#FAF7F2]/80 border border-[#EAE3D9]">
            {mainArticleIntro.basmalah}
          </span>
        </div>

        {/* Preamble */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] text-[#24354A] text-base sm:text-lg leading-relaxed space-y-4 font-normal">
          {mainArticleIntro.preamble.split("\n\n").map((para, i) => (
            <p key={i} className="text-justify font-scholarly leading-loose">
              {para}
            </p>
          ))}
        </div>

        {/* Quick Table of Contents (الفهرس التفاعلي) */}
        <div className="mt-8 border border-[#EAE3D9] rounded-2xl p-5 bg-white">
          <div
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                <List className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#0F1D36] font-quran">
                فهرس مباحث الدراسة (11 قسماً علمياً)
              </span>
            </div>
            <button className="text-xs font-medium text-[#8C6D34] flex items-center gap-1">
              <span>{tocOpen ? "إخفاء الفهرس" : "عرض الفهرس"}</span>
              {tocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {tocOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-[#F0EAE1]">
              {mainArticleSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-right p-2.5 rounded-xl hover:bg-[#FAF7F2] border border-transparent hover:border-[#E2DACF] transition-all text-xs font-medium text-[#2E4259] flex items-start gap-2 group cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 group-hover:bg-[#C5A265] transition-colors">
                    {sec.number}
                  </span>
                  <span className="line-clamp-2 leading-relaxed font-quran">
                    {sec.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Structured Sections Loop (11 Sections) */}
      <main className="space-y-10">
        {mainArticleSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-9 shadow-xs space-y-7 transition-all duration-300 scroll-mt-24"
          >
            {/* Section Header */}
            <div className="border-b border-[#F0EAE1] pb-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-9 h-9 rounded-xl bg-[#0F1D36] text-[#FDFBF7] flex items-center justify-center text-sm font-bold font-quran shadow-xs">
                  {section.number}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F1D36] font-quran leading-snug">
                  {section.title}
                </h2>
              </div>
              {section.subtitle && (
                <p className="text-xs sm:text-sm text-[#5C7089] pr-12 font-medium">
                  {section.subtitle}
                </p>
              )}
            </div>

            {/* Block 1: الاعتراض (دليل المشكك) */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-[#8A3B2C]">
                <div className="w-7 h-7 rounded-lg bg-[#FAF0ED] border border-[#F3D3CC] flex items-center justify-center text-[#8A3B2C]">
                  <FileQuestion className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold font-quran text-[#8A3B2C]">
                  الاعتراض (دليل المشكك)
                </h3>
              </div>
              <div className="bg-[#FCF9F7] border-r-3 border-[#D98A7B] p-4 sm:p-5 rounded-xl text-sm sm:text-base text-[#3C4A5A] leading-relaxed mr-1">
                {section.objection}
              </div>
            </div>

            {/* Block 2: الجواب العلمي */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-[#0F1D36]">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1E3A8A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold font-quran text-[#0F1D36]">
                  الجواب العلمي والتحقيق المنهجي
                </h3>
              </div>
              <div
                className="bg-[#FAF7F2]/70 border border-[#E8E1D5] rounded-2xl p-5 sm:p-6 text-[#1A2A3E] leading-relaxed font-normal shadow-2xs font-scholarly"
                style={{ fontSize: `${16 + fontSizeOffset}px` }}
              >
                {section.scholarlyAnswer}
              </div>
            </div>

            {/* Block 3: الأدلة القرآنية */}
            {section.quranEvidences && section.quranEvidences.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[#0F1D36]">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-base font-bold font-quran text-[#0F1D36]">
                    الدليل من القرآن الكريم
                  </h3>
                </div>

                <div className="space-y-3">
                  {section.quranEvidences.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#E5DDD0] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-[#8C6D34] border-b border-[#EFE7DC] pb-2">
                        <span>سورة {q.surah} - الآية {q.ayahNumber}</span>
                        <span className="font-quran">مُحكم الآيات</span>
                      </div>
                      <p
                        className="font-bold font-quran text-[#0F1D36] text-center leading-loose py-2"
                        style={{ fontSize: `${20 + fontSizeOffset}px` }}
                      >
                        {q.text}
                      </p>
                      {q.tafsirSummary && (
                        <div className="text-xs sm:text-sm text-[#465A73] pt-1 border-t border-[#F2ECE3]">
                          <span className="font-bold text-[#0F1D36]">وجه الدلالة والتفسير: </span>
                          <span>{q.tafsirSummary}</span>
                          {q.tafsirSource && (
                            <span className="text-[#8C6D34] mr-2">[{q.tafsirSource}]</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Block 4: الأحاديث النبوية */}
            {section.hadithEvidences && section.hadithEvidences.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[#0F1D36]">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                    <Scroll className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-base font-bold font-quran text-[#0F1D36]">
                    الدليل من السنة النبوية الصحيحة
                  </h3>
                </div>

                <div className="space-y-3">
                  {section.hadithEvidences.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF7F2]/60 border border-[#E5DDD0] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-[#5A6E85] pb-1 border-b border-[#EFE7DC]">
                        <span>عن {h.narrator}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
                          {h.authenticity}
                        </span>
                      </div>
                      <p
                        className="font-medium font-scholarly text-[#0F1D36] leading-relaxed pt-1"
                        style={{ fontSize: `${17 + fontSizeOffset}px` }}
                      >
                        {h.text}
                      </p>
                      <p className="text-xs text-[#6B7E96] pt-1">
                        <span className="font-semibold text-[#465A73]">التخريج المعتمد: </span>
                        {h.source}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Block 5: أقوال علماء أهل السنة */}
            {section.scholarQuotes && section.scholarQuotes.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[#0F1D36]">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                    <Quote className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-base font-bold font-quran text-[#0F1D36]">
                    أقوال علماء أهل السنة والجماعة
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {section.scholarQuotes.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#EAE3D9] hover:border-[#D9CEBE] shadow-2xs space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#0F1D36]">
                        <span className="font-quran text-sm text-[#0F1D36]">{s.scholar}</span>
                        <span className="text-[#8C6D34] font-medium bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#EAE3D9]">
                          {s.book} {s.volumePage ? `(${s.volumePage})` : ""}
                        </span>
                      </div>
                      <p
                        className="text-[#384A60] font-scholarly leading-relaxed pr-3 border-r-3 border-[#C5A265]"
                        style={{ fontSize: `${16 + fontSizeOffset}px` }}
                      >
                        «{s.quote}»
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Block 6: الخلاصة */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-[#0F1D36]">
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold font-quran text-[#0F1D36]">
                  الخلاصة والنتيجة المنهجية
                </h3>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-[#F5EFEB] border border-[#E5DDD0] text-sm sm:text-base font-semibold text-[#0F1D36] leading-relaxed">
                {section.summary}
              </div>
            </div>

            {/* Action: عرض الأدلة والمراجع */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#F2ECE3]">
              <button
                onClick={() => setSelectedSectionModal(section)}
                className="px-5 py-2.5 rounded-xl bg-[#0F1D36] hover:bg-[#1A2D4C] text-[#FAF7F2] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <span>عرض الأدلة والمراجع المعتمدة</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A265]" />
              </button>

              <span className="text-xs text-[#7A8C9E]">
                المبحث رقم {section.number} من أصل 11
              </span>
            </div>
          </section>
        ))}
      </main>

      {/* Modal for section references */}
      {selectedSectionModal && (
        <ReferencesModal
          isOpen={Boolean(selectedSectionModal)}
          onClose={() => setSelectedSectionModal(null)}
          title={selectedSectionModal.title}
          references={selectedSectionModal.references}
        />
      )}
    </div>
  );
};
