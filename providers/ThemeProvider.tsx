'use client';

import { ThemeProvider } from "next-themes";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  );
}