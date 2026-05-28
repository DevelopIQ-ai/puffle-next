"use client";

import AsciiPortrait from "./AsciiPortrait";

export default function HeroVisual() {
  return (
    <div className="hero-visual-container">
      <AsciiPortrait
        src="/puffle-logo.svg"
        cols={96}
        color="25, 50, 120"
        intensity={1.4}
      />
    </div>
  );
}
