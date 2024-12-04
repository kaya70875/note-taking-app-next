'use client';

import React, { createContext, useState, useContext } from 'react';

const fonts = {
  inter: 'font-inter',
  noto: 'font-noto',
  mono: 'font-mono',
};

type FontContextType = {
  currentFont: string;
  setFont: (font: keyof typeof fonts) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState(fonts.inter);

  const setFont = (font: keyof typeof fonts) => {
    setCurrentFont(fonts[font]);
  };

  return (
    <FontContext.Provider value={{ currentFont, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
