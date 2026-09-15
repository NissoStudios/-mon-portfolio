"use client";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./language-context";
import type { Lang } from "../../lib/i18n";

export function Providers({ children, defaultLang = "fr" }: { children: React.ReactNode; defaultLang?: Lang }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LanguageProvider defaultLang={defaultLang}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
