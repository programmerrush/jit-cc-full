import React from "react";

export default function Shimmer({ lines = 6 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-full rounded bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse"
        />
      ))}
    </div>
  );
}
