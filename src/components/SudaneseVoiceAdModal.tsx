import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Copy,
  Check,
  Radio,
  Sparkles,
  Mic,
  Share2,
} from "lucide-react";
import { ttsService } from "../utils/audioTTS";

interface SudaneseVoiceAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SUDANESE_ADS = {
  short: {
    duration: "30 ثانية",
    title: "النسخة الحماسية القصيرة (ريلز وتيك توك)",
    script: `يا زول.. أسمع الكلام دا كويس وركز معاي دقيقة واحدة!
كم مرة مرّت عليك شبهة أو سؤال في القرآن أو السنة ووقفت محتار؟
الليلة جاك الحل الشافي والرد الكافي!
منصة «الهدى والنور».. الموسوعة العلمية الموثقة لدحض الشبهات.
ما كلام والسلام.. هنا كل رد بالدليل القاطع: بالقرآن الكريم، وصحيح السنة، وأقوال الأئمة المعتمدين، ومعاها كمان «مساعد ذكي» تسألو يجيبك في ثواني!
يلا نزّل التطبيق هسي في تلفونك أو أدخل وتصفح مجاناً لوجه الله!
«الهدى والنور».. يقينك في أمان وبرهانك في الميدان!`,
    productionNotes: [
      { time: "00:00 - 00:04", tone: "مباغتة ومشوقة", sfx: "ضربة بيز خفيفة مع تصاعد إيقاعي حماسي", cue: "يا زول.. أسمع الكلام دا كويس وركز معاي دقيقة واحدة!" },
      { time: "00:05 - 00:09", tone: "تساؤل يلامس الواقع", sfx: "إيقاع وتري هادئ ومشوق", cue: "كم مرة مرّت عليك شبهة أو سؤال في القرآن أو السنة ووقفت محتار؟" },
      { time: "00:10 - 00:18", tone: "انطلاقة حماسية فخورة", sfx: "تصاعد الإيقاع الحماسي", cue: "الليلة جاك الحل الشافي والرد الكافي! منصة «الهدى والنور».. الموسوعة العلمية الموثقة." },
      { time: "00:19 - 00:25", tone: "ثقة ورسوخ", sfx: "صوت تقليب أوراق ومخطوطات عريقة", cue: "ما كلام والسلام.. كل رد بالدليل القاطع: بالقرآن، والسنة، وأقوال الأئمة، ومساعد ذكي يجاوبك فوراً!" },
      { time: "00:26 - 00:30", tone: "حسم ودعوة مباشرة", sfx: "نغمة ختامية ملهمة ومشرقة", cue: "نزّل التطبيق هسي! «الهدى والنور».. يقينك في أمان وبرهانك في الميدان!" }
    ]
  },
  full: {
    duration: "60 ثانية",
    title: "النسخة الإذاعية الكاملة (شاملة ومفصلة)",
    script: `يا زول.. كيفنك؟ أسمعني هنا وركز معاي ثواني!
في زمن كترت فيهو الشبهات والأسئلة البتشوش العقول، كم مرة قريت شبهة في السوشيال ميديا وحسيت بضيق وما لقيت رد علمي مقنع؟
أها.. الليلة جاك الخبر السمح!
منصة «الهدى والنور» جات تفرتك كل الشبهات وتخت النقاط فوق الحروف!
دا ما كلام ساي من غير دليل.. دا مشروع علمي ضخم مبني على القرآن العظيم وصحيح السنة النبوية، وتحقيقات كبار علماء أهل السنة والجماعة، ومدعم بمخطوطات ونقوش أثرية ومقارنة أديان بالتوثيق الدقيق!
وفوق دا كلو؟ عندك «المساعد الذكي» الرصين.. تسألو عن أي شبهة أو إشكال تاريخي يفتح ليك أمهات الكتب ويجيب ليك الرد بصفحتو ومصدرو في رمشة عين!
تطبيق سريع، خفيف، شغال معاك على أي تلفون وبدون نت، ومجاني مية بالمية لوجه الله تعالى!
شنو راجيهو؟ خت الشك باليقين، وثبّت تطبيق «الهدى والنور» هسي في جهازك!
«الهدى والنور».. علمٌ، وبرهان، ونورٌ يبدد كل الأوهام!`,
    productionNotes: [
      { time: "00:00 - 00:08", tone: "تحية سودانية دافئة ومباغتة", sfx: "موسيقى تصويرية سودانية أصيلة، إيقاع دافئ", cue: "يا زول.. كيفنك؟ أسمعني هنا وركز معاي ثواني! في زمن كترت فيهو الشبهات..." },
      { time: "00:09 - 00:20", tone: "تفاعل وتعاطف مع المستمع", sfx: "هدوء الإيقاع للتركيز على المشكلة", cue: "كم مرة قريت شبهة وحسيت بضيق وما لقيت رد مقنع؟ أها.. الليلة جاك الخبر السمح!" },
      { time: "00:21 - 00:38", tone: "فخر وحماس وتفصيل الإنجاز", sfx: "تصاعد الإيقاع بقوة وإشراق", cue: "منصة «الهدى والنور».. مشروع علمي ضخم مبني على القرآن والسنة، وتحقيقات الأئمة ونقوش التاريخ!" },
      { time: "00:39 - 00:48", tone: "انبهار بالمساعد الذكي", sfx: "نغمة تقنية ذكية ناصعة", cue: "ومعاك المساعد الذكي.. تسألو يرجع لأمهات الكتب ويجيب الرد بصفحتو ومصدرو في رمشة عين!" },
      { time: "00:49 - 01:00", tone: "دعوة حماسية قاطعة للعمل", sfx: "ذروة الإيقاع وتلاشي هادئ", cue: "تطبيق سريع ومجاني! ثبّت «الهدى والنور» هسي.. علمٌ وبرهان ونورٌ يبدد كل الأوهام!" }
    ]
  }
};

export const SudaneseVoiceAdModal: React.FC<SudaneseVoiceAdModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<"short" | "full">("short");
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAd = SUDANESE_ADS[selectedVersion];

  useEffect(() => {
    const unsub = ttsService.subscribe((state) => {
      setIsPlaying(state.isSpeaking && !state.isPaused);
    });
    return () => unsub();
  }, []);

  const handlePlayVoice = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      // Calibrated voice profile for energetic male Sudanese cadence:
      // pitch: 0.92 (warm deeper male voice), rate: 1.06 (enthusiastic energetic delivery)
      ttsService.speak(activeAd.script, `إعلان منصة الهدى والنور - ${activeAd.title}`, {
        pitch: 0.92,
        rate: 1.06,
        preferMale: true,
        forceRestart: true,
      });
      setIsPlaying(true);
    }
  };

  const handleStopVoice = () => {
    ttsService.stop();
    setIsPlaying(false);
  };

  const handleCopyScript = () => {
    const fullText = `🎙️ [نص الإعلان الصوتي الحماسي - منصة الهدى والنور]\n[اللهجة: العامية السودانية الأصيلة | الأداء: صوت رجل حماسي واثق]\n[المدة: ${activeAd.duration}]\n\n${activeAd.script}\n\nتوجيهات الإخراج الصوتي:\n${activeAd.productionNotes.map(n => `- [${n.time}] (${n.tone}): ${n.cue}`).join("\n")}`;
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F1D36]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl border-2 border-[#C5A265]/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0F1D36] via-[#162A4A] to-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A265]/20 border border-[#C5A265]/60 flex items-center justify-center text-[#FDE68A] shadow-inner">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5A265] text-[#0F1D36] text-xs font-bold font-sans">
                  بالعامية السودانية الأصيلة
                </span>
                <span className="text-xs text-[#E2DACF] font-semibold">
                  صوت رجل حماسي 🇸🇩
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-quran text-[#FAF7F2] mt-0.5">
                الصوت الإعلاني لمنصة «الهدى والنور»
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              handleStopVoice();
              onClose();
            }}
            className="p-2 rounded-xl text-[#E2DACF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab selector between 30s and 60s */}
        <div className="p-4 bg-white border-b border-[#EAE3D9] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 rounded-2xl border border-[#E2DACF] flex-1">
            <button
              onClick={() => {
                handleStopVoice();
                setSelectedVersion("short");
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                selectedVersion === "short"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-sm"
                  : "text-[#4B5E75] hover:text-[#0F1D36]"
              }`}
            >
              نسخة 30 ثانية (ريلز وتيك توك)
            </button>
            <button
              onClick={() => {
                handleStopVoice();
                setSelectedVersion("full");
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                selectedVersion === "full"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-sm"
                  : "text-[#4B5E75] hover:text-[#0F1D36]"
              }`}
            >
              نسخة 60 ثانية (إذاعية كاملة)
            </button>
          </div>

          <button
            onClick={handleCopyScript}
            className="px-3.5 py-2.5 rounded-xl border border-[#C5A265]/60 hover:bg-[#FAF7F2] text-[#0F1D36] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title="نسخ النص بالكامل مع التوجيهات"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#C5A265]" />}
            <span>{copied ? "تم النسخ!" : "نسخ النص"}</span>
          </button>
        </div>

        {/* Audio Player Control Bar */}
        <div className="p-4 bg-gradient-to-r from-[#FAF0E1] via-[#FAF7F2] to-[#FAF0E1] border-b border-[#EAE3D9] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayVoice}
              className={`px-5 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                isPlaying
                  ? "bg-rose-700 hover:bg-rose-800 text-white animate-pulse"
                  : "bg-[#0F1D36] hover:bg-[#1A2F50] text-[#FDE68A]"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>إيقاف القراءة الحماسية</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>تشغيل الصوت الإعلاني الآن</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                onClick={handleStopVoice}
                className="p-3 rounded-2xl bg-white border border-[#E2DACF] text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                title="إعادة من البداية"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#556982]">
            <Radio className="w-4 h-4 text-[#C5A265] animate-pulse" />
            <span>نبرة رجالية سودانية واثقة وقريبة من القلب</span>
          </div>
        </div>

        {/* Script & Voice Directions Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-right">
          {/* Main Script Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#E5DDD0] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A265]" />
                <h4 className="font-bold text-sm sm:text-base text-[#0F1D36]">
                  النص الإعلاني المقروء:
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[#8C6D34] text-xs font-bold border border-[#EAE3D9]">
                المدة المتوقعة: {activeAd.duration}
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold font-quran text-[#0F1D36] leading-loose whitespace-pre-line">
              {activeAd.script}
            </p>
          </div>

          {/* Detailed Direction & Production Beats */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm sm:text-base text-[#0F1D36] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#C5A265]" />
              <span>دليل الإخراج الصوتي والمؤثرات (Audio Storyboard):</span>
            </h5>

            <div className="space-y-2.5">
              {activeAd.productionNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 font-mono text-[#8C6D34] font-bold shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5DDD0]">
                      {note.time}
                    </span>
                    <span className="text-[#0F1D36] font-sans font-semibold">
                      [{note.tone}]
                    </span>
                  </div>

                  <p className="text-[#2A3B52] font-quran text-sm font-medium flex-1 px-2">
                    "{note.cue}"
                  </p>

                  <span className="text-[11px] text-[#6B7E96] bg-[#FAF7F2] px-2 py-1 rounded-md border border-[#F0EAE1] shrink-0">
                    🎧 {note.sfx}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Character & Recording Tips */}
          <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs sm:text-sm text-[#1E3A8A] space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <span>💡 إرشادات الأداء للمؤدي الصوتي (Voiceover Artist):</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#1E2E42] text-xs sm:text-sm">
              <li><strong>طبقة الصوت:</strong> صوت رجالي باريتون دافئ، مليء بالحياة والحميمية السودانية.</li>
              <li><strong>مخارج الحروف:</strong> لهجة سودانية فصيحة بيضاء، مفهومة لكل أهل السودان وبلاد المهجر.</li>
              <li><strong>الإيقاع (Pacing):</strong> بداية بمفاجأة وتشويق ("يا زول..")، ثم هدوء واستفسار، ثم انطلاقة حماسية فخورة بالمنصة، وختام قاطع ودعوة سريعة للتنزيل والتجربة.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3D9] flex items-center justify-between gap-3">
          <button
            onClick={handleCopyScript}
            className="px-5 py-2.5 rounded-xl bg-[#0F1D36] hover:bg-[#1A2F50] text-[#FAF7F2] text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C5A265]" />}
            <span>{copied ? "تم نسخ النص!" : "نسخ النص الإعلاني بالكامل"}</span>
          </button>

          <button
            onClick={() => {
              handleStopVoice();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl border border-[#E2DACF] text-[#465A73] hover:bg-[#FAF7F2] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
