import React from "react";
import { useCompilerStore } from "../store/useCompilerStore";

export default function InputPanel() {
  const { stdin, setStdin } = useCompilerStore();

  return (
    <div className="h-full flex flex-col">
      <div className="text-sm text-white/70 mb-2">Input (stdin)</div>
      <textarea
        className="flex-1 w-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono text-white placeholder-white/50"
        placeholder="Type input for your program…"
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
      />
    </div>
  );
}
