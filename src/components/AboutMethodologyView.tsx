import React from "react";
import { ShieldCheck, BookOpen, Scroll, CheckCircle, Scale, GraduationCap, Heart, MessageCircle } from "lucide-react";
import { AppIconGraphic } from "./Logo";

export const AboutMethodologyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Overview Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-8 sm:p-12 text-center space-y-4 shadow-xs relative overflow-hidden">
        <div className="flex justify-center">
          <AppIconGraphic size={68} />
        </div>
        <h2 className="text-3xl font-extrabold text-[#0F1D36] font-quran">
          المنهج العلمي لمنصة «الهدى والنور»
        </h2>
        <p className="text-base text-[#465A73] max-w-2xl mx-auto leading-relaxed font-scholarly">
          منصة معرفية إسلامية متخصصة تهدف إلى الرد العلمي الرصين على الشبهات والاعتراضات المعاصرة حول القرآن الكريم والسنة النبوية والعقيدة الإسلامية، بمنهج استدلالي محكم بعيداً عن التشنج والعواطف.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#EAE3D9] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-quran text-[#0F1D36]">
            1. مرجعية القرآن والسنة الصحيحة
          </h3>
          <p className="text-sm text-[#4E627A] leading-relaxed">
            الاعتماد الحصري على محكم آيات التنزيل، وما صح سنده من سنة رسول الله ﷺ في كتب الصحاح والسنن والمسانيد المعتمدة، مع تجنب الأحاديث الواهية والضعيفة والمكذوبة.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE3D9] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-quran text-[#0F1D36]">
            2. فهم سلف الأمة وأئمة أهل السنة
          </h3>
          <p className="text-sm text-[#4E627A] leading-relaxed">
            فهم النصوص وفق ما استقر عليه أئمة التفسير والحديث والأصول المعتبرون (كالطبري، والقرطبي، وابن كثير، وابن تيمية، وابن القيم، والنووي، وابن حجر العسقلاني).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE3D9] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-quran text-[#0F1D36]">
            3. قواعد درء التعارض والجمع الأصولي
          </h3>
          <p className="text-sm text-[#4E627A] leading-relaxed">
            استحالة تعارض العقل الصريح مع النقل الصحيح؛ فإذا بدا تعارض ظاهري فالواجب الأصولي هو الجمع وحمل المطلق على المقيد والعام على الخاص وإعمال كل نص في موضعه.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE3D9] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E2DACF] flex items-center justify-center text-[#B8934C]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-quran text-[#0F1D36]">
            4. التوثيق الآثاري واللغوي الحديث
          </h3>
          <p className="text-sm text-[#4E627A] leading-relaxed">
            الاستئناس بالحقائق التاريخية والآثارية الرصينة (كنقوش حجر رشيد والهيروغليفية والمخطوطات القديمة) التي تثبت دقة القرآن وتكشف زيف الظنون الاستشراقية السالفة.
          </p>
        </div>
      </div>

      {/* Primary Books */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-8 space-y-4">
        <h3 className="text-xl font-bold font-quran text-[#0F1D36] border-b border-[#F0EAE1] pb-3">
          أهم المراجع المعتمدة في دراسات المنصة
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#3E526C]">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>جامع البيان في تأويل القرآن - الإمام الطبري</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>تفسير القرآن العظيم - الحافظ ابن كثير</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>درء تعارض العقل والنقل - شيخ الإسلام ابن تيمية</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>إعلام الموقعين عن رب العالمين - الإمام ابن القيم</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>صحيح البخاري مع فتح الباري للحافظ ابن حجر</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>صحيح مسلم مع شرح الإمام النووي</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>دفع إيهام الاضطراب عن آيات الكتاب - الشنقيطي</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#B8934C]" />
            <span>الدراسات الآثارية والمصرية المعتمدة (Ranke, Bucaille)</span>
          </li>
        </ul>
      </div>

      {/* Organization & Credits Banner */}
      <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-white rounded-3xl border border-[#E2DACF] p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#F0EAE1] pb-6">
          <div className="text-center sm:text-right space-y-1">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#0F1D36] text-[#FDFBF7]">
              منظمة الهداية
            </span>
            <h4 className="text-lg font-bold text-[#0F1D36] font-quran">
              جميع الحقوق ملك لمنظمة الهداية
            </h4>
            <p className="text-sm text-[#52667E]">
              مشروع علمي دعوي موقوف لنشر الوعي العقدي والردود الاستدلالية الموثقة.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#F6EEDF] px-4 py-2 rounded-xl text-xs font-bold text-[#8C6D34]">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>نرجوا دعم الموقع لتعم الفائدة</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#4E627A]">
            <span className="font-semibold text-[#0F1D36]">تصميم وبرمجة: </span>
            <span className="font-bold text-[#0F1D36] font-quran">كمال جعفر زكريا</span>
          </div>
          <a
            href="https://wa.me/249919980435"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-transform hover:scale-105"
            title="تواصل عبر الواتساب: 00249919980435"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>واتساب:</span>
            <span dir="ltr">00249919980435</span>
          </a>
        </div>
      </div>
    </div>
  );
};
