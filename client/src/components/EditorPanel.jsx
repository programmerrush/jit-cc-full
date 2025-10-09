import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { useCompilerStore } from "../store/useCompilerStore";
import { getAISuggestions } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EditorPanel with redesigned futuristic AI toolkit modal
 */
export default function EditorPanel() {
  const { source, setSource, theme, languageId } = useCompilerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Complete language mapping from Judge0 IDs to Monaco ---
  const monacoLang = useMemo(() => {
    switch (languageId) {
      case 45:
        return "asm";
      case 46:
        return "bash";
      case 47:
        return "basic";
      case 104:
      case 110:
      case 75:
      case 103:
      case 48:
      case 49:
      case 50:
        return "c";
      case 76:
      case 105:
      case 52:
      case 53:
      case 54:
        return "cpp";
      case 86:
        return "clojure";
      case 51:
        return "csharp";
      case 77:
        return "cobol";
      case 55:
        return "commonlisp";
      case 90:
        return "dart";
      case 56:
        return "d";
      case 57:
        return "elixir";
      case 58:
        return "erlang";
      case 44:
        return "executable";
      case 87:
        return "fsharp";
      case 59:
        return "fortran";
      case 60:
      case 95:
      case 106:
      case 107:
        return "go";
      case 88:
        return "groovy";
      case 61:
        return "haskell";
      case 96:
      case 91:
      case 62:
        return "java";
      case 63:
      case 93:
      case 97:
      case 102:
        return "javascript";
      case 78:
      case 111:
        return "kotlin";
      case 64:
        return "lua";
      case 89:
        return "multi-file";
      case 79:
        return "objectivec";
      case 65:
        return "ocaml";
      case 66:
        return "octave";
      case 67:
        return "pascal";
      case 85:
        return "perl";
      case 68:
      case 98:
        return "php";
      case 43:
        return "plaintext";
      case 69:
        return "prolog";
      case 70:
      case 92:
      case 100:
      case 109:
      case 71:
        return "python";
      case 80:
      case 99:
        return "r";
      case 72:
        return "ruby";
      case 73:
      case 108:
        return "rust";
      case 81:
      case 112:
        return "scala";
      case 82:
        return "sql";
      case 83:
        return "swift";
      case 74:
      case 94:
      case 101:
        return "typescript";
      case 84:
        return "vb";
      default:
        return "plaintext";
    }
  }, [languageId]);

  const handleAIRequest = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const response = await getAISuggestions(prompt);
      setSource(response.suggestions);
      setIsModalOpen(false);
      setPrompt("");
    } catch (err) {
      console.error("AI Request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="text-sm text-white/80 mb-2 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-wide">Editor</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition-all duration-200 border border-cyan-400/30 hover:border-cyan-400/60"
        >
          <span className="flex items-center gap-2">
            <span>AI Toolkit</span>
            <span className="text-cyan-300">⟫</span>
          </span>
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <Editor
          value={source}
          onChange={(v) => setSource(v ?? "")}
          height="100%"
          language={monacoLang}
          theme={theme}
          options={{
            fontFamily: "JetBrains Mono",
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Futuristic Toolkit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Toolkit Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-80 rounded-xl border border-cyan-500/30 bg-gray-900/95 backdrop-blur-xl shadow-2xl"
            >
              {/* Sharp angled header */}
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 rounded-t-xl border-b border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <h3 className="text-cyan-100 font-bold text-sm tracking-wide">
                      ESM AI
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-6 h-6 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-cyan-200 hover:text-white transition-colors duration-150"
                  >
                    ×
                  </button>
                </div>
                <div className="absolute -bottom-1 left-4 w-3 h-3 bg-gray-900 rotate-45 border-b border-r border-cyan-500/30"></div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                    PROMPT ENGINE
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your code requirements..."
                    className="w-full h-24 p-3 rounded-lg bg-gray-800/80 border border-cyan-500/20 text-cyan-100 font-mono text-sm outline-none resize-none placeholder:text-cyan-100/40 focus:border-cyan-400/40 focus:ring-1 ring-cyan-400/20 transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleAIRequest();
                      }
                    }}
                  />
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400/70 font-mono">
                    {isLoading ? "[PROCESSING...]" : "[READY]"}
                  </span>
                  <span className="text-cyan-400/50 font-mono">CTRL+ENTER</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600 text-cyan-100 font-semibold text-sm transition-all duration-200 hover:border-gray-500"
                  >
                    ABORT
                  </button>
                  <button
                    onClick={handleAIRequest}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 border border-cyan-400/30 text-white font-bold text-sm shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        GENERATING...
                      </span>
                    ) : (
                      "EXECUTE"
                    )}
                  </button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl border border-cyan-400/10 pointer-events-none"></div>
              <div className="absolute -inset-1 rounded-xl bg-cyan-500/5 blur-sm pointer-events-none"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
