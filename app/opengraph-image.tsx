import { ImageResponse } from "next/og";

export const alt = "Puffle — the AI growth employee for founder-led teams";
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
          padding: "72px 84px",
          background:
            "linear-gradient(135deg, #fcfef8 0%, #f8f4e8 58%, #dbe4ff 100%)",
          color: "#171717",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#4169e1",
              display: "flex",
            }}
          />
          <div style={{ fontSize: "38px" }}>Puffle</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: "78px", lineHeight: 1.02, maxWidth: "980px" }}>
            The AI growth employee for founder-led teams
          </div>
          <div style={{ fontSize: "31px", color: "#4169e1" }}>
            Strategy, research, leads, and outbound
          </div>
        </div>
      </div>
    ),
    size,
  );
}
