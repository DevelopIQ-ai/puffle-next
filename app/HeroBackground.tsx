"use client";

import AsciiPortrait from "./AsciiPortrait";

export default function HeroBackground() {
  return (
    <div className="hero-columns" aria-hidden="true">
      <AsciiPortrait
        src="/columns.png"
        cols={200}
        color="190, 182, 168"
        intensity={0.55}
      />
    </div>
  );
}
