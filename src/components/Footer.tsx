import React from "react";
import { Logo } from "./Logo";
import { Sparkles, Shield, BookOpen, ExternalLink, Heart, MessageCircle, Phone } from "lucide-react";
import { CategoryId } from "../types";
import { PWAInstallButton } from "./PWAInstallButton";
import { useLanguage } from "../i18n/LanguageContext";

interface FooterProps {
  onOpenAssistant: () => void;
  onSelectCategory: (id: CategoryId) => void;
  onTabChange: (tab: "main-article" | "directory" | "about") => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAssistant,
  onSelectCategory,
  onTabChange,
}) => {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="mt-20 border-t border-[#EAE3D9] bg-white text-[#2B3F56]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity */}
          <div className="space-y-4 md:col-span-2">
            <Logo variant="compact" />
            <p className="text-sm text-[#546A84] leading-relaxed max-w-md font-scholarly font-normal">
              «الهدى والنور» منصة علمية وبحثية إسلامية موثقة متخصصة في الرد على الشبهات والاعتراضات حول القرآن الكريم والسنة النبوية والعقيدة الإسلامية، وفق منهج علماء أهل السنة والجماعة وسلف الأمة الصالح.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenAssistant}
                className="px-4 py-2 rounded-xl bg-[#0F1D36] hover:bg-[#1C3254] text-[#FDE68A] text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>{t.nav.assistant}</span>
              </button>

              <PWAInstallButton />
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0F1D36] font-quran border-b border-[#F0EAE1] pb-2">
              أقسام المنصة
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#465A73]">
              <li>
                <button
                  onClick={() => onTabChange("main-article")}
                  className="hover:text-[#0F1D36] transition-colors cursor-pointer"
                >
                  {t.tabs.scholarlyStudies}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onTabChange("directory");
                    onSelectCategory("quran");
                  }}
                  className="hover:text-[#0F1D36] transition-colors cursor-pointer"
                >
                  شبهات القرآن الكريم
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onTabChange("directory");
                    onSelectCategory("sunnah");
                  }}
                  className="hover:text-[#0F1D36] transition-colors cursor-pointer"
                >
                  شبهات السنة النبوية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onTabChange("directory");
                    onSelectCategory("aqeedah");
                  }}
                  className="hover:text-[#0F1D36] transition-colors cursor-pointer"
                >
                  شبهات العقيدة والقدر
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Methodology */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0F1D36] font-quran border-b border-[#F0EAE1] pb-2">
              الضوابط الشرعية
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#465A73]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265]"></span>
                <span>لا اجتهاد مع النص الصحيح الصريح</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265]"></span>
                <span>استحالة تعارض العقل والنقل</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265]"></span>
                <span>الجمع بين الأدلة أولى من الإلغاء</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265]"></span>
                <span>تخريج الأحاديث من الصحاح والسنن</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Callout & Design Attribution */}
        <div id="designer-credits" className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#E2DACF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-right">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F1D36] text-[#FDFBF7]">
                منظمة الهداية
              </span>
              <span className="text-xs font-semibold text-[#8C6D34] flex items-center gap-1.5 bg-[#F6EEDF] px-3 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>نرجوا دعم الموقع لتعم الفائدة</span>
              </span>
            </div>
            <p className="text-sm font-semibold text-[#2A3C52]">
              جميع الحقوق ملك لمنظمة الهداية
            </p>
            <p className="text-xs text-[#5D7189]">
              نسأل الله تعالى أن يجعل هذا العمل خالصاً لوجهه الكريم ونافعاً لعموم المسلمين والباحثين عن الحق.
            </p>
          </div>

          {/* Designer attribution & WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="text-center sm:text-right bg-white px-4 py-2.5 rounded-xl border border-[#EAE3D9] shadow-2xs">
              <span className="text-[11px] text-[#7A8C9E] font-medium block">تصميم وبرمجة</span>
              <span className="text-sm font-extrabold text-[#0F1D36] font-quran">كمال جعفر زكريا</span>
            </div>

            <a
              id="whatsapp-contact-button"
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95"
              title="تواصل عبر الواتساب: 00249919980435"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>واتساب:</span>
              <span dir="ltr" className="tracking-wide">00249919980435</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8C9E]">
          <p>
            جميع الحقوق ملك لمنظمة الهداية © {new Date().getFullYear()} | تصميم: كمال جعفر زكريا (واتساب: 00249919980435) | نرجوا دعم الموقع لتعم الفائدة
          </p>
          <p className="font-quran">﴿قُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾</p>
        </div>
      </div>
    </footer>
  );
};
