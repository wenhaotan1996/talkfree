'use client';
import { useState } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

type Props = {};

const delay = 1000;

const colors = [
  'text-orange-500',
  'text-blue-500',
  'text-lime-500',
  'text-cyan-500',
  'text-rose-500',
];
export default function TypeWriter({}: Props) {
  const [color, setColor] = useState(0);
  const [shouldSwitchColor, setShouldSwitchColor] = useState(false);

  const [text, _] = useTypewriter({
    words: [
      'Talk Free',
      '自由交谈',
      'フリートーク',
      'Habla Gratis',
      'Frei Reden',
      'говорить свободно',
      'मुक्त होकर बात करें',
      'التحدث مجانا',
    ],
    loop: true,
    delaySpeed: delay,
    onDelay: () => setShouldSwitchColor(true),
    onType: () => {
      if (shouldSwitchColor) {
        setShouldSwitchColor(false);
        setColor((color + 1) % colors.length);
      }
    },
  });
  return (
    <h1 className={`text-5xl font-semibold lg:text-7xl ${colors[color]}`}>
      <span className="ml-3">{text}</span>
      <Cursor />
    </h1>
  );
}
