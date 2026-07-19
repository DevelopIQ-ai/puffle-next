import { ImageResponse } from "next/og";

const puffleLogoUrl = "https://www.puffle.ai/puffle-logo.png";

export const alt = "Puffle — your AI growth employee";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
          backgroundColor: "#f9f9f5",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(111, 144, 255, 0.36), transparent 30%), radial-gradient(circle at 16% 95%, rgba(241, 229, 170, 0.34), transparent 34%)",
          color: "#111111",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={puffleLogoUrl}
            width="42"
            height="42"
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            Puffle
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              maxWidth: "900px",
              fontSize: "90px",
              lineHeight: 0.94,
              letterSpacing: "-0.06em",
            }}
          >
            Your AI growth employee.
          </div>
          <div
            style={{
              maxWidth: "670px",
              fontFamily: "sans-serif",
              fontSize: "29px",
              lineHeight: 1.35,
              color: "#333333",
            }}
          >
            Give Puffle your company and a goal.
          </div>
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: "20px",
            color: "#4169e1",
            letterSpacing: "0.04em",
          }}
        >
          PUFFLE.AI
        </div>
      </div>
    ),
    size,
  );
}
