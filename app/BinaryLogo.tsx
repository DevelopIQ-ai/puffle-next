"use client";

import { useRef, useEffect, useCallback } from "react";

// Puffle blob path
export const BLOB_PATH =
  "M 142.449219 103.285156 C 143.296875 102.667969 144.113281 101.914062 144.894531 101.007812 C 153.285156 91.273438 147.230469 61.367188 149.351562 48.539062 C 150.109375 43.957031 154.574219 14.585938 162.144531 29.726562 C 176.125 57.691406 172.628906 120.605469 198.84375 106.625 C 225.058594 92.644531 301.953125 50.699219 279.234375 92.644531 C 256.515625 134.585938 197.097656 159.054688 246.03125 178.277344 C 294.964844 197.5 356.132812 232.453125 305.449219 234.199219 C 254.769531 235.949219 251.273438 234.199219 272.246094 270.902344 C 293.21875 307.601562 287.972656 316.339844 256.515625 293.621094 C 225.058594 270.902344 212.828125 245.167969 204.085938 306.09375 C 195.347656 367.019531 176.125 358.28125 163.890625 314.589844 C 151.65625 270.902344 148.164062 276.144531 125.441406 311.097656 C 102.722656 346.050781 92.238281 321.582031 97.480469 277.890625 C 102.722656 234.199219 90.488281 248.179688 69.519531 269.152344 C 48.546875 290.125 29.320312 279.640625 60.777344 237.695312 C 92.238281 195.753906 104.46875 183.519531 73.011719 176.53125 C 41.554688 169.539062 43.304688 152.0625 76.507812 146.820312 C 109.714844 141.578125 88.742188 127.597656 62.527344 82.15625 C 36.328125 36.75 92.164062 73.367188 109.695312 90.875 C 117.753906 98.925781 132.347656 110.667969 142.449219 103.289062 Z";

// Person bust silhouette (head + neck + shoulders with natural curves, viewBox 0 0 200 280)
export const PERSON_PATH =
  "M 100 8 C 70 8 46 34 46 66 C 46 82 53 96 64 106 C 58 110 54 114 54 114 C 50 118 48 120 48 120 C 53 122 60 118 64 115 C 72 121 84 125 100 125 C 116 125 128 121 136 115 C 140 118 147 122 152 120 C 152 120 150 118 146 114 C 146 114 142 110 136 106 C 147 96 154 82 154 66 C 154 34 130 8 100 8 Z M 100 132 L 100 132 C 94 132 88 133 82 135 L 80 136 C 74 138 68 141 62 145 C 50 153 38 162 28 174 C 18 186 10 200 6 216 C 3 228 2 240 2 254 L 2 280 L 198 280 L 198 254 C 198 240 197 228 194 216 C 190 200 182 186 172 174 C 162 162 150 153 138 145 C 132 141 126 138 120 136 L 118 135 C 112 133 106 132 100 132 Z";

const CHARS = "01";

interface BinaryLogoProps {
  shapePath?: string;
  /** viewBox size the path was designed for (square) */
  pathSize?: number;
  /** viewBox width (overrides pathSize if set) */
  pathWidth?: number;
  /** viewBox height (overrides pathSize if set) */
  pathHeight?: number;
  color?: string;
  /** base opacity multiplier (0–1) */
  intensity?: number;
  fontSize?: number;
  cols?: number;
  className?: string;
}

export default function BinaryLogo({
  shapePath = BLOB_PATH,
  pathSize = 375,
  pathWidth,
  pathHeight,
  color = "65, 105, 225",
  intensity = 0.45,
  fontSize = 11,
  cols: colsApprox = 50,
  className = "binary-logo-canvas",
}: BinaryLogoProps) {
  const pw = pathWidth ?? pathSize;
  const ph = pathHeight ?? pathSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<{ char: string; opacity: number; targetOpacity: number }[][]>([]);
  const animRef = useRef<number>(0);
  const maskRef = useRef<boolean[][]>([]);
  const timeRef = useRef(0);
  const propsRef = useRef({ shapePath, pw, ph, color, intensity, fontSize, colsApprox });
  propsRef.current = { shapePath, pw, ph, color, intensity, fontSize, colsApprox };

  const initGrid = useCallback((cols: number, rows: number) => {
    const grid: { char: string; opacity: number; targetOpacity: number }[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: { char: string; opacity: number; targetOpacity: number }[] = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          opacity: 0.3 + Math.random() * 0.5,
          targetOpacity: 0.3 + Math.random() * 0.5,
        });
      }
      grid.push(row);
    }
    return grid;
  }, []);

  const buildMask = useCallback((w: number, h: number, cols: number, rows: number) => {
    const { shapePath: sp, pw: pWidth, ph: pHeight } = propsRef.current;
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext("2d")!;

    const padding = 0.05;
    const scaleX = (1 - padding * 2) * w / pWidth;
    const scaleY = (1 - padding * 2) * h / pHeight;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (w - pWidth * scale) / 2;
    const offsetY = (h - pHeight * scale) / 2;

    offCtx.save();
    offCtx.translate(offsetX, offsetY);
    offCtx.scale(scale, scale);
    const path = new Path2D(sp);
    offCtx.fillStyle = "black";
    offCtx.fill(path);
    offCtx.restore();

    const imageData = offCtx.getImageData(0, 0, w, h);
    const cellW = w / cols;
    const cellH = h / rows;
    const mask: boolean[][] = [];

    for (let r = 0; r < rows; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < cols; c++) {
        const px = Math.floor(c * cellW + cellW / 2);
        const py = Math.floor(r * cellH + cellH / 2);
        const idx = (py * w + px) * 4;
        row.push(imageData.data[idx + 3] > 128);
      }
      mask.push(row);
    }
    return mask;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const { colsApprox: ca } = propsRef.current;
      const cellW = rect.width / ca;
      const rows = Math.floor(rect.height / cellW);
      const cols = ca;

      gridRef.current = initGrid(cols, rows);
      maskRef.current = buildMask(Math.floor(rect.width), Math.floor(rect.height), cols, rows);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const { color: clr, intensity: inten, fontSize: fs } = propsRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const grid = gridRef.current;
      const mask = maskRef.current;
      if (!grid.length || !mask.length) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const cols = grid[0].length;
      const rows = grid.length;
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;

      timeRef.current++;

      if (timeRef.current % 4 === 0) {
        const numChanges = Math.floor(cols * rows * 0.02);
        for (let i = 0; i < numChanges; i++) {
          const r = Math.floor(Math.random() * rows);
          const c = Math.floor(Math.random() * cols);
          if (mask[r]?.[c]) {
            grid[r][c].char = CHARS[Math.floor(Math.random() * CHARS.length)];
            grid[r][c].targetOpacity = 0.2 + Math.random() * 0.6;
          }
        }
      }

      ctx.font = `${fs}px "SF Mono", "Fira Code", "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!mask[r]?.[c]) continue;

          const cell = grid[r][c];
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.05;

          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;

          ctx.fillStyle = `rgba(${clr}, ${cell.opacity * inten})`;
          ctx.fillText(cell.char, x, y);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initGrid, buildMask]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
}
