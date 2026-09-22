import React from "react";
import { MisconceptionItem, CategoryId } from "../types";
import { MisconceptionCard } from "./MisconceptionCard";
import { Search, Filter, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface MisconceptionsDirectoryProps {
  items: MisconceptionItem[];
  searchQuery: string;
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onOpenAssistant: () => void;
}

export const MisconceptionsDirectory: React.FC<MisconceptionsDirectoryProps> = ({
  items,
  searchQuery,
  activeCategory,
  onSelectCategory,
  onOpenAssistant,
}) => {
  // Filter items by category & search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      activeCategory === "shubuhat" ||
      activeCategory === "encyclopedia" ||
      item.category === activeCategory;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.whatIsDoubt.toLowerCase().includes(q) ||
      item.scientificAnswer.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Directory Header */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A265]"></span>
            <span className="text-xs font-bold text-[#8C6D34] uppercase tracking-wide">
              الموسوعة الموضوعية الموحدة
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1D36] font-quran">
            دليل الشبهات والردود العلمية الموثقة
          </h2>
          <p className="text-xs sm:text-sm text-[#5C7089] mt-1 font-medium">
            كل مسألة معروضة وفق النظام الموحد: (ما هي الشبهة؟ • دليل المشكك • الجواب العلمي • الدليل من القرآن • الدليل من السنة • أقوال أئمة أهل السنة • الخلاصة)
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] text-[#0F1D36] border border-[#E2DACF] text-xs font-bold">
            {filteredItems.length} موضوع علمي
          </span>
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <MisconceptionCard key={item.id} item={item} defaultExpanded={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EAE3D9] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#E2DACF] mx-auto flex items-center justify-center text-[#B8934C]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-quran text-[#0F1D36]">
            لم نجد نتائج مطابقة لبحثك: «{searchQuery}»
          </h3>
          <p className="text-sm text-[#677B92] max-w-md mx-auto">
            يمكنك تجربة كلمات بحث أخرى أو توجيه سؤالك المباشر إلى «مساعد الهدى والنور» الذكي ليوافيك بالتحقيق العلمي.
          </p>
          <button
            onClick={onOpenAssistant}
            className="px-6 py-2.5 rounded-xl bg-[#0F1D36] text-[#FDE68A] text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <span>اسأل مساعد الهدى والنور الآن</span>
          </button>
        </div>
      )}
    </div>
  );
};
