"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "nl" | "en";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "nl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    const stored = localStorage.getItem("mossel_lang");
    if (stored === "en" || stored === "nl") {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("mossel_lang", l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// Kleine helper: kies de juiste taalvariant
export function pick<T>(lang: Lang, nl: T, en: T): T {
  return lang === "en" ? en : nl;
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["nl", "en"];
  return (
    <div
      role="group"
      aria-label="Taal / Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #E8E4DB",
        borderRadius: "8px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {langs.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            style={{
              padding: "6px 9px",
              fontSize: "12px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              lineHeight: 1,
              backgroundColor: active ? "#1E3A5F" : "transparent",
              color: active ? "#F5F1E8" : "#8A8A85",
              transition: "background-color 0.15s, color 0.15s",
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
