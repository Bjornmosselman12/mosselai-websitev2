"use client";

import Image from "next/image";

const tools = [
  { name: "Make",      src: "/logos/make.svg"      },
  { name: "n8n",       src: "/logos/n8n.svg"       },
  { name: "OpenAI",    src: "/logos/openai.svg"    },
  { name: "Anthropic", src: "/logos/anthropic.svg" },
  { name: "Zapier",    src: "/logos/zapier.svg"    },
  { name: "Google",    src: "/logos/google.svg"    },
  { name: "Microsoft", src: "/logos/microsoft.svg" },
];

// 4× dupliceren: altijd genoeg items om het scherm te vullen, -50% = naadloze loop
const track = [...tools, ...tools, ...tools, ...tools];

export default function TechStack() {
  return (
    <section
      style={{
        backgroundColor: "#F5F1E8",
        padding: "20px 0 24px",
        borderTop: "1px solid #E8E4DB",
        borderBottom: "1px solid #E8E4DB",
      }}
    >
      <p
        style={{
          color: "#5F5E5A",
          fontSize: "12px",
          textAlign: "center",
          marginBottom: "16px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Gebouwd op bewezen tools
      </p>

      {/* Outer clip: alleen horizontaal hidden zodat de logos verticaal niet worden afgeknipt */}
      <div style={{ overflow: "hidden" }}>
        {/* Fade edges */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "60px",
              background: "linear-gradient(to right, #F5F1E8, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "60px",
              background: "linear-gradient(to left, #F5F1E8, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
              width: "max-content",
              padding: "4px 0",
              animation: "marquee 28s linear infinite",
            }}
          >
            {track.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  opacity: 0.5,
                }}
              >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={24}
                  height={24}
                  style={{
                    filter: "grayscale(1) brightness(0.2)",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    color: "#2C2C2E",
                    fontSize: "14px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
