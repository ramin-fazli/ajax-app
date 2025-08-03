import React from 'react';

import { cn } from '@/lib/utils';

import { ModeToggle } from './mode-toggle';
import { IconLogo } from './ui/icons';
// import HistoryContainer from './history-container'

export const Header: React.FC = async () => {
  return (
    <header className="fixed z-10 flex w-full items-center justify-between bg-background/80 p-1 backdrop-blur md:bg-transparent md:p-2 md:backdrop-blur-none">
      <div>
        <a href="/">
          <IconLogo className={cn('w-32 h-9')} />
          <span className="sr-only">tryajax.com</span>
        </a>
      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
