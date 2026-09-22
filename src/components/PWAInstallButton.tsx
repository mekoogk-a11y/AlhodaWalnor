import React, { useState } from "react";
import { Download, CheckCircle, Smartphone, Share2, PlusSquare, X } from "lucide-react";
import { usePWAInstall } from "../utils/usePWAInstall";
import { useLanguage } from "../i18n/LanguageContext";

interface PWAInstallButtonProps {
  className?: string;
  variant?: "nav" | "hero" | "mobileDrawer";
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = "",
  variant = "nav",
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t, isRTL } = useLanguage();
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleClick = async () => {
    if (isInstalled) return;

    if (isInstallable) {
      const success = await install();
      if (!success && isIOS) {
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  if (isInstalled) {
    if (variant === "mobileDrawer") {
      return (
        <div className={`w-full p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between text-xs font-bold ${className}`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.install.installed}</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-normal">PWA</span>
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold select-none ${className}`}
        title={t.install.installed}
      >
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>{t.install.installed}</span>
      </div>
    );
  }

  return (
    <>
      {variant === "hero" ? (
        <button
          onClick={handleClick}
          className={`px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#C5A265]/60 text-[#0F1D36] font-bold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:border-[#0F1D36] ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#C5A265]" />
          <span>{t.install.buttonTitle}</span>
        </button>
      ) : variant === "mobileDrawer" ? (
        <button
          onClick={handleClick}
          className={`w-full p-3 rounded-xl bg-gradient-to-r from-[#0F1D36] to-[#1C335A] text-[#FDE68A] flex items-center justify-between text-xs font-bold cursor-pointer shadow-xs ${className}`}
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#FDE68A]" />
            <span>{t.install.buttonTitle}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">
            PWA
          </span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F1D36] hover:bg-[#1A2E4C] text-[#FDE68A] text-xs font-bold transition-colors cursor-pointer shadow-2xs ${className}`}
          title={t.install.buttonTitle}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.install.buttonTitle}</span>
        </button>
      )}

      {/* Guide Modal for browsers without direct prompt or on iOS */}
      {showGuideModal && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-[#FAF7F2] rounded-3xl border border-[#E2DACF] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0F1D36] flex items-center justify-center text-[#FDE68A]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-bold font-quran text-base text-[#0F1D36]">
                  {t.install.modalTitle}
                </h4>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-[#7A8C9E] hover:text-[#0F1D36]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#556982] leading-relaxed">
              {t.install.instructions}
            </p>

            <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-[#EAE3D9] text-xs text-[#2C3E55]">
              <div className="flex items-start gap-2.5">
                <Share2 className="w-4 h-4 text-[#B8934C] shrink-0 mt-0.5" />
                <p>{t.install.iosStep1}</p>
              </div>

              <div className="flex items-start gap-2.5">
                <PlusSquare className="w-4 h-4 text-[#B8934C] shrink-0 mt-0.5" />
                <p>{t.install.iosStep2}</p>
              </div>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F1D36] text-[#FAF7F2] text-xs font-bold hover:bg-[#1A2E4C] cursor-pointer transition-colors"
            >
              {t.install.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
