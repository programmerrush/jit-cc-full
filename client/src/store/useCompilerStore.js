import { create } from "zustand";

/**
 * Global store for editor state, language, stdin, and run results.
 * Kept small & serializable to avoid re-renders in Monaco.
 */
export const useCompilerStore = create((set) => ({
  languageId: 63, // 63 = JavaScript (Node.js) in Judge0
  theme: "hc-black",
  source: `// Welcome to the 2050 Compiler 🌌
/* Try JS (language: JavaScript - Node.js) */
function solve() {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf8').trim();
  console.log('Echo:', input || 'no stdin');
}
solve();`, // Default code
  stdin: "",
  isRunning: false,
  result: null, // { stdout, stderr, compile_output, status, memory, time, timeMs }

  setLanguageId: (id) => set({ languageId: id }),
  setTheme: (t) => set({ theme: t }),
  setSource: (s) => set({ source: s }),
  setStdin: (i) => set({ stdin: i }),
  setIsRunning: (v) => set({ isRunning: v }),
  setResult: (r) => set({ result: r }),

  clearIO: () => set({ stdin: "", result: null }),
}));
