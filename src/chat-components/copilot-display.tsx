'use client';

import { Check } from 'lucide-react';
import React from 'react';

import { Card } from './ui/card';

type CopilotDisplayProps = {
  content: string;
};

export function CopilotDisplay({ content }: CopilotDisplayProps) {
  try {
    const json = JSON.parse(content);
    const formDataEntries = Object.entries(json);
    const query = formDataEntries
      .filter(
        ([key, value]) =>
          value === 'on' || (key === 'additional_query' && value !== ''),
      )
      .map(([key, value]) => (key === 'additional_query' ? value : key))
      .join(', ');

    return (
      <Card className="flex w-full items-center justify-between p-3 md:p-4">
        <h5 className="truncate text-xs text-muted-foreground">{query}</h5>
        <Check size={16} className="size-4 text-green-500" />
      </Card>
    );
  } catch (error) {
    return null;
  }
}
