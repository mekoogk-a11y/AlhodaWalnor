import React, { useState, useEffect } from "react";
import {
  KnowledgeDiscipline,
  UnifiedSearchResult,
} from "../data/database/types";
import {
  searchUnifiedDatabase,
  DISCIPLINE_LABELS,
} from "../data/database/unifiedDatabase";
import {
  Search,
  BookOpen,
  Scroll,
  Compass,
  Scale,
  History,
  ShieldCheck,
  Library,
  Volume2,
  Bookmark,
  Share2,
  Check,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import { ttsService } from "../utils/audioTTS";
import { saveBookmark, removeBookmark, isBookmarked } from "../utils/bookmarks";
import { ShareModal } from "./ShareModal";

interface UnifiedSearchViewProps {
  initialQuery?: string;
  initialDiscipline?: KnowledgeDiscipline | "all";
  onOpenAssistantWithQuery?: (query: string) => void;
}

const DISCIPLINES_LIST: { id: KnowledgeDiscipline | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "جميع العلوم والمصادر", icon: Library },
  { id: "quran", label: "القرآن الكريم", icon: BookOpen },
  { id: "hadith", label: "السنة والحديث", icon: Scroll },
  { id: "tafsir", label: "التفسير", icon: BookOpen },
  { id: "aqeedah", label: "العقيدة", icon: Compass },
  { id: "fiqh", label: "الفقه وأصوله", icon: Scale },
  { id: "history", label: "التاريخ والآثار", icon: History },
  { id: "comparative_religion", label: "مقارنة الأديان", icon: ShieldCheck },
  { id: "refutations", label: "الرد على الشبهات", icon: Scale },
  { id: "articles", label: "المقالات والدراسات", icon: BookOpen },
];

export const UnifiedSearchView: React.FC<UnifiedSearchViewProps> = ({
  initialQuery = "",
  initialDiscipline = "all",
  onOpenAssistantWithQuery,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedDiscipline, setSelectedDiscipline] = useState<KnowledgeDiscipline | "all">(
    initialDiscipline
  );
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [selectedRecordModal, setSelectedRecordModal] = useState<UnifiedSearchResult | null>(null);
  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const res = searchUnifiedDatabase(query, selectedDiscipline, { limit: 40 });
    setResults(res);

    // Sync saved status
    const map: Record<string, boolean> = {};
    res.forEach((r) => {
      map[r.id] = isBookmarked(r.id);
    });
    setSavedIds(map);
  }, [query, selectedDiscipline]);

  const handleToggleBookmark = (item: UnifiedSearchResult) => {
    const current = savedIds[item.id];
    if (current) {
      removeBookmark(item.id);
      setSavedIds((prev) => ({ ...prev, [item.id]: false }));
    } else {
      saveBookmark({
        id: item.id,
        title: item.title,
        discipline: item.disciplineLabel,
        reference: item.primaryReference,
        summary: item.snippet,
      });
      setSavedIds((prev) => ({ ...prev, [item.id]: true }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A265]"></span>
              <span className="text-xs font-bold text-[#8C6D34] uppercase tracking-wide">
                محرك البحث المعرفي الشامل
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1D36] font-quran">
              البحث الموحد في نصوص الوحي ومصادر أهل السنة
            </h2>
            <p className="text-xs sm:text-sm text-[#5C7089] mt-1 font-medium">
              ابحث بدقة في القرآن، وصحيح السنة، وكتب التفسير، والعقيدة، والتاريخ المقارن، والشبهات والردود.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] text-[#0F1D36] border border-[#E2DACF] text-xs font-bold">
              {results.length} نتيجة بحث
            </span>
          </div>
        </div>

        {/* Big Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8C9EB0]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بكلمة أو جزء آية، حديث، اسم كتاب، مؤلف، أو شبهة..."
            className="w-full bg-[#FAF7F2] border-2 border-[#E2DACF] focus:border-[#0F1D36] focus:bg-white text-[#0F1D36] placeholder-[#8A9BAE] text-base rounded-2xl pr-12 pl-10 py-3.5 outline-none transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-xs text-[#8A9BAE] hover:text-[#0F1D36] cursor-pointer"
            >
              مسح
            </button>
          )}
        </div>

        {/* Discipline Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F0EAE1]">
          {DISCIPLINES_LIST.map((d) => {
            const Icon = d.icon;
            const isSelected = selectedDiscipline === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDiscipline(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0F1D36] text-[#FAF7F2] border-[#0F1D36] shadow-2xs"
                    : "bg-[#FAF7F2] text-[#4A5D73] border-[#E2DACF] hover:bg-white hover:text-[#0F1D36]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Feed */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((r) => {
            const isSaved = savedIds[r.id];
            return (
              <article
                key={r.id}
                className="bg-white rounded-2xl border border-[#EAE3D9] hover:border-[#D6CBB8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#0F1D36] text-[#FAF7F2]">
                      {r.disciplineLabel}
                    </span>
                    <span className="text-xs text-[#7A8C9E] font-medium truncate max-w-xs">
                      {r.authorOrSource}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* TTS Audio */}
                    <button
                      onClick={() => ttsService.speak(r.fullContent, r.title)}
                      className="p-2 rounded-xl text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] border border-[#E2DACF] transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title="استمع صوتياً"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">قراءة</span>
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => handleToggleBookmark(r)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                        isSaved
                          ? "bg-[#C5A265]/15 border-[#C5A265] text-[#8C6D34]"
                          : "border-[#E2DACF] text-[#465A73] hover:bg-[#FAF7F2]"
                      }`}
                      title={isSaved ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                      <span className="hidden sm:inline">{isSaved ? "محفوظ" : "حفظ"}</span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => setShareData({ title: r.title, text: r.snippet })}
                      className="p-2 rounded-xl border border-[#E2DACF] text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                      title="مشاركة الفائدة"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1D36] font-quran leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#8C6D34] font-medium mt-0.5">{r.topic}</p>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E0D2] text-[#2C3E55] text-sm sm:text-base leading-relaxed font-scholarly">
                  {r.snippet}
                </div>

                <div className="pt-2 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-[#6A7E94] font-mono text-[11px] truncate max-w-sm">
                    {r.primaryReference}
                  </span>

                  <button
                    onClick={() => setSelectedRecordModal(r)}
                    className="text-xs font-bold text-[#0F1D36] hover:text-[#8C6D34] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>عرض النص الكامل والتحقيق</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EAE3D9] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#E2DACF] mx-auto flex items-center justify-center text-[#B8934C]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-quran text-[#0F1D36]">
            لم نجد نتائج مطابقة لبحثك: «{query}»
          </h3>
          <p className="text-sm text-[#677B92] max-w-md mx-auto">
            تأكد من كتابة الكلمات بدقة، أو اختر تصنيفاً آخر، أو اسأل مستشارك العلمي المباشر في المنصة.
          </p>
          {onOpenAssistantWithQuery && (
            <button
              onClick={() => onOpenAssistantWithQuery(query)}
              className="px-6 py-2.5 rounded-xl bg-[#0F1D36] text-[#FDE68A] text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#FDE68A]" />
              <span>البحث بواسطة مساعد الهدى والنور الذكي</span>
            </button>
          )}
        </div>
      )}

      {/* Full Record Modal */}
      {selectedRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1728]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#E2DACF] max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A265]/20 text-[#FDE68A] border border-[#C5A265]/40">
                  {selectedRecordModal.disciplineLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-quran text-[#FAF7F2]">
                  {selectedRecordModal.title}
                </h3>
                <p className="text-xs text-[#EAE3D9]/70">{selectedRecordModal.authorOrSource}</p>
              </div>

              <button
                onClick={() => setSelectedRecordModal(null)}
                className="p-2 rounded-xl text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 shadow-2xs whitespace-pre-wrap font-scholarly text-sm sm:text-base leading-loose text-[#1B2B3E]">
                {selectedRecordModal.fullContent}
              </div>

              <div className="p-4 bg-[#F2EBE0] rounded-2xl border border-[#E5DCD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#0F1D36]">المصدر والتوثيق الأصولي:</span>
                  <p className="text-[#556982] font-mono">{selectedRecordModal.primaryReference}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      ttsService.speak(selectedRecordModal.fullContent, selectedRecordModal.title)
                    }
                    className="px-3 py-1.5 rounded-xl bg-[#0F1D36] text-[#FDE68A] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>قراءة صوتية</span>
                  </button>

                  <button
                    onClick={() => handleToggleBookmark(selectedRecordModal)}
                    className="p-2 rounded-xl border border-[#D6CBB8] bg-white text-[#0F1D36] hover:bg-[#FAF7F2] cursor-pointer"
                    title="حفظ للمفضلة"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${savedIds[selectedRecordModal.id] ? "fill-current text-[#C5A265]" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareData && (
        <ShareModal
          isOpen={true}
          onClose={() => setShareData(null)}
          title={shareData.title}
          text={shareData.text}
        />
      )}
    </div>
  );
};
