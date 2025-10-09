import React from "react";
import { useCompilerStore } from "../store/useCompilerStore";
import { executeCode } from "../services/api";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

function toReadableError(e) {
  const payload = e?.response?.data ?? e;
  const upstream = payload?.upstream;

  let lines = [];
  if (payload?.error) lines.push(String(payload.error));
  if (payload?.message) lines.push(String(payload.message));
  if (upstream) {
    try {
      lines.push(JSON.stringify(upstream, null, 2));
    } catch {
      lines.push(String(upstream));
    }
  } else if (typeof payload === "string") {
    lines.push(payload);
  } else if (e?.message) {
    lines.push(String(e.message));
  } else {
    try {
      lines.push(JSON.stringify(payload, null, 2));
    } catch {
      lines.push(String(payload));
    }
  }
  return lines.filter(Boolean).join("\n");
}

export default function RunButtons() {
  const {
    languageId,
    source,
    stdin,
    isRunning,
    setIsRunning,
    setResult,
    clearIO,
  } = useCompilerStore();

  const onRun = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      const data = await executeCode({
        language_id: languageId,
        source_code: source,
        stdin,
      });
      setResult(data);
    } catch (e) {
      setResult({
        status: { description: "Request Error" },
        stderr: toReadableError(e),
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow:
            "0 0 0 2px rgba(99,102,241,0.4), 0 0 24px rgba(99,102,241,0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        disabled={isRunning}
        onClick={onRun}
        className={`px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition flex items-center gap-2 text-white ${
          isRunning ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <Play size={18} /> {isRunning ? "Running…" : "Run Code"}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={clearIO}
        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-2 text-white"
      >
        <RotateCcw size={18} /> Clear IO
      </motion.button>
    </div>
  );
}
