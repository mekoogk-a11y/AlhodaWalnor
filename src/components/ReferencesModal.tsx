import React from "react";
import { ReferenceSource } from "../types";
import { X, BookMarked, BookmarkCheck, Library, ExternalLink } from "lucide-react";

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  references: ReferenceSource[];
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({
  isOpen,
  onClose,
  title,
  references,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1728]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#FAF7F2] border border-[#E2DACF] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A265]/20 border border-[#C5A265]/40 flex items-center justify-center text-[#FDE68A]">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-quran text-[#FAF7F2]">
                الأدلة والمراجع العلمية الموثقة
              </h3>
              <p className="text-xs text-[#EAE3D9]/70 line-clamp-1">
                {title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DDD1] text-xs text-[#52647A] leading-relaxed flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-[#C5A265] shrink-0" />
            <span>
              جميع المصادر مستخرجة من أمهات كتب التفسير والحديث والعقيدة المعتمدة عند أئمة أهل السنة والجماعة والدراسات التخصصية الموثقة.
            </span>
          </div>

          <div className="space-y-3">
            {references.map((ref, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-[#EAE3D9] hover:border-[#C5A265]/50 shadow-xs transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-xs font-bold text-[#0F1D36]">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-[#0F1D36] text-base font-quran">
                      {ref.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#8C6D34] border border-[#EAE3D9] shrink-0">
                    {ref.category}
                  </span>
                </div>

                <div className="pr-8 space-y-1">
                  <p className="text-xs text-[#465A73] font-medium">
                    <span className="text-[#889BB0]">المؤلف:</span> {ref.author}
                  </p>
                  <p className="text-xs text-[#465A73]">
                    <span className="text-[#889BB0]">البيان والتحقيق:</span> {ref.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EFEB] border-t border-[#E5DDD1] flex items-center justify-between text-xs text-[#52647A]">
          <span>منصة الهدى والنور المعرفية الموثقة</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0F1D36] text-[#FAF7F2] hover:bg-[#1B2E4B] rounded-lg font-medium text-xs transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
