import React, { useState } from "react";
import { X, Copy, Check, Share2, Send, MessageCircle } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  url = typeof window !== "undefined" ? window.location.href : "https://al-huda-wa-an-noor.islamic",
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullShareText = `${title}\n\n${text ? text.slice(0, 150) + "...\n\n" : ""}منصة «الهدى والنور» العلمية:\n${url}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareText)}`, "_blank");
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1728]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAE3D9] max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold font-quran text-lg text-[#0F1D36]">مشاركة الفائدة العلمية</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7A8C9E] hover:text-[#0F1D36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E0D2] text-xs font-scholarly leading-relaxed text-[#2C3E55]">
          <p className="font-bold text-[#0F1D36] mb-1">{title}</p>
          {text && <p className="text-[#5A6D83] line-clamp-3">{text}</p>}
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={handleWhatsApp}
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>واتساب</span>
          </button>

          <button
            onClick={handleTelegram}
            className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-5 h-5 text-sky-600" />
            <span>تيليجرام</span>
          </button>

          <button
            onClick={handleTwitter}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="text-base font-bold">𝕏</span>
            <span>منصة إكس</span>
          </button>
        </div>

        {/* Copy Link button */}
        <button
          onClick={handleCopy}
          className="w-full py-3 px-4 rounded-xl bg-[#0F1D36] hover:bg-[#1A2E4C] text-[#FAF7F2] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "تم نسخ النص والرابط بنجاح" : "نسخ النص ورابط التوثيق"}</span>
        </button>
      </div>
    </div>
  );
};
