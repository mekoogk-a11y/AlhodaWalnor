import React, { useState, useEffect } from "react";
import { MisconceptionItem } from "../types";
import {
  BookOpen,
  Scroll,
  HelpCircle,
  FileQuestion,
  CheckCircle2,
  Quote,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
  Volume2,
  Bookmark,
} from "lucide-react";
import { ReferencesModal } from "./ReferencesModal";
import { ShareModal } from "./ShareModal";
import { ttsService } from "../utils/audioTTS";
import { saveBookmark, removeBookmark, isBookmarked } from "../utils/bookmarks";

interface MisconceptionCardProps {
  item: MisconceptionItem;
  defaultExpanded?: boolean;
}

export const MisconceptionCard: React.FC<MisconceptionCardProps> = ({
  item,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showReferences, setShowReferences] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setIsSaved(isBookmarked(`misc-${item.id}`));
  }, [item.id]);

  const handleToggleBookmark = () => {
    const bookmarkId = `misc-${item.id}`;
    if (isSaved) {
      removeBookmark(bookmarkId);
      setIsSaved(false);
    } else {
      saveBookmark({
        id: bookmarkId,
        title: item.title,
        discipline: "شبهات وردود",
        reference: "موسوعة الرد على الشبهات",
        summary: item.summary,
      });
      setIsSaved(true);
    }
  };

  const handleCopyCitation = () => {
    const textToCopy = `الموضوع: ${item.title}\nالخلاصة: ${item.summary}\nالمصدر: منصة الهدى والنور - https://al-huda-wa-an-noor.islamic`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      id={`misconception-${item.id}`}
      className="bg-white rounded-2xl border border-[#EAE3D9] hover:border-[#D6CBB8] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden mb-8"
    >
      {/* Top Banner / Card Header */}
      <div className="p-6 sm:p-7 border-b border-[#F0EAE1] bg-gradient-to-l from-[#FAF7F2] to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0F1D36] text-[#FDFBF7]">
              شبهة ورد علمي
            </span>
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#FAF7F2] text-[#556982] border border-[#EAE3D9]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#0F1D36] font-quran leading-snug">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
          {/* TTS Audio */}
          <button
            onClick={() => ttsService.speak(item.scientificAnswer, item.title)}
            className="p-2 rounded-lg border border-[#E2DACF] hover:bg-[#FAF7F2] text-[#465A73] transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="استمع للرد العلمي صوتياً"
          >
            <Volume2 className="w-4 h-4 text-[#B8934C]" />
            <span className="hidden sm:inline">قراءة</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-lg border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
              isSaved
                ? "bg-[#C5A265]/15 border-[#C5A265] text-[#8C6D34]"
                : "border-[#E2DACF] text-[#465A73] hover:bg-[#FAF7F2]"
            }`}
            title={isSaved ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>

          {/* Share */}
          <button
            onClick={() => setShareOpen(true)}
            className="p-2 rounded-lg border border-[#E2DACF] hover:bg-[#FAF7F2] text-[#465A73] transition-colors cursor-pointer"
            title="مشاركة الشبهة والرد"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyCitation}
            className="p-2 rounded-lg border border-[#E2DACF] hover:bg-[#FAF7F2] text-[#465A73] transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-medium"
            title="نسخ الخلاصة والتوثيق"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "تم النسخ" : "نسخ"}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg border border-[#E2DACF] hover:bg-[#FAF7F2] text-[#0F1D36] transition-colors cursor-pointer"
            aria-label={isExpanded ? "طي المحتوى" : "توسيع المحتوى"}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 sm:p-8 space-y-7 divide-y divide-[#F3EDE3]">
          {/* Section 1: ما هي الشبهة؟ */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 text-[#0F1D36]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                ما هي الشبهة؟
              </h4>
            </div>
            <p className="text-base text-[#2A3B52] leading-relaxed pr-10 font-normal">
              {item.whatIsDoubt}
            </p>
          </div>

          {/* Section 2: دليل المشكك */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-2.5 text-[#8A3B2C]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF0ED] border border-[#F3D3CC] flex items-center justify-center text-[#8A3B2C]">
                <FileQuestion className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold font-quran text-[#8A3B2C]">
                دليل المشكك
              </h4>
            </div>
            <div className="bg-[#FCF9F7] border-r-3 border-[#D98A7B] p-4 rounded-xl text-sm sm:text-base text-[#3D4C5E] leading-relaxed mr-2">
              {item.skepticProof}
            </div>
          </div>

          {/* Section 3: الجواب العلمي */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-2.5 text-[#0F1D36]">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1E3A8A]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                الجواب العلمي
              </h4>
            </div>
            <div className="bg-[#FAF7F2]/60 border border-[#E8E1D5] rounded-xl p-5 sm:p-6 text-base text-[#1E2E42] leading-relaxed font-normal shadow-2xs">
              {item.scientificAnswer}
            </div>
          </div>

          {/* Section 4: الدليل من القرآن */}
          {item.quranEvidence && item.quranEvidence.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2.5 text-[#0F1D36]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                  الدليل من القرآن
                </h4>
              </div>

              <div className="space-y-3">
                {item.quranEvidence.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#E5DDD0] space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#8C6D34] border-b border-[#EFE7DC] pb-2">
                      <span>سورة {q.surah} - الآية {q.ayahNumber}</span>
                      <span className="font-quran">مُحكم التنزيل</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold font-quran text-[#0F1D36] text-center leading-loose py-2">
                      {q.text}
                    </p>
                    {q.tafsirSummary && (
                      <p className="text-xs sm:text-sm text-[#465A73] pt-1">
                        <span className="font-semibold text-[#0F1D36]">بيان التفسير: </span>
                        {q.tafsirSummary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: الدليل من السنة */}
          {item.hadithEvidence && item.hadithEvidence.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2.5 text-[#0F1D36]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                  <Scroll className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                  الدليل من السنة
                </h4>
              </div>

              <div className="space-y-3">
                {item.hadithEvidence.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#FAF7F2]/50 border border-[#E5DDD0] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#5A6E85] pb-1 border-b border-[#EFE7DC]">
                      <span>عن {h.narrator}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
                        {h.authenticity}
                      </span>
                    </div>
                    <p className="text-base font-medium font-scholarly text-[#0F1D36] leading-relaxed pt-1">
                      {h.text}
                    </p>
                    <p className="text-xs text-[#6B7E96]">
                      <span className="font-semibold text-[#465A73]">المصدر: </span>
                      {h.source}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: أقوال علماء أهل السنة */}
          {item.scholarsQuotes && item.scholarsQuotes.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2.5 text-[#0F1D36]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                  <Quote className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                  أقوال علماء أهل السنة
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {item.scholarsQuotes.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-[#EAE3D9] hover:border-[#D9CEBE] shadow-2xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0F1D36]">
                      <span className="font-quran text-sm">{s.scholar}</span>
                      <span className="text-[#8C6D34] font-medium">
                        كتاب: {s.book} {s.volumePage ? `(${s.volumePage})` : ""}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#384A60] font-scholarly leading-relaxed pr-3 border-r-2 border-[#C5A265]">
                      «{s.quote}»
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 7: الخلاصة */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-2.5 text-[#0F1D36]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold font-quran text-[#0F1D36]">
                الخلاصة
              </h4>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#F5EFEB] border border-[#E5DDD0] text-base font-medium text-[#0F1D36] leading-relaxed">
              {item.summary}
            </div>
          </div>

          {/* Action Button: عرض الأدلة والمراجع */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowReferences(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F1D36] hover:bg-[#1A2D4C] text-[#FAF7F2] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>عرض الأدلة والمراجع</span>
              <ExternalLink className="w-4 h-4 text-[#C5A265]" />
            </button>

            <span className="text-xs text-[#7A8C9E]">
              موثق وفق منهج أهل السنة والجماعة
            </span>
          </div>
        </div>
      )}

      {/* References Modal */}
      <ReferencesModal
        isOpen={showReferences}
        onClose={() => setShowReferences(false)}
        title={item.title}
        references={item.references}
      />

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          isOpen={true}
          onClose={() => setShareOpen(false)}
          title={item.title}
          text={item.scientificAnswer}
        />
      )}
    </article>
  );
};
