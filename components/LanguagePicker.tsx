'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguageContext } from '@/context/languageSelectContext';
import { LanguageKey, supportedLanguage } from '@/lib/languages';
import { useContext } from 'react';

type Props = {};

export default function LanguagePicker({}: Props) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Select
      value={language}
      onValueChange={(e) => setLanguage(e as LanguageKey)}>
      <SelectTrigger className="w-[100px] md:w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(supportedLanguage).map(({ language, name }) => (
          <SelectItem value={language} key={language}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
