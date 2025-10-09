import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FancyBackground() {
  const dotsRef = useRef([]);

  useEffect(() => {
    dotsRef.current.forEach((el, i) => {
      const dur = 8 + Math.random() * 6;
      const y = 20 + Math.random() * 40;
      gsap.to(el, {
        y: `-=${y}`,
        duration: dur,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 animate-bg-pan"
      style={{
        background:
          "linear-gradient(120deg, #0f172a, #1e293b, #0b1020, #1a103d, #0a0a2a)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl bg-fuchsia-600/20" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full blur-3xl bg-indigo-600/20" />
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
          style={{
            top: `${10 + ((i * 5) % 90)}%`,
            left: `${(i * 13) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}
