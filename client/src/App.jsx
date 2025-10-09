import React from "react";
import Shell from "./components/Shell";
import FancyBackground from "./components/FancyBackground";

/**
 * App renders a 2050-style gradient background + the shell layout.
 */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FancyBackground />
      <Shell />
    </div>
  );
}
