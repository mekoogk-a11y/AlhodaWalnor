import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MainArticleView } from "./components/MainArticleView";
import { MisconceptionsDirectory } from "./components/MisconceptionsDirectory";
import { AboutMethodologyView } from "./components/AboutMethodologyView";
import { AssistantModal } from "./components/AssistantModal";
import { Footer } from "./components/Footer";
import { misconceptionsDatabase } from "./data/misconceptionsData";
import { CategoryId } from "./types";
import { Sparkles, ArrowUp } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"main-article" | "directory" | "about">("main-article");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && currentTab === "about") {
      setCurrentTab("directory");
    }
  };

  const handleSelectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    if (id === "all" || id === "shubuhat" || id === "encyclopedia" || id === "rebuttals") {
      setCurrentTab("directory");
    } else {
      setCurrentTab("directory");
    }
    // Scroll smoothly to directory
    const dirEl = document.getElementById("content-area");
    if (dirEl) {
      dirEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenAssistantWithQuery = (query?: string) => {
    if (query) {
      setAssistantInitialQuery(query);
    }
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F1D36] flex flex-col font-sans selection:bg-[#C5A265]/20 selection:text-[#0F1D36]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
        onSelectCategory={handleSelectCategory}
      />

      {/* Top Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div id="content-area" className="max-w-5xl mx-auto px-4 w-full mb-8 scroll-mt-24">
        <div className="bg-white p-1.5 rounded-2xl border border-[#EAE3D9] flex items-center justify-center gap-1 shadow-2xs">
          <button
            onClick={() => setCurrentTab("main-article")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center ${
              currentTab === "main-article"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            المقال الموسوعي الأول: دعوى تناقضات القرآن (11 قسماً)
          </button>

          <button
            onClick={() => setCurrentTab("directory")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center ${
              currentTab === "directory"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            موسوعة الشبهات والردود الموحدة
          </button>

          <button
            onClick={() => setCurrentTab("about")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center hidden sm:block ${
              currentTab === "about"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            المنهج العلمي والمصادر
          </button>
        </div>
      </div>

      {/* Dynamic Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        {currentTab === "main-article" && <MainArticleView />}

        {currentTab === "directory" && (
          <MisconceptionsDirectory
            items={misconceptionsDatabase}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            onOpenAssistant={() => handleOpenAssistantWithQuery()}
          />
        )}

        {currentTab === "about" && <AboutMethodologyView />}
      </main>

      {/* Floating Smart Assistant Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => handleOpenAssistantWithQuery()}
          className="group px-4 py-3 rounded-2xl bg-[#0F1D36] hover:bg-[#192F50] text-[#FDE68A] shadow-xl border-2 border-[#C5A265]/70 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer"
          title="افتح مساعد الهدى والنور"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#FDE68A] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <span className="text-xs sm:text-sm font-bold font-quran text-[#FAF7F2]">
            مساعد الهدى والنور
          </span>
        </button>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white border border-[#E2DACF] text-[#0F1D36] shadow-md hover:bg-[#FAF7F2] transition-all cursor-pointer"
          aria-label="العودة لأعلى الصفحة"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Smart Islamic Assistant Modal */}
      <AssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialQuery={assistantInitialQuery}
      />

      {/* Footer */}
      <Footer
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
        onSelectCategory={handleSelectCategory}
        onTabChange={setCurrentTab}
      />
    </div>
  );
}
