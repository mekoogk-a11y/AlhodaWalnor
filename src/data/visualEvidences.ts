export interface VisualEvidence {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  relatedKeywords: string[];
  referenceSource: string;
  caption: string;
  svgGraphic: string; // inline SVG markup for verified authentic diagram
  details: string;
}

export const VISUAL_EVIDENCES: VisualEvidence[] = [
  {
    id: "haman-ranke",
    title: "لوحة هامان في متحف فيينا ومعجم رانكه الهيروغليفي",
    subtitle: "توثيق لقب هامان: 'رئيس عمال مقالع الحجر' المتوافق مع سورة القصص",
    category: "الآثار والنقوش القديمة",
    relatedKeywords: ["هامان", "فرعون", "صرح", "متحف فيينا", "رانكه", "مصر القديمة", "haman", "pharaoh"],
    referenceSource: "معجم أسماء الأعلام المصرية القديمة لهيرمان رانكه (Band I, S. 240) ومتحف تاريخ الفنون بفيينا (Kunsthistorisches Museum)",
    caption: "النقش الهيروغليفي يثبت وجود شخصية بارزة في البلاط المصري باسم (ها-أمان) ووظيفته الإشراف على البناء والحجارة في عهد الفراعنة.",
    details: "حاول المستشرقون التشكيك بذكر القرآن لهامان مع فرعون زاعمين أنه هامان المذكور في سفر إستير، حتى فكّت شامبليون رموز الهيروغليفية ووُجد نقش أثري باسم (Hemen-h / Ha-Aman) ولقبه الرسمي: 'رئيس عمال مقالع الحجر' (Vorsteher der Steinmetzen)، وهو عين ما ذكره القرآن: ﴿فَأَوْقِدْ لِي يَا هَامَانُ عَلَى الطِّينِ فَاجْعَلْ لِي صَرْحًا﴾ [القصص: 38].",
    svgGraphic: `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto rounded-xl">
      <rect width="400" height="240" rx="12" fill="#14213d"/>
      <rect x="15" y="15" width="370" height="210" rx="8" fill="#0B132B" stroke="#C5A265" stroke-width="1.5" stroke-dasharray="4 2"/>
      <text x="200" y="42" fill="#F4E8C1" font-size="14" font-weight="bold" text-anchor="middle">النقش الهيروغليفي: [ها-أمان Ha-Aman]</text>
      <text x="200" y="60" fill="#99AAB5" font-size="11" text-anchor="middle">متحف تاريخ الفنون في فيينا (KHM Vienna - Inv. No. 5827)</text>
      <!-- Stele outline -->
      <path d="M70 190V95C70 80 90 75 110 75C130 75 150 80 150 95V190H70Z" fill="#2E3A4E" stroke="#C5A265" stroke-width="1.2"/>
      <!-- Hieroglyphs representation -->
      <circle cx="110" cy="100" r="10" stroke="#FDE68A" stroke-width="1.5" fill="none"/>
      <line x1="95" y1="120" x2="125" y2="120" stroke="#FDE68A" stroke-width="2"/>
      <line x1="100" y1="128" x2="120" y2="128" stroke="#FDE68A" stroke-width="2"/>
      <path d="M100 145C105 138 115 138 120 145" stroke="#FDE68A" stroke-width="2" fill="none"/>
      <rect x="98" y="155" width="24" height="18" rx="2" stroke="#FDE68A" stroke-width="1.5" fill="none"/>
      <!-- Ranke Dictionary Box -->
      <rect x="175" y="80" width="195" height="110" rx="6" fill="#1B2838" stroke="#3D526A" stroke-width="1"/>
      <text x="185" y="105" fill="#C5A265" font-size="12" font-weight="bold">معجم هيرمان رانكه (Ranke):</text>
      <text x="185" y="125" fill="#E2E8F0" font-size="11">"Hemen-h: Vorsteher der Steinmetzen"</text>
      <text x="185" y="145" fill="#A0AEC0" font-size="10.5">المعنى: «رئيس عمال مقالع الحجر والبناء»</text>
      <path d="M185 160H355" stroke="#3D526A" stroke-width="1"/>
      <text x="185" y="178" fill="#48BB78" font-size="11" font-weight="bold">﴿فَأَوْقِدْ لِي يَا هَامَانُ عَلَى الطِّينِ﴾</text>
    </svg>`,
  },
  {
    id: "creation-days",
    title: "مخطط تداخل الأيام الستة في سورة فصلت",
    subtitle: "برهان نفي التعارض بين (6 أيام) في سائر القرآن وتفصيل سورة فصلت",
    category: "الإعجاز والبيان القرآني",
    relatedKeywords: ["أيام الخلق", "فصلت", "ستة أيام", "ثمانية أيام", "الأرض والسماء", "creation days", "six days"],
    referenceSource: "تفسير الطبري (21/436)، البغوي (7/165)، ومجموع الفتاوى لشيخ الإسلام ابن تيمية (17/244)",
    caption: "اليومان المذكوران لتقدير الأقوات يدخلان ضمناً في مدة خلق الأرض الأربعة، وليسا مدة مستقلة.",
    details: "يظن المشكك جمع الأرقام (2 للأرض + 4 للأقوات + 2 للسماء = 8)، وهذا جهل بأساليب لغة العرب، فالعرب تقول: 'خرجت من البصرة إلى الكوفة في عشرة أيام، وإلى مكة في عشرين يوماً' أي المجموع عشرون وليس ثلاثين. فخلق الأرض وتدبيرها تم في 4 أيام كاملة تشمل تقدير الأقوات، ثم خلق السماء في يومين، فالمجموع ستة أيام بالتمام.",
    svgGraphic: `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto rounded-xl">
      <rect width="400" height="240" rx="12" fill="#0B1728"/>
      <text x="200" y="32" fill="#F4E8C1" font-size="13" font-weight="bold" text-anchor="middle">المجموع الكلي: ستة أيام ﴿فِي سِتَّةِ أَيَّامٍ﴾</text>
      <!-- Total Bar -->
      <rect x="30" y="48" width="340" height="24" rx="6" fill="#1C314D" stroke="#C5A265" stroke-width="1.2"/>
      <text x="200" y="64" fill="#FAF7F2" font-size="11" text-anchor="middle" font-weight="bold">المدة الكلية لجميع الخلق = 6 مراحل/أيام</text>
      <!-- Days 1-2 Earth creation -->
      <rect x="30" y="88" width="110" height="45" rx="6" fill="#2B6CB0" fill-opacity="0.8"/>
      <text x="85" y="108" fill="#FFFFFF" font-size="11" text-anchor="middle" font-weight="bold">خلق الأرض</text>
      <text x="85" y="124" fill="#E2E8F0" font-size="10" text-anchor="middle">﴿فِي يَوْمَيْنِ﴾ (1-2)</text>
      <!-- Days 3-4 Sustenance (Overlapping total 4) -->
      <rect x="145" y="88" width="110" height="45" rx="6" fill="#2C7A7B" fill-opacity="0.8"/>
      <text x="200" y="108" fill="#FFFFFF" font-size="11" text-anchor="middle" font-weight="bold">تقدير الأقوات</text>
      <text x="200" y="124" fill="#E2E8F0" font-size="10" text-anchor="middle">تتمة ﴿فِي أَرْبَعَةِ أَيَّامٍ﴾ (3-4)</text>
      <!-- Days 5-6 Heavens -->
      <rect x="260" y="88" width="110" height="45" rx="6" fill="#6B46C1" fill-opacity="0.8"/>
      <text x="315" y="108" fill="#FFFFFF" font-size="11" text-anchor="middle" font-weight="bold">تسوية السماوات</text>
      <text x="315" y="124" fill="#E2E8F0" font-size="10" text-anchor="middle">﴿فِي يَوْمَيْنِ﴾ (5-6)</text>
      <!-- Bracket under Earth + Sustenance = 4 -->
      <path d="M30 142H195M205 142H370" stroke="#C5A265" stroke-width="1.2"/>
      <path d="M30 138V142M255 138V142M370 138V142" stroke="#C5A265" stroke-width="1.2"/>
      <!-- Text explanation -->
      <rect x="30" y="155" width="340" height="70" rx="6" fill="#152538"/>
      <text x="45" y="176" fill="#ECC94B" font-size="11" font-weight="bold">الحساب الشرعي واللغوي الدقيق:</text>
      <text x="45" y="196" fill="#CBD5E0" font-size="10.5">الأرض وتوابعها استغرقت 4 أيام (2 للخلق الأولي + 2 لتقدير البركة والأقوات)</text>
      <text x="45" y="214" fill="#48BB78" font-size="10.5">4 أيام للأرض وما فيها + يومان للسماء = 6 أيام متطابقة مع القرآن كله</text>
    </svg>`,
  },
  {
    id: "birmingham-manuscript",
    title: "مخطوطة برمنجهام القرآنية (عصر النبوة والخلفاء الراشدين)",
    subtitle: "فحص الكربون-14 يثبت دقة حفظ نص القرآن منذ الصدر الأول دون تغيير",
    category: "المخطوطات وتاريخ المصحف",
    relatedKeywords: ["مخطوطة برمنجهام", "حفظ القرآن", "تحريف", "صنعاء", "رقوق", "manuscript", "birmingham"],
    referenceSource: "مكتبة جامعة برمنجهام (Cadbury Research Library, Mingana 1572a) ومختبر أكسفورد للكربون المشع",
    caption: "المخطوطة كُتبت بالخط الحجازي المبكر بين 568 - 645 ميلادية وتطابق المصحف المطبوع حرفاً بحرف.",
    details: "أعلنت جامعة برمنجهام عام 2015 بعد فحص الكربون المشع C14 في مختبر أكسفورد أن رقوق المخطوطة تعود لزمن النبي ﷺ أو بعد وفاته بقليل بدقة 95.4%. وتتضمن آيات من سورة الكهف ومريم وطه، وهي مطابقة تماماً للمصحف الذي بين أيدي المسلمين اليوم.",
    svgGraphic: `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto rounded-xl">
      <rect width="400" height="240" rx="12" fill="#0F172A"/>
      <text x="200" y="32" fill="#F4E8C1" font-size="13" font-weight="bold" text-anchor="middle">مخطوطة برمنجهام القرآنية (Mingana 1572a)</text>
      <!-- Parchment graphic -->
      <rect x="40" y="50" width="150" height="170" rx="4" fill="#E8D8B8" stroke="#8C7355" stroke-width="1.5"/>
      <!-- Hijazi Script simulation lines -->
      <line x1="50" y1="70" x2="180" y2="70" stroke="#3A2D1D" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="85" x2="175" y2="85" stroke="#3A2D1D" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="50" y1="100" x2="180" y2="100" stroke="#3A2D1D" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="115" x2="170" y2="115" stroke="#3A2D1D" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="50" y1="130" x2="180" y2="130" stroke="#3A2D1D" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="145" x2="175" y2="145" stroke="#3A2D1D" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="50" y1="160" x2="180" y2="160" stroke="#3A2D1D" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="175" x2="160" y2="175" stroke="#3A2D1D" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="50" y1="190" x2="178" y2="190" stroke="#3A2D1D" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="205" x2="150" y2="205" stroke="#3A2D1D" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Verification Badge Details -->
      <rect x="205" y="50" width="165" height="170" rx="8" fill="#1E293B" stroke="#C5A265" stroke-width="1"/>
      <text x="215" y="75" fill="#38BDF8" font-size="11" font-weight="bold">فحص الكربون المشع C14:</text>
      <text x="215" y="95" fill="#F8FAFC" font-size="12" font-weight="bold">568 - 645 م</text>
      <text x="215" y="112" fill="#94A3B8" font-size="10">معاصرة للنبوة والخلافة الراشدة</text>
      <path d="M215 125H360" stroke="#334155" stroke-width="1"/>
      <text x="215" y="145" fill="#4ADE80" font-size="10.5" font-weight="bold">المطابقة النصية: 100%</text>
      <text x="215" y="165" fill="#CBD5E1" font-size="9.5">تطابق تام لمصحف عثمان رضي الله عنه</text>
      <text x="215" y="185" fill="#CBD5E1" font-size="9.5">السور: الكهف ومريم وطه</text>
      <text x="215" y="205" fill="#FDE68A" font-size="9.5">﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾</text>
    </svg>`,
  },
  {
    id: "mountain-roots",
    title: "مخطط أوتاد الجبال والقشرة الأرضية (نظرية التوازن التضاغطي)",
    subtitle: "تطابق قوله تعالى ﴿وَالْجِبَالَ أَوْتَادًا﴾ مع علوم الجيولوجيا الحديثة",
    category: "الإعجاز العلمي والجيولوجيا",
    relatedKeywords: ["الجبال أوتادا", "أوتاد", "الرواسي", "زلزال", "تكتونية", "mountains", "pegs", "isostasy"],
    referenceSource: "تفسير القرطبي (20/12)، وعلم الجيولوجيا الحديث (Tarbuck & Lutgens, Earth Science)",
    caption: "للجبال جذور مغروسة في الوشاح الأرضي تبلغ أضعاف ارتفاعها الظاهر فوق السطح تماماً كالوتد.",
    details: "أثبت علم الجيوفيزياء الحديث عبر نظرية التوازن التضاغطي (Isostasy) أن كل جبل يملك جذراً عميقاً يمتد داخل الوشاح المائع (Mantle) بنسبة تصل إلى 4 إلى 10 أضعاف علوه فوق السطح، ليعمل كوتد الخيمة الذي يثبت القشرة القارية ويمنع اضطرابها.",
    svgGraphic: `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto rounded-xl">
      <rect width="400" height="240" rx="12" fill="#0A192F"/>
      <!-- Sky -->
      <rect x="20" y="20" width="360" height="60" fill="#172A45" rx="6"/>
      <text x="200" y="45" fill="#E6F1FF" font-size="12" font-weight="bold" text-anchor="middle">﴿أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا * وَالْجِبَالَ أَوْتَادًا﴾</text>
      <!-- Earth Surface line -->
      <line x1="20" y1="80" x2="380" y2="80" stroke="#64FFDA" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Mountain visible peak -->
      <polygon points="120,80 200,30 280,80" fill="#8892B0"/>
      <!-- Mountain subterranean deep root (Peg) -->
      <polygon points="120,80 280,80 200,210" fill="#495670" stroke="#64FFDA" stroke-width="1.2"/>
      <!-- Crust Layer -->
      <rect x="20" y="80" width="100" height="40" fill="#233554"/>
      <rect x="280" y="80" width="100" height="40" fill="#233554"/>
      <!-- Mantle Layer -->
      <rect x="20" y="120" width="100" height="95" fill="#1D2D50"/>
      <rect x="280" y="120" width="100" height="95" fill="#1D2D50"/>
      <!-- Labels -->
      <text x="70" y="105" fill="#CCD6F6" font-size="10" text-anchor="middle">القشرة القارية</text>
      <text x="70" y="165" fill="#CCD6F6" font-size="10" text-anchor="middle">الوشاح الأرضي (Mantle)</text>
      <text x="200" y="145" fill="#64FFDA" font-size="11" font-weight="bold" text-anchor="middle">جذر الجبل الوتدي</text>
      <text x="200" y="162" fill="#CCD6F6" font-size="9.5" text-anchor="middle">(يمتد حتى 4-10 أضعاف الارتفاع الظاهر)</text>
      <text x="200" y="228" fill="#F4E8C1" font-size="10" text-anchor="middle">التطابق التام بين الوصف القرآني (الوتد) ووظيفة التثبيت الجيولوجي</text>
    </svg>`,
  },
];
