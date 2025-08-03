'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';

export function TypingText({ strings, typeSpeed, loop }:
{ strings: string[]; typeSpeed: number; loop: boolean }) {
  return <ReactTyped strings={strings} typeSpeed={typeSpeed} loop={loop} />;
}

export function TypingTextWrapper({ children }: { children: ReactNode }) {
  const [showTypingText, setShowTypingText] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowTypingText(true);
    const timer = setTimeout(() => {
      setShowTypingText(false);
    }, 5000); // Adjust the timeout duration as needed
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {showTypingText && (
        <div className="flex h-1/2 flex-col items-center justify-center text-2xl">
          {children}
        </div>
      )}
    </>
  );
}
