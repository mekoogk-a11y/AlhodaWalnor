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
  Image as ImageIcon,
  ZoomIn,
} from "lucide-react";
import { AppIconGraphic } from "./Logo";
import { ttsService } from "../utils/audioTTS";
import { useLanguage } from "../i18n/LanguageContext";

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "",
}) => {
  const { language, t, isRTL } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        language === "ar"
          ? `**بسم الله الرحمن الرحيم**\n\nمرحباً بك في **«مساعد الهدى والنور»** العلمي المقيد بالأصول.\n\nأنا هنا لإعانتك في تفنيد الشبهات والاعتراضات المتعلقة بالقرآن الكريم، والسنة النبوية، والعقيدة، والتاريخ الإسلامي، مستنداً إلى القرآن العظيم، وصحيح السنة، وأقوال أئمة أهل السنة والجماعة.\n\nاطرح سؤالك أو اختر أحد المباحث المقترحة أدناه:`
          : `**Welcome to the Al-Huda wa An-Noor Scholarly Assistant**\n\nI am here to assist you in investigating doubts and objections regarding the Holy Quran, authentic Sunnah, Islamic theology, and history, firmly grounded in classical authorities (Tafsir al-Tabari, Ibn Kathir, Sahih al-Bukhari, Sahih Muslim, and classical consensus).\n\nEnter your inquiry or select a suggested topic below:`,
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

  const [activeVisualModal, setActiveVisualModal] = useState<{
    title: string;
    subtitle: string;
    category: string;
    referenceSource: string;
    caption: string;
    svgGraphic: string;
    details: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions =
    language === "ar"
      ? [
          "هل هناك تعارض في أيام الخلق بين 6 أيام و8 أيام في سورة فصلت؟",
          "ما الجواب العلمي على قوله تعالى «يا أخت هارون»؟",
          "كيف كشف علم الآثار الحديث حقيقة هامان وفرعون؟",
          "ما هي مخطوطة برمنجهام القرآنية وماذا أثبت فحص الكربون المشع؟",
          "كيف تتطابق الآية ﴿وَالْجِبَالَ أَوْتَادًا﴾ مع الجيولوجيا الحديثة؟",
          "كيف نرد على من يدعي تأخر تدوين السنة النبوية؟",
        ]
      : [
          "Is there a contradiction in the creation days (6 days vs 8 days in Surah Fussilat)?",
          "What is the classical answer to 'O Sister of Aaron' in Surah Maryam?",
          "How did modern archaeology confirm Haman under Pharaoh in Egypt?",
          "What does the Birmingham Quran manuscript prove about Quranic preservation?",
          "How does the verse 'Mountains as pegs' align with modern geophysics?",
          "How do we refute claims regarding the preservation of Hadith?",
        ];

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
      timestamp: new Date().toLocaleTimeString(isRTL ? "ar-SA" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
          language,
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
        content: data.reply || t.common.error,
        timestamp: new Date().toLocaleTimeString(isRTL ? "ar-SA" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelNotice: data.notice,
        citations: data.citations || [],
        visuals: data.visuals || [],
        grounded: data.grounded,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          language === "ar"
            ? "حدث خطأ أثناء معالجة السؤال. يمكنك مراجعة مباحث الموسوعة أو إعادة صياغة السؤال."
            : "An error occurred while retrieving scholarly records. Please try rephrasing your inquiry.",
        timestamp: "Now",
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
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
          <div className="flex items-center gap-3">
            <AppIconGraphic size={38} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-quran text-[#FAF7F2]">
                  {t.assistant.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C5A265]/20 text-[#FDE68A] border border-[#C5A265]/40">
                  {t.assistant.badge}
                </span>
              </div>
              <p className="text-xs text-[#EAE3D9]/70 font-medium">
                {t.assistant.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Bar */}
        <div className="px-6 py-2 bg-[#F3ECE0] border-b border-[#E5DDD1] text-[11px] text-[#556982] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8934C]" />
            <span>{t.assistant.sunnahBanner}</span>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  id: "msg-welcome-reset",
                  role: "assistant",
                  content:
                    language === "ar"
                      ? "تمت إعادة تعيين الجلسة. مرحباً بك مجدداً في مساعد الهدى والنور."
                      : "Session refreshed. Welcome to Al-Huda Assistant.",
                  timestamp: "الآن",
                },
              ])
            }
            className="text-[11px] text-[#8C6D34] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t.assistant.newChat}</span>
          </button>
        </div>

        {/* Chat message flow */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? (isRTL ? "flex-row-reverse" : "flex-row-reverse") : "flex-row"
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

                {/* Visual Evidences / Archaeological Artifacts Display */}
                {msg.visuals && msg.visuals.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#F0EAE1] space-y-3">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6D34]">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{t.assistant.visualEvidenceTitle}</span>
                    </div>

                    <div className="space-y-3">
                      {msg.visuals.map((vis) => (
                        <div
                          key={vis.id}
                          className="bg-[#FAF7F2] border border-[#E2DACF] rounded-2xl p-3 sm:p-4 shadow-2xs hover:border-[#B8934C] transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F1D36] text-[#FAF7F2]">
                                {vis.category}
                              </span>
                              <h5 className="font-bold text-xs sm:text-sm text-[#0F1D36] mt-1 font-quran">
                                {vis.title}
                              </h5>
                            </div>

                            <button
                              onClick={() => setActiveVisualModal(vis)}
                              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#F3ECE0] border border-[#D9CFC1] text-[11px] font-bold text-[#0F1D36] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0"
                            >
                              <ZoomIn className="w-3.5 h-3.5 text-[#B8934C]" />
                              <span>{t.assistant.viewVisualModal}</span>
                            </button>
                          </div>

                          {/* Render Inline SVG Graphic safely */}
                          <div
                            className="my-2 rounded-xl overflow-hidden border border-[#D9CFC1]/60 shadow-2xs cursor-pointer"
                            onClick={() => setActiveVisualModal(vis)}
                            dangerouslySetInnerHTML={{ __html: vis.svgGraphic }}
                          />

                          <p className="text-xs text-[#4A5D73] font-medium leading-relaxed mt-2">
                            {vis.caption}
                          </p>

                          <div className="mt-2 text-[10px] text-[#7A8C9E] flex items-center gap-1 border-t border-[#EAE3D9] pt-1.5">
                            <span className="font-bold text-[#0F1D36]">{t.assistant.reference}</span>
                            <span>{vis.referenceSource}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grounded Citation Chips */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6D34]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t.assistant.citationsTitle}</span>
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
                        title={t.common.listen}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{t.common.listen}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="hover:underline flex items-center gap-1 cursor-pointer opacity-70 group-hover:opacity-100 transition-opacity"
                      title={t.common.copy}
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>{t.common.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.common.copy}</span>
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
                <span>{t.assistant.thinking}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#EAE3D9] overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#7A8C9E] shrink-0 mb-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B8934C]" />
            <span>{t.assistant.suggestionsTitle}</span>
          </div>
          <div className="flex items-center gap-2 pb-1">
            {suggestions.map((sug, idx) => (
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
              placeholder={t.assistant.placeholder}
              disabled={loading}
              className="flex-1 bg-[#FAF7F2] border border-[#E2DACF] focus:border-[#0F1D36] rounded-2xl px-4 py-3 text-sm text-[#0F1D36] placeholder-[#8C9EB0] outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-2xl bg-[#0F1D36] hover:bg-[#1A2E4C] text-[#FDE68A] font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <span>{t.assistant.send}</span>
              <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </form>
        </div>
      </div>

      {/* Visual Evidence Fullscreen Modal */}
      {activeVisualModal && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#EAE3D9] max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD1]">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0F1D36] text-[#FAF7F2]">
                  {activeVisualModal.category}
                </span>
                <h4 className="font-bold font-quran text-lg text-[#0F1D36] mt-1">
                  {activeVisualModal.title}
                </h4>
                <p className="text-xs text-[#6B7D93] mt-0.5">
                  {activeVisualModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveVisualModal(null)}
                className="p-1.5 rounded-xl text-[#7A8C9E] hover:text-[#0F1D36] hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Render Full Graphic */}
            <div
              className="rounded-2xl overflow-hidden border border-[#D9CFC1] shadow-sm bg-[#0B132B]"
              dangerouslySetInnerHTML={{ __html: activeVisualModal.svgGraphic }}
            />

            <div className="bg-white p-4 rounded-2xl border border-[#E2DACF] space-y-2 text-xs leading-relaxed text-[#2A3D55]">
              <p className="font-bold text-[#0F1D36] text-sm font-quran">
                التحقيق العلمي والأثري:
              </p>
              <p>{activeVisualModal.details}</p>
            </div>

            <div className="bg-[#F3ECE0] p-3 rounded-xl text-xs text-[#52657A] space-y-1">
              <p>
                <span className="font-bold text-[#0F1D36]">{t.assistant.reference}</span>{" "}
                {activeVisualModal.referenceSource}
              </p>
            </div>

            <button
              onClick={() => setActiveVisualModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0F1D36] text-[#FAF7F2] text-xs font-bold hover:bg-[#1A2E4C] cursor-pointer transition-colors"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}

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
              <p>
                <span className="font-bold text-[#0F1D36]">{t.assistant.author}</span>{" "}
                {activeCitationModal.author}
              </p>
              <p>
                <span className="font-bold text-[#0F1D36]">{t.assistant.reference}</span>{" "}
                {activeCitationModal.reference}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E0D2] font-scholarly text-sm leading-relaxed text-[#1B2B3E]">
              {activeCitationModal.snippet}
            </div>

            <button
              onClick={() => setActiveCitationModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0F1D36] text-[#FAF7F2] text-xs font-bold"
            >
              {t.assistant.closeCitation}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
