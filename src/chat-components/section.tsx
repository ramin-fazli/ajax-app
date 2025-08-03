'use client';

import {
  BadgeInfo,
  BookCheck,
  Film,
  Image,
  Newspaper,
  Repeat2,
  Search,
  Settings2,
  Workflow,
} from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Separator } from './ui/separator';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  separator?: boolean;
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false,
}) => {
  const iconSize = 16;
  const iconClassName = 'mr-1.5 text-muted-foreground';
  let icon: React.ReactNode;
  switch (title) {
    case 'Images':

      icon = <Image size={iconSize} className={iconClassName} />;
      break;
    case 'Videos':
      icon = <Film size={iconSize} className={iconClassName} />;
      break;
    case 'Sources':
      icon = <Newspaper size={iconSize} className={iconClassName} />;
      break;
    case 'Answer':
      icon = <BookCheck size={iconSize} className={iconClassName} />;
      break;
    case 'Related':
      icon = <Repeat2 size={iconSize} className={iconClassName} />;
      break;
    case 'Refine':
      icon = <Settings2 size={iconSize} className={iconClassName} />;
      break;
    case 'AI Wizard':
      icon = <BadgeInfo size={iconSize} className={iconClassName} />;
      break;
    case 'Agentic AI Workflow':
      icon = <Workflow size={iconSize} className={iconClassName} />;
      break;
    default:
      icon = <Search size={iconSize} className={iconClassName} />;
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className,
        )}
      >
        {title && (
          <h2 className="flex items-center py-2 leading-none">
            {icon}
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  );
};
