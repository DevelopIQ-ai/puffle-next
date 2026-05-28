"use client";

import AsciiPortrait from "./AsciiPortrait";

export default function HeroVisual() {
  return (
    <div className="hero-visual-container">
      <AsciiPortrait
        src="/portrait.png"
        cols={80}
        color="25, 50, 120"
        intensity={1.4}
      />
    </div>
  );
}
