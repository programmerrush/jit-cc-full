import React, { useEffect, useState } from "react";
import { useCompilerStore } from "../store/useCompilerStore";
import Shimmer from "./Shimmer";
import { typeOut } from "../lib/typing";
import { motion, AnimatePresence } from "framer-motion";

function normalize(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

export default function OutputPanel() {
  const { isRunning, result } = useCompilerStore();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function runTyping() {
      setTyped("");
      if (!result) return;

      const parts = [];
      const out = normalize(result.stdout);
      const err = normalize(result.stderr);
      const comp = normalize(result.compile_output);

      if (out.trim()) parts.push(out.trim());
      if (err.trim()) parts.push(`[stderr]\n${err.trim()}`);
      if (comp.trim()) parts.push(`[compile]\n${comp.trim()}`);
      if (!parts.length) parts.push("(no output)");

      const full = parts.join("\n\n");
      for await (const s of typeOut(full, 6)) {
        if (cancelled) break;
        setTyped(s);
      }
    }

    runTyping();
    return () => {
      cancelled = true;
    };
  }, [result]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-white/70">Output</div>
        <div className="text-xs text-white/50">
          {result?.status?.description
            ? `Status: ${result.status.description}`
            : ""}
          {result?.time ? ` • Time: ${result.time}s` : ""}
          {result?.memory ? ` • Memory: ${result.memory} KB` : ""}
          {result?.timeMs ? ` • RTT: ${result.timeMs} ms` : ""}
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl p-3 font-mono text-sm bg-black/50 border border-white/10">
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Shimmer lines={10} />
              <div className="mt-3 text-xs text-white/50">Compiling ....</div>
            </motion.div>
          ) : (
            <motion.pre
              key="output"
              className="whitespace-pre-wrap typing-caret text-white"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {typed}
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
