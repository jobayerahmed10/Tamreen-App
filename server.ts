import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Initialize Gemini AI lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Tamreen competitive exam prep" });
  });

  // AI Assistant Chat endpoint ("চর্চা AI")
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `You are "চর্চা AI" (Chorcha AI), a friendly, expert Bengali tutor for Bangladeshi competitive job exams (BCS, NTRCA, Primary Teacher Exam, Bank Jobs).
Always answer in clear, polite Bengali (বাংলা).
Explain concepts succinctly, provide mnemonics/shortcuts, and format explanations with bullet points.
If given an exam question or topic, provide the correct answer and a helpful explanation.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\n[Context: ${context || 'General Study'}]\n\nUser Question: ${prompt}` }] }
        ]
      });

      res.json({ reply: response.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।" });
    } catch (error: any) {
      console.error("Gemini AI error:", error);
      res.status(500).json({ error: error.message || "AI Service Error" });
    }
  });

  // AI Question Generator endpoint for Admin
  app.post("/api/ai/generate-questions", async (req, res) => {
    try {
      const { subject, topic, count, difficulty } = req.body;
      const ai = getGeminiClient();

      const prompt = `Generate ${count || 3} multiple-choice exam questions in Bengali for Bangladeshi BCS/Job exam.
Subject: ${subject}
Topic: ${topic || 'General'}
Difficulty: ${difficulty || 'Medium'}

Return ONLY a valid JSON array of objects with this structure:
[
  {
    "questionText": "প্রশ্ন এখানে...",
    "options": [
      {"key": "ক", "text": "অপশন ১"},
      {"key": "খ", "text": "অপশন ২"},
      {"key": "গ", "text": "অপশন ৩"},
      {"key": "ঘ", "text": "অপশন ৪"}
    ],
    "correctAnswerKey": "ক",
    "explanation": "ব্যাখ্যা...",
    "sourceBadge": "বিসিএস প্রিলি নমুনা"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });

      const text = response.text || "[]";
      // Sanitize JSON response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const questions = JSON.parse(jsonMatch[0]);
        res.json({ questions });
      } else {
        res.json({ questions: [] });
      }
    } catch (error: any) {
      console.error("AI question generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate questions" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
