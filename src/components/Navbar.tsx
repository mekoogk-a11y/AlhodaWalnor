import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import {
  Sparkles,
  BookOpen,
  Menu,
  X,
  Shield,
  Search,
  Home,
  Bookmark,
  UserCheck,
} from "lucide-react";
import { CategoryId } from "../types";
import { getBookmarks } from "../utils/bookmarks";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { PWAInstallButton } from "./PWAInstallButton";

export type NavTabType = "main-article" | "directory" | "search" | "about";

interface NavbarProps {
  currentTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  onOpenAssistant: () => void;
  onSelectCategory: (id: CategoryId) => void;
  onOpenBookmarks: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenAssistant,
  onSelectCategory,
  onOpenBookmarks,
  onOpenAdmin,
}) => {
  const { t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setBookmarkCount(getBookmarks().length);
    updateCount();
    window.addEventListener("bookmarks-updated", updateCount);
    return () => window.removeEventListener("bookmarks-updated", updateCount);
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo compact */}
          <div
            onClick={() => onTabChange("main-article")}
            className="cursor-pointer"
          >
            <Logo variant="compact" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E2DACF]">
            <button
              onClick={() => onTabChange("main-article")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "main-article"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.nav.scholarlyStudies}</span>
            </button>

            <button
              onClick={() => {
                onTabChange("directory");
                onSelectCategory("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "directory"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.nav.directory}</span>
            </button>

            <button
              onClick={() => onTabChange("search")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "search"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.nav.searchEngine}</span>
            </button>

            <button
              onClick={() => onTabChange("about")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "about"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.nav.methodology}</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 rounded-xl bg-white border border-[#E2DACF] text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] transition-colors cursor-pointer relative"
              title={t.nav.bookmarks}
              aria-label={t.nav.bookmarks}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B8934C] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl bg-white border border-[#E2DACF] text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              title={t.nav.admin}
              aria-label={t.nav.admin}
            >
              <UserCheck className="w-4 h-4" />
            </button>

            {/* Smart Assistant CTA */}
            <button
              onClick={onOpenAssistant}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0F1D36] to-[#1E3A5F] hover:from-[#152744] hover:to-[#254673] text-[#FDE68A] text-xs font-bold flex items-center gap-1.5 border border-[#C5A265]/40 shadow-xs transition-all cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FDE68A] group-hover:rotate-12 transition-transform" />
              <span>{t.nav.assistant}</span>
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <LanguageSelector />

            <button
              onClick={onOpenBookmarks}
              className="p-2 rounded-xl bg-white border border-[#E2DACF] text-[#0F1D36] relative cursor-pointer"
              title={t.nav.bookmarks}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B8934C] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAssistant}
              className="p-2 rounded-xl bg-[#0F1D36] text-[#FDE68A] text-xs font-bold flex items-center gap-1 cursor-pointer"
              title={t.nav.assistant}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#E2DACF] text-[#0F1D36] cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE3D9] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <PWAInstallButton variant="mobileDrawer" className="mb-2" />

          <button
            onClick={() => {
              onTabChange("main-article");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              currentTab === "main-article"
                ? "bg-[#0F1D36] text-[#FAF7F2]"
                : "text-[#2A3B50] hover:bg-[#FAF7F2]"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.nav.scholarlyStudies}</span>
          </button>

          <button
            onClick={() => {
              onTabChange("directory");
              onSelectCategory("all");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              currentTab === "directory"
                ? "bg-[#0F1D36] text-[#FAF7F2]"
                : "text-[#2A3B50] hover:bg-[#FAF7F2]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.nav.directory}</span>
          </button>

          <button
            onClick={() => {
              onTabChange("search");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              currentTab === "search"
                ? "bg-[#0F1D36] text-[#FAF7F2]"
                : "text-[#2A3B50] hover:bg-[#FAF7F2]"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.nav.searchEngine}</span>
          </button>

          <button
            onClick={() => {
              onTabChange("about");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              currentTab === "about"
                ? "bg-[#0F1D36] text-[#FAF7F2]"
                : "text-[#2A3B50] hover:bg-[#FAF7F2]"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t.nav.methodology}</span>
          </button>

          <div className="pt-2 border-t border-[#F0EAE1] flex gap-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-[#FAF7F2] text-[#0F1D36] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.nav.admin}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
