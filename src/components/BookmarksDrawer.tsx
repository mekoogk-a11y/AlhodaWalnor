import React, { useState, useEffect } from "react";
import { getBookmarks, removeBookmark, BookmarkItem } from "../utils/bookmarks";
import { Bookmark, X, Trash2, ExternalLink, BookOpen, Volume2 } from "lucide-react";
import { ttsService } from "../utils/audioTTS";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToItem?: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToItem,
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  const refresh = () => setBookmarks(getBookmarks());

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener("bookmarks-updated", handleUpdate);
    return () => window.removeEventListener("bookmarks-updated", handleUpdate);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="bookmarks-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-[#0B1728]/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="bookmarks-drawer-panel"
        className="bg-[#FAF7F2] w-full max-w-md h-full shadow-2xl border-r border-[#E2DACF] flex flex-col animate-in slide-in-from-left duration-300"
      >
        {/* Header */}
        <div className="p-5 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A265]/20 flex items-center justify-center text-[#FDE68A]">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold font-quran text-base">المفضلة وقائمة القراءة</h3>
              <p className="text-[11px] text-[#EAE3D9]/70">{bookmarks.length} مواد محفوظة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#EAE3D9] p-4 shadow-2xs hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#8C6D34] font-medium border border-[#E8DFC8]">
                    {item.discipline}
                  </span>
                  <span className="text-[10px] text-[#7A8C9E] font-mono">{item.addedAt}</span>
                </div>

                <h4 className="font-bold text-[#0F1D36] font-quran text-sm leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-[#4A5D73] line-clamp-2 leading-relaxed font-scholarly">
                  {item.summary}
                </p>

                <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#6A7E94] truncate max-w-[180px]">
                    {item.reference}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => ttsService.speak(item.summary, item.title)}
                      className="p-1.5 text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                      title="استمع صوتياً"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => removeBookmark(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2DACF] mx-auto flex items-center justify-center text-[#B8934C]">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="font-bold font-quran text-sm text-[#0F1D36]">لا توجد عناصر محفوظة بعد</p>
              <p className="text-xs text-[#6A7E94] max-w-xs mx-auto">
                يمكنك الضغط على أيقونة المفضلة (الحفظ) في أي آية أو حديث أو شبهة أو مقال لإضافته هنا وقراءته لاحقاً.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
