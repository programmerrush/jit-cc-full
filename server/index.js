import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createJudge0Client } from "./judge0.js";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "2mb" })); // Increased limit for AI prompts
app.use(morgan("dev"));

const PORT = process.env.PORT || 9009;
const HOST = process.env.JUDGE0_HOST; // e.g., judge029.p.rapidapi.com
const KEY = process.env.JUDGE0_API_KEY; // RapidAPI key
const GEMINI_KEY = process.env.GEMINI_API_KEY; // Gemini AI key

// Validate keys
if (!HOST || !KEY) {
  console.error("❌ Missing JUDGE0_HOST or JUDGE0_API_KEY in .env");
  process.exit(1);
}
if (!GEMINI_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

const j0 = createJudge0Client({ host: HOST, apiKey: KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

// --------------------
// Health check
// --------------------
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "compiler-proxy + Gemini AI",
    time: new Date().toISOString(),
  });
});

// --------------------
// Judge0 Execute Endpoint
// --------------------
app.post("/api/execute", async (req, res) => {
  try {
    const { language_id, source_code, stdin = "" } = req.body || {};
    if (!language_id || typeof source_code !== "string") {
      return res
        .status(400)
        .json({ error: "language_id and source_code are required" });
    }

    const result = await j0.execute({ language_id, source_code, stdin });
    res.json(result);
  } catch (err) {
    console.error("Execute error:");
    if (err.response) {
      console.error("Upstream status:", err.response.status);
      console.error("Upstream headers:", err.response.headers);
      console.error("Upstream data:", err.response.data);
    } else {
      console.error(err);
    }

    res.status(err?.response?.status || 500).json({
      error: "Execution failed",
      message: err?.message || "Unknown error",
      upstream: err?.response?.data || null,
    });
  }
});

// --------------------
// Gemini AI Suggestions Endpoint
// --------------------
app.post("/api/ai-suggestions", async (req, res) => {
  try {
    const { code } = req.body; // user prompt
    if (!code) return res.status(400).json({ error: "Prompt is required" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: code,
    });

    res.json({ suggestions: response.text });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// Start server
// --------------------
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server listening on http://127.0.0.1:${PORT}`)
);
