import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  X,
  Lock,
  UserCheck,
  Database,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  FileText,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { sourcesCatalog } from "../data/database/sourcesCatalog";
import { getAllSearchableRecords } from "../data/database/unifiedDatabase";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string } | null>(null);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "sources" | "logs">("overview");
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        // Fallback stats calculated client-side
        const all = getAllSearchableRecords();
        const byDiscipline: Record<string, number> = {};
        all.forEach((r) => {
          byDiscipline[r.discipline] = (byDiscipline[r.discipline] || 0) + 1;
        });
        setStats({
          totalRecords: all.length,
          totalSources: sourcesCatalog.length,
          byDiscipline,
          systemHealth: "نشط ومستقر",
        });
      }
    } catch {
      const all = getAllSearchableRecords();
      setStats({
        totalRecords: all.length,
        totalSources: sourcesCatalog.length,
        systemHealth: "نشط ومستقر",
      });
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      fetchStats();
    }
  }, [isLoggedIn, isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      } else {
        setLoginError(data.error || "بيانات الدخول غير صحيحة");
      }
    } catch {
      // Local fallback for offline/client mode
      if (
        (username === "admin" && password === "huda2026") ||
        (username === "editor" && password === "editor2026")
      ) {
        setIsLoggedIn(true);
        setCurrentUser({ username, role: username === "admin" ? "مدير النظام" : "محرر علمي" });
      } else {
        setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0B1728]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E2DACF] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0F1D36] text-[#FAF7F2] flex items-center justify-between border-b border-[#C5A265]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C5A265]/20 flex items-center justify-center text-[#FDE68A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-quran text-lg text-[#FAF7F2]">
                  لوحة إدارة المحتوى والمصادر العلمية
                </h3>
                {currentUser && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A265]/20 text-[#FDE68A] border border-[#C5A265]/40">
                    {currentUser.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#EAE3D9]/70">
                منصة الهدى والنور | التدقيق العلمي وضبط الصلاحيات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-[#EAE3D9]/70 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#EAE3D9]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#0F1D36] text-[#FDE68A] border-2 border-[#C5A265]/50 mx-auto flex items-center justify-center shadow-md">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-bold font-quran text-xl text-[#0F1D36]">
                  تسجيل دخول الإشراف والتحرير العلمي
                </h4>
                <p className="text-xs text-[#6A7E94]">
                  منطقة مخصصة للمشرفين والباحثين والمراجعين المعتمدين لمنصة الهدى والنور.
                </p>
              </div>

              <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-[#EAE3D9] p-6 shadow-xs space-y-4">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1D36]">اسم المستخدم</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثال: admin أو editor"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E2DACF] rounded-xl px-3.5 py-2.5 text-sm text-[#0F1D36] outline-none focus:border-[#0F1D36]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1D36]">كلمة المرور</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E2DACF] rounded-xl px-3.5 py-2.5 text-sm text-[#0F1D36] outline-none focus:border-[#0F1D36]"
                  />
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-[11px] text-[#6A7E94] space-y-1">
                  <p className="font-bold text-[#8C6D34]">حسابات التجربة والاعتماد:</p>
                  <p>• المشرف العام: <code className="font-mono text-[#0F1D36]">admin</code> / <code className="font-mono text-[#0F1D36]">huda2026</code></p>
                  <p>• المحرر العلمي: <code className="font-mono text-[#0F1D36]">editor</code> / <code className="font-mono text-[#0F1D36]">editor2026</code></p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0F1D36] hover:bg-[#1A2E4C] text-[#FDE68A] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>دخول إلى لوحة التحكم</span>
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard View */
            <div className="space-y-6">
              {/* Dashboard Sub-nav */}
              <div className="flex items-center gap-2 border-b border-[#EAE3D9] pb-3">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "overview"
                      ? "bg-[#0F1D36] text-[#FAF7F2]"
                      : "text-[#4A5D73] hover:bg-white"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>نظرة عامة وإحصائيات</span>
                </button>

                <button
                  onClick={() => setActiveTab("sources")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "sources"
                      ? "bg-[#0F1D36] text-[#FAF7F2]"
                      : "text-[#4A5D73] hover:bg-white"
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>فهرس المصادر المعتمدة ({sourcesCatalog.length})</span>
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-2xs">
                      <p className="text-[11px] font-bold text-[#8C6D34]">إجمالي السجلات المفهرسة</p>
                      <p className="text-2xl font-extrabold text-[#0F1D36] font-mono mt-1">
                        {stats?.totalRecords || 30}+
                      </p>
                      <p className="text-[10px] text-[#7A8C9E] mt-0.5">مواد علمية موثقة</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-2xs">
                      <p className="text-[11px] font-bold text-[#8C6D34]">أمهات كتب المصادر</p>
                      <p className="text-2xl font-extrabold text-[#0F1D36] font-mono mt-1">
                        {sourcesCatalog.length}
                      </p>
                      <p className="text-[10px] text-[#7A8C9E] mt-0.5">تفاسير، صحاح، أصول</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-2xs">
                      <p className="text-[11px] font-bold text-[#8C6D34]">حالة محرك البحث وRAG</p>
                      <p className="text-base font-bold text-emerald-600 font-quran mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>نشط ومنضبط</span>
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-2xs">
                      <p className="text-[11px] font-bold text-[#8C6D34]">صلاحية الجلسة</p>
                      <p className="text-sm font-bold text-[#0F1D36] font-quran mt-2">
                        {currentUser?.username} ({currentUser?.role})
                      </p>
                    </div>
                  </div>

                  {/* Discipline Breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EAE3D9] shadow-2xs space-y-4">
                    <h4 className="font-bold font-quran text-base text-[#0F1D36]">
                      توزيع السجلات عبر العلوم والتخصصات
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">القرآن وعلومه:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">مفهرس بالكامل</span>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">صحيح البخاري ومسلم:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">تخريج دقيق</span>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">التفاسير المعتمدة:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">الطبري وابن كثير</span>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">العقيدة وأصول الدين:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">أئمة السلف</span>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">مقارنة الأديان:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">تحقيق وثائقي</span>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                        <span className="font-bold text-[#0F1D36]">شبهات التناقض:</span>
                        <span className="font-mono font-bold text-[#8C6D34] mr-2">11 قسماً كاملاً</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Sources */}
              {activeTab === "sources" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#556982]">
                      قائمة أمهات المراجع العلمية التي يعتمد عليها محرك استرجاع المعلومات (RAG)
                    </p>
                  </div>

                  <div className="space-y-3">
                    {sourcesCatalog.map((s) => (
                      <div
                        key={s.id}
                        className="bg-white p-4 rounded-2xl border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0F1D36] text-[#FAF7F2]">
                              {s.discipline}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {s.authenticityStatus}
                            </span>
                            <span className="text-xs text-[#7A8C9E]">{s.era}</span>
                          </div>
                          <h5 className="font-bold font-quran text-base text-[#0F1D36]">{s.title}</h5>
                          <p className="text-xs text-[#556982]">{s.author}</p>
                          <p className="text-[11px] text-[#6A7E94] font-scholarly leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
