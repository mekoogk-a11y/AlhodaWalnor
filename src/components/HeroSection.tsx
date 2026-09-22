import React from "react";
import { Logo } from "./Logo";
import {
  Search,
  BookOpen,
  Scroll,
  Compass,
  BookMarked,
  FileCheck,
  GraduationCap,
  Scale,
  Library,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { CategoryId } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onOpenAssistant: () => void;
}

const CATEGORY_LABELS_AR: Record<CategoryId, string> = {
  all: "الكل",
  shubuhat: "الشبهات",
  quran: "القرآن الكريم",
  sunnah: "السنة النبوية",
  aqeedah: "العقيدة",
  uloom_quran: "علوم القرآن",
  uloom_hadith: "علوم الحديث",
  scholars: "أقوال العلماء",
  rebuttals: "الردود العلمية",
  encyclopedia: "الموسوعة",
  assistant: "المساعد الذكي",
};

const CATEGORY_LABELS_EN: Record<CategoryId, string> = {
  all: "All",
  shubuhat: "Misconceptions",
  quran: "Holy Quran",
  sunnah: "Prophetic Sunnah",
  aqeedah: "Creed & Faith",
  uloom_quran: "Quran Sciences",
  uloom_hadith: "Hadith Sciences",
  scholars: "Scholars",
  rebuttals: "Rebuttals",
  encyclopedia: "Encyclopedia",
  assistant: "Smart Assistant",
};

const CATEGORY_BUTTONS: { id: CategoryId; icon: React.ElementType }[] = [
  { id: "shubuhat", icon: ShieldAlert },
  { id: "quran", icon: BookOpen },
  { id: "sunnah", icon: Scroll },
  { id: "aqeedah", icon: Compass },
  { id: "uloom_quran", icon: BookMarked },
  { id: "uloom_hadith", icon: FileCheck },
  { id: "scholars", icon: GraduationCap },
  { id: "rebuttals", icon: Scale },
  { id: "encyclopedia", icon: Library },
  { id: "assistant", icon: Sparkles },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onOpenAssistant,
}) => {
  const { t, language, isRTL } = useLanguage();

  const getCategoryLabel = (id: CategoryId) => {
    if (language === "ar") return CATEGORY_LABELS_AR[id] || id;
    return CATEGORY_LABELS_EN[id] || CATEGORY_LABELS_AR[id] || id;
  };

  return (
    <section className="py-10 sm:py-16 px-4 text-center relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background glow & subtle scholarly motifs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#C5A265]/10 via-[#FDFBF7]/40 to-transparent blur-3xl -z-10 pointer-events-none rounded-full"></div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo and Tagline */}
        <Logo variant="main" showTagline={true} />

        {/* Large Main Search Box */}
        <div className="relative max-w-2xl mx-auto pt-2">
          <div className="relative group">
            <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-5" : "left-0 pl-5"} flex items-center pointer-events-none text-[#8C9EB0] group-focus-within:text-[#0F1D36] transition-colors`}>
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className={`w-full bg-white border-2 border-[#E2DACF] focus:border-[#0F1D36] text-[#0F1D36] placeholder-[#8A9BAE] text-base sm:text-lg rounded-2xl ${
                isRTL ? "pr-13 pl-12" : "pl-13 pr-12"
              } py-4 sm:py-4.5 shadow-sm hover:border-[#D6CBB8] transition-all outline-none`}
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className={`absolute inset-y-0 ${isRTL ? "left-0 pl-4" : "right-0 pr-4"} flex items-center text-xs text-[#8A9BAE] hover:text-[#0F1D36] cursor-pointer`}
              >
                {language === "ar" ? "مسح" : "Clear"}
              </button>
            )}
          </div>
        </div>

        {/* The 10 Category Buttons */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
            {CATEGORY_BUTTONS.map((btn) => {
              const Icon = btn.icon;
              const isSelected = activeCategory === btn.id;
              const isAssistant = btn.id === "assistant";
              const label = getCategoryLabel(btn.id);

              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    if (isAssistant) {
                      onOpenAssistant();
                    } else {
                      onSelectCategory(btn.id);
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#0F1D36] text-[#FAF7F2] border-[#0F1D36] shadow-xs"
                      : isAssistant
                      ? "bg-gradient-to-r from-[#0F1D36] to-[#1E3A5F] text-[#FDE68A] border-[#C5A265]/50 hover:border-[#C5A265] shadow-xs"
                      : "bg-white text-[#2B3F56] border-[#E2DACF] hover:border-[#C5A265] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isAssistant ? "text-[#FDE68A]" : isSelected ? "text-[#C5A265]" : "text-[#7B8EA5]"}`} />
                  <span className="font-quran whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
