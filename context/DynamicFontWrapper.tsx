'use client';

import { useFont } from "./FontContext";

export function DynamicFontWrapper({ children }: { children: React.ReactNode }) {
    const { currentFont } = useFont();
    return <div className={currentFont}>{children}</div>;
  }