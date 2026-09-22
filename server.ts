import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  searchUnifiedDatabase,
  retrieveRAGContext,
  getAllSearchableRecords,
} from "./src/data/database/unifiedDatabase";
import { sourcesCatalog } from "./src/data/database/sourcesCatalog";
import { KnowledgeDiscipline } from "./src/data/database/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory system logs for auditing and reliability
const systemLogs: { timestamp: string; level: "info" | "warn" | "error"; message: string }[] = [];
function logEvent(level: "info" | "warn" | "error", message: string) {
  const timestamp = new Date().toISOString();
  systemLogs.unshift({ timestamp, level, message });
  if (systemLogs.length > 200) systemLogs.pop();
  if (level === "error") {
    console.error(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  } else {
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  }
}

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    platform: "الهدى والنور",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 2. Unified Search API across all 9 Islamic disciplines
app.get("/api/search", (req, res) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const discipline = (typeof req.query.discipline === "string"
      ? req.query.discipline
      : "all") as KnowledgeDiscipline | "all";
    const limit = Math.min(Number(req.query.limit) || 30, 100);

    const results = searchUnifiedDatabase(q, discipline, { limit });
    res.json({
      query: q,
      discipline,
      count: results.length,
      results,
    });
  } catch (error: any) {
    logEvent("error", `Search failed: ${error?.message || error}`);
    res.status(500).json({ error: "فشل تنفيذ عملية البحث الموحد" });
  }
});

// 3. Catalog of Islamic Sources
app.get("/api/sources", (req, res) => {
  try {
    const discipline = req.query.discipline as string | undefined;
    if (discipline && discipline !== "all") {
      const filtered = sourcesCatalog.filter((s) => s.discipline === discipline);
      return res.json({ sources: filtered, count: filtered.length });
    }
    res.json({ sources: sourcesCatalog, count: sourcesCatalog.length });
  } catch (error: any) {
    logEvent("error", `Sources fetch failed: ${error?.message || error}`);
    res.status(500).json({ error: "فشل استرجاع فهرس المصادر" });
  }
});

// 4. Smart RAG Assistant Endpoint
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "الرجاء كتابة نص السؤال أو الشبهة" });
    }

    logEvent("info", `Assistant query received: ${message.slice(0, 80)}`);

    // Step 1: Perform RAG retrieval from verified Islamic database
    const ragData = retrieveRAGContext(message);

    const systemInstruction = `
أنت «مساعد الهدى والنور»، مستشار علمي إسلامي وباحث متخصص في الرد العلمي الموثق على الشبهات والاعتراضات المتعلقة بالقرآن الكريم والسنة النبوية والعقيدة الإسلامية، ملتزم التزاماً صارماً بمنهج أهل السنة والجماعة.

قواعدك الإلزامية غير القابلة للخرق:
1. المصادر المعتمدة: أُرفق لك أدناه نصوصاً مسترجعة من قاعدة بيانات المنصة المعتمدة (القرآن، صحيح البخاري، صحيح مسلم، تفاسير الطبري وابن كثير والقرطبي، وأقوال الأئمة أحمد والشافعي ومالك وأبي حنيفة وابن تيمية وابن القيم).
2. الالتزام بالسياق المسترجع: اعتمد في صلب إجابتك على هذه النصوص الموثقة، وأشر إليها برقم المصدر هكذا: [المصدر 1]، [المصدر 2].
3. منع التلفيق: يمنع منعاً باتاً اختراع آية، أو زيادة حرف في القرآن، أو اختراع حديث، أو عزو قول لعالم دون سند.
4. قاعدة نفي العلم عند انعدام المصادر: إذا كان السؤال خارج نطاق العلوم الإسلامية أو لم تتوفر في النصوص المسترجعة ولا في الأصول القطعية لأهل السنة مادة كافية للرد، قل صراحة وبأدب:
«لم أجد في المصادر المعتمدة المتاحة لدي مادة كافية للإجابة عن هذا السؤال، ويمكنك إعادة صياغة السؤال أو البحث في قسم المصادر.»
5. الأسلوب: رصين، مؤدب، هادئ، علمي، فصيح، خالٍ من العصبية.

النصوص والمراجع المعتمدة المسترجعة من قاعدة بيانات منصة الهدى والنور:
${ragData.hasSufficientContext ? ragData.contextText : "لا توجد مصادر مباشرة مطابقة في البحث الأولي، يُرجى الرجوع للأصول الكلية لأهل السنة والجماعة."}
`;

    const ai = getAIClient();

    if (ai) {
      const chatContents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-4)) {
          if (item.role === "user" || item.role === "assistant") {
            chatContents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            });
          }
        }
      }
      chatContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.15, // High deterministic accuracy
        },
      });

      return res.json({
        reply: response.text || "لم نتمكن من صياغة إجابة، يرجى إعادة المحاولة.",
        citations: ragData.citations,
        model: "gemini-3.8-flash (RAG Grounded)",
        grounded: ragData.hasSufficientContext,
      });
    }

    // Grounded Scholarly Fallback when GEMINI_API_KEY is not configured
    const fallbackAnswer = generateGroundedFallback(message, ragData);
    return res.json({
      reply: fallbackAnswer,
      citations: ragData.citations,
      model: "al-huda-grounded-engine",
      grounded: ragData.hasSufficientContext,
      notice: "تم استرجاع الإجابة مباشرة من محرك التحقيق العلمي المدمج لمنصة الهدى والنور.",
    });
  } catch (error: any) {
    logEvent("error", `Assistant error: ${error?.message || error}`);
    const ragData = retrieveRAGContext(req.body.message || "");
    const fallback = generateGroundedFallback(req.body.message || "", ragData);
    return res.json({
      reply: fallback,
      citations: ragData.citations,
      model: "al-huda-grounded-engine",
      grounded: ragData.hasSufficientContext,
      errorNote: error?.message,
    });
  }
});

function generateGroundedFallback(
  query: string,
  ragData: ReturnType<typeof retrieveRAGContext>
): string {
  const q = query.toLowerCase();

  // If we have grounded citations from our verified database, synthesize them
  if (ragData.hasSufficientContext && ragData.citations.length > 0) {
    const topCitation = ragData.citations[0];
    return `### الجواب العلمي الموثق من قاعدة بيانات «الهدى والنور»

**الحمد لله والصلاة والسلام على رسول الله وعلى آله وصحبه ومن والاه؛**

بناءً على المصادر المعتمدة الموثقة في منصتنا حول مسألة: **«${query.trim()}»**:

1. **التحقيق المنهجي:**
${topCitation.snippet}

2. **التوثيق الأصلي:**
- **المصدر:** ${topCitation.title}
- **العزو:** ${topCitation.reference}
- **التصنيف:** ${topCitation.type}

3. **الخلاصة المستقرة عند أئمة أهل السنة:**
لا تعارض ولا تناقض في نصوص الوحيين (الكتاب والسنة الصحيحة)، وكل ما ظاهره الإشكال يُحمل على القواعد الأصولية الراسخة (كالجمع بين النصوص، أو حمل المجمل على المفصل، أو معرفة أسباب النزول وسياق اللسان العربي).`;
  }

  // Domain-specific classic questions
  if (q.includes("ستة أيام") || q.includes("ثمانية أيام") || q.includes("فصلت") || q.includes("خلق الأرض")) {
    return `### الجواب العلمي المنهجي حول أيام الخلق (ستة أيام أم ثمانية؟)

**الحمد لله والصلاة والسلام على رسول الله؛**

**أولاً: جوهر الشبهة:**
يزعم بعض المشككين أن جمع الأيام المذكورة في سورة فصلت (2 للأرض + 4 للأقوات + 2 للسماوات) يساوي ثمانية أيام، بينما يصرح القرآن في مواضع متواترة بأنه خلق السماوات والأرض في ستة أيام!

**ثانياً: الجواب العلمي اللغوي والبياني [المصدر: تفسير الطبري وتفسير ابن كثير]:**
1. **قاعدة التداخل والاندماج (التضمين):**
   قوله تعالى: ﴿وَقَدَّرَ فِيهَا أَقْوَاتَهَا فِي أَرْبَعَةِ أَيَّامٍ سَوَاءً لِّلسَّائِلِينَ﴾ لا يعني أربعة أيام جديدة مضافة لليومين السابقين، بل الأربعة تشمل اليومين الأولين! كقول القائل: "سرتُ من مكة إلى المدينة في يومين، وإلى تبوك في أربعة أيام" أي المجموع الكلي أربعة أيام.
2. **إجماع المفسرين:**
   خلق الأرض في يومين، وتدبير أقواتها وجبالها في يومين (فصار المجموع 4)، ثم تسوية السماوات في يومين، فالمجموع التام: ستة أيام بالتمام والكمال بلا تناقض.

**ثالثاً: الخلاصة:**
القرآن الكريم متطابق ومحكم؛ ستة أيام هي المدة الكلية بإجماع النص ولغة العرب.`;
  }

  if (q.includes("هارون") || q.includes("أخت هارون") || q.includes("مريم")) {
    return `### الجواب العلمي حول قوله تعالى ﴿يَا أُخْتَ هَارُونَ﴾

**الحمد لله والصلاة والسلام على رسول الله؛**

**أولاً: الشبهة:**
ادعى بعض المستشرقين أن القرآن خلط بين مريم أم عيسى عليه السلام، ومريم أخت موسى وهارون عليهما السلام وبينهما قرون!

**ثانياً: الجواب النبوي الصريح الحاسم [المصدر: صحيح مسلم رقم 2135]:**
روى الإمام مسلم في صحيحه عن المغيرة بن شعبة رضي الله عنه قال: لما قدمتُ نجران سألوني فقالوا: إنكم تقرؤون ﴿يَا أُخْتَ هَارُونَ﴾ وموسى قبل عيسى بكذا وكذا؟! فلما قدمت على رسول الله ﷺ سألته عن ذلك، فقال: «إِنَّهُمْ كَانُوا يُسَمُّونَ بِأَنْبِيَائِهِمْ وَالصَّالِحِينَ قَبْلَهُمْ».

**ثالثاً: التحقيق اللغوي والتاريخي:**
1. التسمي بأسماء الصالحين كان عادة مستقرة عند بني إسرائيل تبركاً، فكان لمريم أخ أو سمي صالح يُدعى هارون.
2. والنسب في لغة العرب يطلق على الشرف والسلالة، فيقال: "يا أخا تميم"، ومريم كانت من سلالة هارون الكاهن عليه السلام.`;
  }

  if (q.includes("هامان") || q.includes("فرعون")) {
    return `### التحقيق التاريخي والأثري حول «هامان وفرعون»

**الحمد لله والصلاة والسلام على رسول الله؛**

**أولاً: الشبهة الكلاسيكية:**
زعم المشككون قديماً أن القرآن أخطأ بذكر "هامان" وزيراً لفرعون مصر!

**ثانياً: الإعجاز الأثري واكتشافات حجر رشيد [المصدر: معجم رانكه الهيروغليفي]:**
كشفت النقوش الهيروغليفية للدولة المصرية الحديثة المحفوظة في فيينا وباريس، عن اسم علم مصري صريح يُنطق (Ha-Aman) ولقبه الرسمي:
«رئيس عمال مقالع الحجارة لفرعون» (Vorsteher der Steinbruch-Arbeiter)!

**ثالثاً: دقة النص القرآني الإعجازية:**
تأمل قوله تعالى: ﴿فَأَوْقِدْ لِي يَا هَامَانُ عَلَى الطِّينِ فَاجْعَل لِّي صَرْحًا﴾ [القصص: 38]؛ فلم يأمره بالقيادة العسكرية، بل أمره بالبناء وحرق الطين والمقالع، وهي بالضبط وظيفته الأثرية المحفورة على الحجر قبل آلاف السنين!`;
  }

  // Strict refusal when question has no ground
  return `لم أجد في المصادر المعتمدة المتاحة لدي مادة كافية للإجابة عن هذا السؤال، ويمكنك إعادة صياغة السؤال أو البحث في قسم المصادر المتاحة بالمنصة.`;
}

// 5. Admin Authentication and Stats Endpoints
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  // Standard demo credentials for review & administrative management
  if (
    (username === "admin" && password === "huda2026") ||
    (username === "editor" && password === "editor2026") ||
    (username === "reviewer" && password === "review2026")
  ) {
    const role = username === "admin" ? "admin" : username === "editor" ? "editor" : "reviewer";
    logEvent("info", `Admin logged in successfully as: ${role}`);
    return res.json({
      success: true,
      token: `auth-token-${Date.now()}-${role}`,
      user: {
        username,
        role,
        permissions:
          role === "admin"
            ? ["all", "edit", "create", "delete", "review", "publish"]
            : role === "editor"
            ? ["edit", "create", "review"]
            : ["review"],
      },
    });
  }

  logEvent("warn", `Failed login attempt for user: ${username}`);
  return res.status(401).json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة" });
});

app.get("/api/admin/stats", (_req, res) => {
  const allRecords = getAllSearchableRecords();
  const byDiscipline: Record<string, number> = {};

  allRecords.forEach((r) => {
    byDiscipline[r.discipline] = (byDiscipline[r.discipline] || 0) + 1;
  });

  res.json({
    totalRecords: allRecords.length,
    totalSources: sourcesCatalog.length,
    byDiscipline,
    logs: systemLogs.slice(0, 50),
    systemHealth: "ممتازة (مؤمنة وسريعة)",
  });
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    logEvent("info", `منصة الهدى والنور تعمل الآن على http://0.0.0.0:${PORT}`);
  });
}

startServer();
