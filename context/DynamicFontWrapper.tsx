'use client';

import { useEffect } from "react";
import { useFont } from "./FontContext";

export function DynamicFontWrapper({ children }: { children: React.ReactNode }) {
  const { currentFont , setFont} = useFont();
  const selectedFont = localStorage.getItem('fontPref') || 'Sans-serif';

  useEffect(() => { // Initialize the selected theme on first mount.
    if (selectedFont === 'Sans-serif') {
      setFont('inter');
    } else if (selectedFont === 'Serif') {
      setFont('noto');
    } else if (selectedFont === 'Monospace') {
      setFont('mono');
    }
  }, [])

  return <div className={currentFont}>{children}</div>;
}