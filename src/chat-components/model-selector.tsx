'use client';

import Image from 'next/image';

import type { Model } from '@/lib/types/models';
import { models } from '@/lib/types/models';
import { createModelId } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type ModelSelectorProps = {
  selectedModelId: string;
  onModelChange: (id: string) => void;
};

function groupModelsByProvider(models: Model[]) {
  return models.reduce((groups, model) => {
    const provider = model.provider;
    if (!groups[provider]) {
      groups[provider] = [];
    }
    groups[provider].push(model);
    return groups;
  }, {} as Record<string, Model[]>);
}

export function ModelSelector({
  selectedModelId,
  onModelChange,
}: ModelSelectorProps) {
  const handleModelChange = (id: string) => {
    onModelChange(id);
  };

  const groupedModels = groupModelsByProvider(models);

  return (
    <div className="absolute -top-8 left-2">
      <Select
        name="model"
        value={selectedModelId}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="mr-2 h-7 border-none text-xs shadow-none focus:ring-0">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {Object.entries(groupedModels).map(([provider, models]) => (
            <SelectGroup key={provider}>
              <SelectLabel className="sticky top-0 z-10 bg-background text-xs">
                {provider}
              </SelectLabel>
              {models.map(model => (
                <SelectItem
                  key={createModelId(model)}
                  value={createModelId(model)}
                  className="py-2"
                >
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`/providers/logos/${model.providerId}.svg`}
                      alt={model.provider}
                      width={18}
                      height={18}
                      className="rounded-full border bg-white"
                    />
                    <span className="text-xs font-medium">{model.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
