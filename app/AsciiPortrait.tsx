"use client";

import { useRef, useEffect, useCallback } from "react";

const ASCII_CHARS = " .:-=+*#%@";
const BINARY_CHARS = "01";

interface AsciiPortraitProps {
  src: string;
  cols?: number;
  color?: string;
  intensity?: number;
  mode?: "ascii" | "binary";
  className?: string;
}

export default function AsciiPortrait({
  src,
  cols = 60,
  color = "30, 58, 138",
  intensity = 1,
  mode = "binary",
  className = "binary-logo-canvas",
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const gridRef = useRef<{
    char: string;
    brightness: number;
    flickerChar: string;
    flickerTimer: number;
  }[][]>([]);
  const timeRef = useRef(0);

  const buildGrid = useCallback(
    (img: HTMLImageElement, w: number, h: number, numCols: number) => {
      // Sample the image at grid resolution
      const offscreen = document.createElement("canvas");
      const cellW = w / numCols;
      const cellH = cellW * 1.8; // monospace chars are taller than wide
      const numRows = Math.floor(h / cellH);
      offscreen.width = numCols;
      offscreen.height = numRows;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, numCols, numRows);
      const imageData = offCtx.getImageData(0, 0, numCols, numRows);

      const grid: {
        char: string;
        brightness: number;
        flickerChar: string;
        flickerTimer: number;
      }[][] = [];

      for (let r = 0; r < numRows; r++) {
        const row: (typeof grid)[0] = [];
        for (let c = 0; c < numCols; c++) {
          const idx = (r * numCols + c) * 4;
          const red = imageData.data[idx];
          const green = imageData.data[idx + 1];
          const blue = imageData.data[idx + 2];
          const alpha = imageData.data[idx + 3];
          // luminance
          const brightness =
            alpha < 128
              ? 0
              : (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          // Invert: dark pixels = high value, light pixels = low value
          const darkness = 1 - brightness;

          let char: string;
          if (mode === "ascii") {
            const charIdx = Math.floor(
              darkness * (ASCII_CHARS.length - 1)
            );
            char = ASCII_CHARS[charIdx];
          } else {
            char =
              darkness > 0.05
                ? BINARY_CHARS[Math.floor(Math.random() * 2)]
                : " ";
          }

          row.push({
            char,
            brightness: darkness,
            flickerChar:
              BINARY_CHARS[Math.floor(Math.random() * 2)],
            flickerTimer: Math.floor(Math.random() * 120),
          });
        }
        grid.push(row);
      }
      return { grid, numRows, cellW, cellH };
    },
    [mode]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    let gridData: ReturnType<typeof buildGrid> | null = null;

    img.onload = () => {
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gridData = buildGrid(img, rect.width, rect.height, cols);
      };

      resize();
      window.addEventListener("resize", resize);

      const animate = () => {
        if (!gridData) {
          animRef.current = requestAnimationFrame(animate);
          return;
        }

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, rect.width, rect.height);

        const { grid, numRows, cellW, cellH } = gridData;
        const numCols = grid[0]?.length || 0;
        timeRef.current++;

        const fontSize = Math.max(8, cellW * 1.1);
        ctx.font = `${fontSize}px "SF Mono", "Fira Code", "Courier New", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let r = 0; r < numRows; r++) {
          for (let c = 0; c < numCols; c++) {
            const cell = grid[r][c];
            if (cell.brightness < 0.05) continue;

            // Flicker: occasionally swap char
            cell.flickerTimer--;
            if (cell.flickerTimer <= 0) {
              cell.flickerTimer = 60 + Math.floor(Math.random() * 120);
              if (mode === "binary") {
                cell.char =
                  BINARY_CHARS[Math.floor(Math.random() * 2)];
              }
            }

            const x = c * cellW + cellW / 2;
            const y = r * cellH + cellH / 2;

            // Brightness controls opacity
            const alpha = cell.brightness * intensity;
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.fillText(cell.char, x, y);
          }
        }

        animRef.current = requestAnimationFrame(animate);
      };

      animRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("resize", resize);
      };
    };

    img.src = src;

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [src, cols, color, intensity, mode, buildGrid]);

  return <canvas ref={canvasRef} className={className} />;
}
