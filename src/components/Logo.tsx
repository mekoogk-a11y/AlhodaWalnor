import React from "react";

interface LogoProps {
  variant?: "main" | "compact" | "appIcon" | "minimal";
  className?: string;
  showTagline?: boolean;
}

export const AppIconGraphic: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-label="شعار الهدى والنور"
    >
      <defs>
        {/* Base dark navy container */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1728" />
          <stop offset="1" stopColor="#152744" />
        </linearGradient>

        {/* Soft Golden dawn light */}
        <radialGradient id="dawnGlow" cx="32" cy="22" r="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0B1728" stopOpacity="0" />
        </radialGradient>

        {/* Golden path gradient extending towards horizon */}
        <linearGradient id="pathGrad" x1="32" y1="24" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFBF7" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#F3E5AB" stopOpacity="0.8" />
          <stop offset="1" stopColor="#C5A265" stopOpacity="0.3" />
        </linearGradient>

        {/* Antique Gold Stroke */}
        <linearGradient id="goldBorder" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6CA85" />
          <stop offset="0.5" stopColor="#C5A265" />
          <stop offset="1" stopColor="#9A7B38" />
        </linearGradient>
      </defs>

      {/* Rounded squircle emblem */}
      <rect x="1.5" y="1.5" width="61" height="61" rx="15" fill="url(#bgGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />

      {/* Islamic Arch outline in background */}
      <path
        d="M16 54V30C16 21.1634 23.1634 14 32 14C40.8366 14 48 21.1634 48 30V54"
        stroke="#C5A265"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
      />

      {/* Radiant dawn horizon glow behind path */}
      <circle cx="32" cy="24" r="16" fill="url(#dawnGlow)" />

      {/* Emerging rays from horizon */}
      <path d="M32 10V18" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M22 14L27 20" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M42 14L37 20" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M15 24H23" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M41 24H49" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Extending path towards the light / horizon */}
      <path
        d="M20 54L29 25H35L44 54H20Z"
        fill="url(#pathGrad)"
        opacity="0.8"
      />
      {/* Path perspective center lane */}
      <line x1="32" y1="25" x2="32" y2="54" stroke="#0F1D36" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 2" />

      {/* Symbolic open book (القرآن والعلم) hovering gracefully at the horizon point */}
      <path
        d="M19 40C25 36.5 30 37.5 32 40.5C34 37.5 39 36.5 45 40V46C39 42.5 34 43.5 32 46.5C30 43.5 25 42.5 19 46V40Z"
        fill="#FAF7F2"
        stroke="#0F1D36"
        strokeWidth="0.8"
      />
      {/* Book spine line */}
      <line x1="32" y1="40.5" x2="32" y2="46.5" stroke="#C5A265" strokeWidth="1" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "main",
  className = "",
  showTagline = true,
}) => {
  if (variant === "appIcon") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <AppIconGraphic size={52} />
        <div>
          <span className="block text-xl font-bold tracking-tight text-[#0F1D36] font-quran">
            الهدى والنور
          </span>
          <span className="block text-[11px] font-medium text-[#C5A265]">
            منصة الرد على الشبهات
          </span>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <AppIconGraphic size={40} />
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-[#0F1D36] font-quran leading-tight">
              الهدى والنور
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265] inline-block"></span>
          </div>
          <span className="text-[11px] text-[#5A6E85] font-medium block">
            الموسوعة العلمية الموثقة
          </span>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <AppIconGraphic size={32} />
        <span className="text-lg font-bold text-[#0F1D36] font-quran">
          الهدى والنور
        </span>
      </div>
    );
  }

  // Default "main" variant
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative mb-3 group cursor-pointer">
        <AppIconGraphic size={76} />
        <div className="absolute -inset-2 bg-[#C5A265]/10 rounded-2xl blur-md -z-10 group-hover:bg-[#C5A265]/20 transition-all duration-500"></div>
      </div>

      <div className="flex items-center justify-center gap-3 mb-1">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C5A265]"></span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F1D36] font-quran">
          الهدى والنور
        </h1>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C5A265]"></span>
      </div>

      {showTagline && (
        <p className="text-sm sm:text-base text-[#465A73] max-w-xl mx-auto font-medium leading-relaxed mt-1">
          منصة علمية للرد على الشبهات بالقرآن والسنة وأقوال علماء أهل السنة والجماعة
        </p>
      )}
    </div>
  );
};
