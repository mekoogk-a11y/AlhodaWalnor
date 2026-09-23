// Web Speech Synthesis Utility for Al-Huda wa An-Noor
class AudioTTSController {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private listeners: ((state: { isSpeaking: boolean; isPaused: boolean; text: string }) => void)[] = [];
  private currentText = "";
  private currentRate = 1.0;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(callback: (state: { isSpeaking: boolean; isPaused: boolean; text: string }) => void) {
    this.listeners.push(callback);
    callback({
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      text: this.currentText,
    });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    const state = {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      text: this.currentText,
    };
    this.listeners.forEach((cb) => cb(state));
  }

  public speak(
    text: string,
    title?: string,
    options?: { pitch?: number; rate?: number; forceRestart?: boolean; preferMale?: boolean }
  ) {
    if (!this.synth) {
      console.warn("Speech synthesis is not supported in this environment.");
      return;
    }

    // If currently speaking the exact same text and not forcing restart, toggle pause/resume
    if (!options?.forceRestart && this.isSpeaking && this.currentText === (title || text)) {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
      return;
    }

    // Stop previous utterance
    this.stop();

    // Clean markdown symbols for natural vocalization
    const cleanedText = text
      .replace(/[*#_`>]/g, "")
      .replace(/\[المصدر \d+\]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    if (!cleanedText) return;

    this.currentText = title || text;
    this.currentUtterance = new SpeechSynthesisUtterance(cleanedText);
    this.currentUtterance.rate = options?.rate ?? this.currentRate;
    if (options?.pitch !== undefined) {
      this.currentUtterance.pitch = options.pitch;
    }
    this.currentUtterance.lang = "ar-SA";

    // Try finding an Arabic voice (preferring male if requested)
    const voices = this.synth.getVoices();
    let arabicVoice: SpeechSynthesisVoice | undefined;
    if (options?.preferMale) {
      arabicVoice = voices.find(
        (v) =>
          v.lang.startsWith("ar") &&
          (v.name.toLowerCase().includes("male") ||
            v.name.toLowerCase().includes("maged") ||
            v.name.toLowerCase().includes("tarik") ||
            v.name.toLowerCase().includes("naayf") ||
            v.name.includes("رجل") ||
            v.name.includes("ماجد") ||
            v.name.includes("طارق"))
      );
    }
    if (!arabicVoice) {
      arabicVoice =
        voices.find((v) => v.lang.startsWith("ar")) ||
        voices.find((v) => v.name.toLowerCase().includes("arabic") || v.name.includes("عربي"));
    }
    if (arabicVoice) {
      this.currentUtterance.voice = arabicVoice;
    }

    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify();
    };

    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = "";
      this.notify();
    };

    this.currentUtterance.onerror = (e) => {
      console.warn("TTS Error:", e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = "";
      this.notify();
    };

    this.synth.speak(this.currentUtterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isSpeaking && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentText = "";
    this.notify();
  }

  public setRate(rate: number) {
    this.currentRate = rate;
    if (this.currentUtterance && this.isSpeaking) {
      const remainingText = this.currentText;
      this.stop();
      this.speak(remainingText);
    }
  }

  public getState() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      text: this.currentText,
      rate: this.currentRate,
      supported: Boolean(this.synth),
    };
  }
}

export const ttsService = new AudioTTSController();
