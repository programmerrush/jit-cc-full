import axios from "axios";

// Explicitly point to backend during dev
const base = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || "http://127.0.0.1:9009"
  : "http://127.0.0.1:9009"; // <-- backend Express server

export const API = axios.create({ baseURL: base });

// Existing execute function
export async function executeCode({ language_id, source_code, stdin }) {
  const res = await API.post("/api/execute", {
    language_id,
    source_code,
    stdin,
  });
  return res.data;
}

// AI function with improved response for GitHub Copilot-like behavior
export async function getAISuggestions(prompt) {
  const res = await API.post("/api/ai-suggestions", { code: prompt });
  return res.data;
}
