import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../i18n/translations";
import { LanguageCode, LanguageOption } from "../i18n/types";

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find((l: LanguageOption) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EAE1] border border-[#E2DACF] text-xs font-bold text-[#0F1D36] transition-colors cursor-pointer shadow-2xs"
        aria-label="تغيير اللغة / Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#B8934C]" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-[#7A8C9E] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-56 bg-white border border-[#E2DACF] rounded-2xl shadow-xl z-50 py-1.5 max-h-80 overflow-y-auto ${
            isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right"
          } animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#7A8C9E] uppercase tracking-wider border-b border-[#F0EAE1]">
            اختر اللغة / Select Language (12)
          </div>
          {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as LanguageCode);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-start flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#FAF7F2] text-[#0F1D36] font-bold"
                    : "text-[#4A5D73] hover:bg-[#FAF7F2] hover:text-[#0F1D36]"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-xs">{lang.nativeName}</span>
                  <span className="text-[10px] text-[#7A8C9E]">{lang.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#B8934C]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
