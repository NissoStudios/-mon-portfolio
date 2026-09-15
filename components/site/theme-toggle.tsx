"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMountedState } from "./decor";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMountedState();

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-colors " +
        className
      }
    >
      {mounted && !isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
