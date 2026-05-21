import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Onderzoek gestopt | MosselAI",
  description: "Het AI-adoptie onderzoek van MosselAI is gestopt.",
};

export default function OnderzoekPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F5F1E8" }}>
      <Header />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "64px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p style={{
            color: "#4A7FC4",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            Onderzoek
          </p>
          <h1 style={{
            color: "#1E3A5F",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}>
            Dit onderzoek is gestopt.
          </h1>
          <p style={{
            color: "#5F5E5A",
            fontSize: "16px",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}>
            Bedankt aan iedereen die heeft meegedaan. De resultaten worden verwerkt en gedeeld.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#1E3A5F",
              color: "#F5F1E8",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Terug naar de homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
