import React, { useState, useEffect } from "react";
import { ttsService } from "../utils/audioTTS";
import { Volume2, Play, Pause, Square, FastForward } from "lucide-react";

export const FloatingAudioPlayer: React.FC = () => {
  const [ttsState, setTtsState] = useState(ttsService.getState());
  const [rate, setRate] = useState(1.0);

  useEffect(() => {
    return ttsService.subscribe((state) => {
      setTtsState({ ...state, rate: ttsService.getState().rate, supported: true });
    });
  }, []);

  if (!ttsState.isSpeaking && !ttsState.isPaused) {
    return null;
  }

  const handleRateCycle = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 0.8 : 1.0;
    setRate(nextRate);
    ttsService.setRate(nextRate);
  };

  return (
    <div
      id="floating-audio-bar"
      className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F1D36] text-[#FAF7F2] border-2 border-[#C5A265]/70 shadow-2xl rounded-2xl px-4 py-2.5 flex items-center gap-3 max-w-lg w-[92%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-[#C5A265]/20 flex items-center justify-center text-[#FDE68A]">
          <Volume2 className="w-4 h-4 animate-pulse" />
        </div>
        <div className="max-w-[160px] sm:max-w-[220px] truncate text-right">
          <p className="text-[11px] font-bold text-[#FDE68A] truncate font-quran">
            قراءة صوتية للمحتوى العلمي
          </p>
          <p className="text-[10px] text-[#FAF7F2]/70 truncate font-mono">
            {ttsState.text.slice(0, 35)}...
          </p>
        </div>
      </div>

      <div className="h-6 w-px bg-white/20"></div>

      <div className="flex items-center gap-1.5">
        {ttsState.isPaused ? (
          <button
            onClick={() => ttsService.resume()}
            className="p-1.5 rounded-lg bg-[#C5A265] text-[#0F1D36] hover:bg-[#D6B57E] transition-colors cursor-pointer"
            title="متابعة القراءة"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={() => ttsService.pause()}
            className="p-1.5 rounded-lg bg-[#C5A265] text-[#0F1D36] hover:bg-[#D6B57E] transition-colors cursor-pointer"
            title="إيقاف مؤقت"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>
        )}

        <button
          onClick={() => ttsService.stop()}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          title="إيقاف نهائي"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>

        <button
          onClick={handleRateCycle}
          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-[#FDE68A] transition-colors cursor-pointer flex items-center gap-0.5"
          title="سرعة القراءة"
        >
          <FastForward className="w-3 h-3" />
          <span>{rate}x</span>
        </button>
      </div>
    </div>
  );
};
