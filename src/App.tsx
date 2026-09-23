import React, { useState } from "react";
import { Navbar, NavTabType } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MainArticleView } from "./components/MainArticleView";
import { MisconceptionsDirectory } from "./components/MisconceptionsDirectory";
import { UnifiedSearchView } from "./components/UnifiedSearchView";
import { AboutMethodologyView } from "./components/AboutMethodologyView";
import { AssistantModal } from "./components/AssistantModal";
import { BookmarksDrawer } from "./components/BookmarksDrawer";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { SudaneseVoiceAdModal } from "./components/SudaneseVoiceAdModal";
import { FloatingAudioPlayer } from "./components/FloatingAudioPlayer";
import { Footer } from "./components/Footer";
import { misconceptionsDatabase } from "./data/misconceptionsData";
import { CategoryId } from "./types";
import { Sparkles, ArrowUp } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";

export default function App() {
  const { t, isRTL } = useLanguage();
  const [currentTab, setCurrentTab] = useState<NavTabType>("main-article");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSudaneseAdOpen, setIsSudaneseAdOpen] = useState(false);
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
    if (query.trim().length > 0 && currentTab !== "search") {
      setCurrentTab("search");
    }
  };

  const handleSelectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setCurrentTab("directory");

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
    <div
      className="min-h-screen bg-[#FAF7F2] text-[#0F1D36] flex flex-col font-sans selection:bg-[#C5A265]/20 selection:text-[#0F1D36]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
        onSelectCategory={handleSelectCategory}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Top Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
        onOpenSudaneseAd={() => setIsSudaneseAdOpen(true)}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div id="content-area" className="max-w-5xl mx-auto px-4 w-full mb-8 scroll-mt-24">
        <div className="bg-white p-1.5 rounded-2xl border border-[#EAE3D9] flex flex-wrap items-center justify-center gap-1 shadow-2xs">
          <button
            onClick={() => setCurrentTab("main-article")}
            className={`flex-1 min-w-[200px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center ${
              currentTab === "main-article"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            {t.tabs.scholarlyStudies}
          </button>

          <button
            onClick={() => setCurrentTab("directory")}
            className={`flex-1 min-w-[160px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center ${
              currentTab === "directory"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            {t.tabs.directory}
          </button>

          <button
            onClick={() => setCurrentTab("search")}
            className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center ${
              currentTab === "search"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            {t.tabs.searchEngine}
          </button>

          <button
            onClick={() => setCurrentTab("about")}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold font-quran transition-all cursor-pointer text-center hidden md:block ${
              currentTab === "about"
                ? "bg-[#0F1D36] text-[#FAF7F2] shadow-xs"
                : "text-[#4B5E75] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
            }`}
          >
            {t.tabs.methodology}
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

        {currentTab === "search" && (
          <UnifiedSearchView
            initialQuery={searchQuery}
            onOpenAssistantWithQuery={handleOpenAssistantWithQuery}
          />
        )}

        {currentTab === "about" && <AboutMethodologyView />}
      </main>

      {/* Floating Smart Assistant Button */}
      <div className={`fixed bottom-6 z-40 ${isRTL ? "left-6" : "right-6"}`}>
        <button
          onClick={() => handleOpenAssistantWithQuery()}
          className="group px-4 py-3 rounded-2xl bg-[#0F1D36] hover:bg-[#192F50] text-[#FDE68A] shadow-xl border-2 border-[#C5A265]/70 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer"
          title={t.assistant.title}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#FDE68A] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <span className="text-xs sm:text-sm font-bold font-quran text-[#FAF7F2]">
            {t.assistant.title}
          </span>
        </button>
      </div>

      {/* Floating Audio Player when TTS is playing */}
      <FloatingAudioPlayer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 z-40 p-3 rounded-2xl bg-white border border-[#E2DACF] text-[#0F1D36] shadow-md hover:bg-[#FAF7F2] transition-all cursor-pointer ${
            isRTL ? "right-6" : "left-6"
          }`}
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

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Sudanese Voice Ad Modal */}
      <SudaneseVoiceAdModal
        isOpen={isSudaneseAdOpen}
        onClose={() => setIsSudaneseAdOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenAssistant={() => handleOpenAssistantWithQuery()}
        onSelectCategory={handleSelectCategory}
        onTabChange={(tab) => setCurrentTab(tab as NavTabType)}
      />
    </div>
  );
}
