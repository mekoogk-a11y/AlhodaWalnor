import React, { useState } from "react";
import { Logo } from "./Logo";
import { Sparkles, BookOpen, Menu, X, Shield, Search, Home } from "lucide-react";
import { CategoryId } from "../types";

interface NavbarProps {
  currentTab: "main-article" | "directory" | "about";
  onTabChange: (tab: "main-article" | "directory" | "about") => void;
  onOpenAssistant: () => void;
  onSelectCategory: (id: CategoryId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenAssistant,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
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
          <div className="hidden md:flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#E2DACF]">
            <button
              onClick={() => onTabChange("main-article")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "main-article"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>البحث الرئيسي (تناقضات القرآن)</span>
            </button>

            <button
              onClick={() => {
                onTabChange("directory");
                onSelectCategory("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "directory"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>موسوعة الشبهات والردود</span>
            </button>

            <button
              onClick={() => onTabChange("about")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "about"
                  ? "bg-[#0F1D36] text-[#FAF7F2] shadow-2xs"
                  : "text-[#465A73] hover:text-[#0F1D36] hover:bg-[#FAF7F2]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>المنهج العلمي والمصادر</span>
            </button>
          </div>

          {/* Smart Assistant CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0F1D36] to-[#1E3A5F] hover:from-[#152744] hover:to-[#254673] text-[#FDE68A] text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#C5A265]/40 shadow-xs transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#FDE68A] group-hover:rotate-12 transition-transform" />
              <span>مساعد الهدى والنور الذكي</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAssistant}
              className="p-2 rounded-xl bg-[#0F1D36] text-[#FDE68A] text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="المساعد الذكي"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAE3D9] p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              onTabChange("main-article");
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-semibold bg-[#FAF7F2] text-[#0F1D36] flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-[#B8934C]" />
            <span>البحث الرئيسي (تناقضات القرآن)</span>
          </button>

          <button
            onClick={() => {
              onTabChange("directory");
              onSelectCategory("all");
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-semibold text-[#3D526C] hover:bg-[#FAF7F2] flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#B8934C]" />
            <span>موسوعة الشبهات والردود</span>
          </button>

          <button
            onClick={() => {
              onTabChange("about");
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-semibold text-[#3D526C] hover:bg-[#FAF7F2] flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#B8934C]" />
            <span>المنهج العلمي والمصادر</span>
          </button>

          <button
            onClick={() => {
              onOpenAssistant();
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-bold bg-[#0F1D36] text-[#FDE68A] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <span>مساعد الهدى والنور الذكي</span>
          </button>
        </div>
      )}
    </nav>
  );
};
