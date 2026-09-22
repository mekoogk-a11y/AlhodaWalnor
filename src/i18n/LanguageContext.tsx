import React, { createContext, useContext, useEffect, useState } from "react";
import { LanguageCode, LanguageOption, TranslationDictionary } from "./types";
import { AVAILABLE_LANGUAGES, translations } from "./translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
  t: TranslationDictionary;
  currentLanguage: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "al_huda_selected_lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode;
      if (saved && translations[saved]) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
      if (browserLang && (browserLang in translations)) {
        return browserLang as LanguageCode;
      }
    }
    return "ar";
  });

  const currentLanguage = AVAILABLE_LANGUAGES.find((l) => l.code === language) || AVAILABLE_LANGUAGES[0];
  const isRTL = currentLanguage.dir === "rtl";

  const setLanguage = (newLang: LanguageCode) => {
    if (translations[newLang]) {
      setLanguageState(newLang);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, newLang);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = currentLanguage.dir;
      // Also adjust class if needed for fonts
      if (isRTL) {
        document.documentElement.classList.add("rtl-mode");
        document.documentElement.classList.remove("ltr-mode");
      } else {
        document.documentElement.classList.add("ltr-mode");
        document.documentElement.classList.remove("rtl-mode");
      }
    }
  }, [language, currentLanguage, isRTL]);

  const t = translations[language] || translations.ar;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        t,
        currentLanguage,
        availableLanguages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
