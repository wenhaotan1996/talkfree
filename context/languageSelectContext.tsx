'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import type { LanguageKey } from '@/lib/languages';

type ContextValue = {
  language: LanguageKey;
  setLanguage: Dispatch<SetStateAction<LanguageKey>>;
};

export const LanguageContext = createContext<ContextValue>({
  language: 'en',
  setLanguage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState<LanguageKey>('en');
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
}
