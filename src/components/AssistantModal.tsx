import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Loader2,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  BookOpen,
  Volume2,
  ExternalLink,
  Info,
} from "lucide-react";
import { AppIconGraphic } from "./Logo";
import { ttsService } from "../utils/audioTTS";

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const DEFAULT_SUGGESTIONS = [
  "هل هناك تناقض في أيام الخلق بين 6 أيام و8 أيام في سورة فصلت؟",
  "ما الجواب العلمي على قوله تعالى «يا أخت هارون»؟",
  "كيف كشف علم الآثار الحديث حقيقة هامان وفرعون؟",
  "ما هي قاعدة ابن تيمية في استحالة تعارض العقل والنقل؟",
  "كيف نرد على من يدعي تأخر تدوين السنة النبوية؟",
  "ما هو الموقف العلمي والحديثي من حديث الذباب؟",
];

export const AssistantModal: React.FC<AssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: `**بسم الله الرحمن الرحيم**

مرحباً بك في **«مساعد الهدى والنور»** العلمي المقيد بالأصول.

أنا هنا لإعانتك في تفنيد الشبهات والاعتراضات المتعلقة بالقرآن الكريم، والسنة النبوية، والعقيدة، والتاريخ الإسلامي، مستنداً إلى القرآن العظيم، وصحيح السنة، وأقوال أئمة أهل السنة والجماعة كابن جرير الطبري وابن تيمية وابن كثير وابن القيم.

اطرح سؤالك أو اختر أحد المباحث المقترحة أدناه:`,
      timestamp: "الآن",
    },
  ]);
  const [input, setInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCitationModal, setActiveCitationModal] = useState<{
    title: string;
    author: string;
    reference: string;
    type: string;
    snippet: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && isOpen) {
      setInput(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("فشل الاتصال بالخادم العلمي");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "عذراً، لم نتمكن من الحصول على إجابة وافية حالياً، يرجى المحاولة لاحقاً.",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        modelNotice: data.notice,
        citations: data.citations || [],
        grounded: data.grounded,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "حدث خطأ أثناء معالجة السؤال. يمكنك مراجعة مباحث المقال الرئيسي المفصل في المنصة أو إعادة صياغة السؤال.",
        timestamp: "الآن",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0B1728]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#FAF7F2] border border-[#E2DACF] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[820px] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
          <div className="flex items-center gap-3">
            <AppIconGraphic size={38} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-quran text-[#FAF7F2]">
                  مساعد الهدى والنور
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C5A265]/20 text-[#FDE68A] border border-[#C5A265]/40">
                  مستشار RAG مقيد بالمصادر
                </span>
              </div>
              <p className="text-xs text-[#EAE3D9]/70 font-medium">
                رد علمي رصين بالقرآن وصحيح السنة وأقوال علماء أهل السنة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق المساعد"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Bar */}
        <div className="px-6 py-2 bg-[#F3ECE0] border-b border-[#E5DDD1] text-[11px] text-[#556982] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8934C]" />
            <span>منهج أهل السنة والجماعة | مدعم بنظام استرجاع المصادر المعتمدة</span>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  id: "msg-welcome-reset",
                  role: "assistant",
                  content: "تمت إعادة تعيين الجلسة. مرحباً بك مجدداً في مساعد الهدى والنور.",
                  timestamp: "الآن",
                },
              ])
            }
            className="text-[11px] text-[#8C6D34] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>جلسة جديدة</span>
          </button>
        </div>

        {/* Chat message flow */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-2xs ${
                  msg.role === "user"
                    ? "bg-[#0F1D36] text-[#FAF7F2]"
                    : "bg-[#B8934C] text-[#0F1D36]"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-2xs relative group ${
                  msg.role === "user"
                    ? "bg-[#0F1D36] text-[#FAF7F2] rounded-tr-xs"
                    : "bg-white border border-[#EAE3D9] text-[#1D2E44] rounded-tl-xs"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-scholarly font-normal">
                  {msg.content}
                </div>

                {/* Grounded Citation Chips */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6D34]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>المصادر المعتمدة المسترجعة من قاعدة البيانات:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveCitationModal(c)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EFE9] border border-[#E2DACF] text-[11px] text-[#0F1D36] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span className="font-bold text-[#8C6D34]">[{idx + 1}]</span>
                          <span className="truncate max-w-[180px]">{c.title}</span>
                          <ExternalLink className="w-3 h-3 text-[#7A8C9E]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msg.modelNotice && (
                  <div className="mt-2 text-[11px] text-[#8C6D34] bg-[#FAF7F2] p-2 rounded-lg border border-[#EAE3D9]">
                    {msg.modelNotice}
                  </div>
                )}

                <div
                  className={`flex items-center justify-between gap-4 mt-3 pt-2 text-[10px] border-t ${
                    msg.role === "user"
                      ? "border-white/10 text-white/60"
                      : "border-[#F0EAE1] text-[#7A8C9E]"
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center gap-2">
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => ttsService.speak(msg.content)}
                        className="hover:underline flex items-center gap-1 cursor-pointer opacity-70 group-hover:opacity-100 transition-opacity"
                        title="استمع صوتياً"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>استماع</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="hover:underline flex items-center gap-1 cursor-pointer opacity-70 group-hover:opacity-100 transition-opacity"
                      title="نسخ النص"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 flex-row items-center">
              <div className="w-8 h-8 rounded-full bg-[#B8934C] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-[#EAE3D9] rounded-2xl rounded-tl-xs p-4 flex items-center gap-3 text-sm text-[#5A6E85]">
                <Loader2 className="w-4 h-4 text-[#B8934C] animate-spin" />
                <span>جاري البحث واستحضار الأدلة من مصادر أهل السنة...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#EAE3D9] overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#7A8C9E] shrink-0 mb-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B8934C]" />
            <span>مسائل مقترحة للبحث المباشر:</span>
          </div>
          <div className="flex items-center gap-2 pb-1">
            {DEFAULT_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                disabled={loading}
                className="px-3 py-1 rounded-xl bg-white border border-[#E2DACF] hover:border-[#0F1D36] text-xs text-[#2A3B52] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t border-[#EAE3D9]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك أو الشبهة التي تريد جوابها العلمي..."
              disabled={loading}
              className="flex-1 bg-[#FAF7F2] border border-[#E2DACF] focus:border-[#0F1D36] rounded-2xl px-4 py-3 text-sm text-[#0F1D36] placeholder-[#8C9EB0] outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-2xl bg-[#0F1D36] hover:bg-[#1A2E4C] text-[#FDE68A] font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>

      {/* Citation Details Sub-Modal */}
      {activeCitationModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#EAE3D9] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0F1D36] text-[#FAF7F2]">
                  {activeCitationModal.type}
                </span>
                <h4 className="font-bold font-quran text-base text-[#0F1D36]">
                  {activeCitationModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveCitationModal(null)}
                className="p-1 rounded-lg text-[#7A8C9E] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs text-[#556982]">
              <p><span className="font-bold text-[#0F1D36]">المؤلف/الجهة:</span> {activeCitationModal.author}</p>
              <p><span className="font-bold text-[#0F1D36]">الموضع والتوثيق:</span> {activeCitationModal.reference}</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E0D2] font-scholarly text-sm leading-relaxed text-[#1B2B3E]">
              {activeCitationModal.snippet}
            </div>

            <button
              onClick={() => setActiveCitationModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0F1D36] text-[#FAF7F2] text-xs font-bold"
            >
              إغلاق نافذة المصدر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
