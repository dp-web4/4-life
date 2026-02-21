import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "4-Life: Trust-Native Internet Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(90deg, #38bdf8, #a855f7)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 24,
          }}
        >
          4-Life
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#e2e8f0",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          What if the internet made trust a built-in feature?
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 8,
          }}
        >
          {["Energy Costs", "Hardware Identity", "Permanent Reputation", "AI + Human"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: 12,
                  padding: "12px 24px",
                  color: "#38bdf8",
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "#64748b",
            fontSize: 16,
          }}
        >
          Interactive simulations of trust-native digital societies
        </div>
      </div>
    ),
    { ...size }
  );
}
