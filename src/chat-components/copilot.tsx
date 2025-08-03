'use client';

import type {
  StreamableValue,
} from 'ai/rsc';
import {
  useActions,
  useStreamableValue,
  useUIState,
} from 'ai/rsc';
import { ArrowRight, Check, FastForward, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import type { AI } from '@/app/[locale]/(auth)/(main)/(dashboard)/dashboard/actions';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import type { PartialInquiry } from '@/lib/schema/inquiry';
import { models } from '@/lib/types/models';
import { getDefaultModelId } from '@/lib/utils';
import { useAppState } from '@/lib/utils/app-state';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

export type CopilotProps = {
  inquiry?: StreamableValue<PartialInquiry>;
};

export const Copilot: React.FC<CopilotProps> = ({ inquiry }: CopilotProps) => {
  const [completed, setCompleted] = useState(false);
  const [query, setQuery] = useState('');
  const [skipped, setSkipped] = useState(false);
  const [data, error, pending] = useStreamableValue<PartialInquiry>(inquiry);
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();
  const { isGenerating, setIsGenerating } = useAppState();
  const [object, setObject] = useState<PartialInquiry>();
  const [selectedModelId] = useLocalStorage<string>(
    'selectedModel',
    getDefaultModelId(models),
  );

  const checkIfButtonShouldBeEnabled = (currentOptions = checkedOptions) => {
    const anyCheckboxChecked = Object.values(currentOptions).some(
      checked => checked,
    );
    setIsButtonDisabled(!(anyCheckboxChecked || query));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    checkIfButtonShouldBeEnabled();
  };

  const handleOptionChange = (selectedOption: string) => {
    const updatedCheckedOptions = {
      ...checkedOptions,
      [selectedOption]: !checkedOptions[selectedOption],
    };
    setCheckedOptions(updatedCheckedOptions);
    checkIfButtonShouldBeEnabled(updatedCheckedOptions);
  };

  const updatedQuery = () => {
    const selectedOptions = Object.entries(checkedOptions)
      .filter(([, checked]) => checked)
      .map(([option]) => option);
    return [...selectedOptions, query].filter(Boolean).join(', ');
  };

  useEffect(() => {
    checkIfButtonShouldBeEnabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setObject(data);
  }, [data]);

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    skip?: boolean,
  ) => {
    e.preventDefault();

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    setCompleted(true);
    setSkipped(skip || false);

    // Always create FormData
    const formData = new FormData();

    // Add model information
    formData.set('model', selectedModelId);

    // If not skipping, add form data from the event
    if (!skip) {
      const form = e.target as HTMLFormElement;
      const formEntries = Array.from(new FormData(form).entries());
      formEntries.forEach(([key, value]) => {
        if (key !== 'model') {
          // Don't override model
          formData.append(key, value);
        }
      });
    }

    const response = await submit(formData, skip);
    setMessages(currentMessages => [...currentMessages, response]);
  };

  const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
    onFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>, true);
  };

  if (error) {
    return (
      <Card className="flex w-full items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="size-4" />
          <h5 className="truncate text-xs text-muted-foreground">
            {`error: ${error}`}
          </h5>
        </div>
      </Card>
    );
  }

  if (skipped) {
    return null;
  }

  if (completed) {
    return (
      <Card className="flex w-full items-center justify-between p-3 md:p-4">
        <div className="flex min-w-0 flex-1 items-center space-x-2">
          <h5 className="truncate text-xs text-muted-foreground">
            {updatedQuery()}
          </h5>
        </div>
        <Check size={16} className="size-4 text-green-500" />
      </Card>
    );
  } else {
    return (
      <Card className="mx-auto w-full rounded-lg p-4">
        <div className="mb-4">
          <p className="ml-2 text-lg font-semibold text-foreground">
            {object?.question}
          </p>
        </div>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4 flex flex-wrap justify-start">
            {object?.options?.map(option => (
              <div
                key={`option-${option?.value || option?.label}`}
                className="mb-2 flex items-center space-x-1.5"
              >
                <Checkbox
                  id={option?.value}
                  name={option?.value}
                  onCheckedChange={() =>
                    handleOptionChange(option?.label as string)}
                />
                <label
                  className="whitespace-nowrap pr-4 text-sm"
                  htmlFor={option?.value}
                >
                  {option?.label}
                </label>
              </div>
            ))}
          </div>
          {object?.allowsInput && (
            <div className="mb-6 flex flex-col space-y-2 text-sm">
              <label className="text-muted-foreground" htmlFor="query">
                {object?.inputLabel}
              </label>
              <Input
                type="text"
                name="additional_query"
                className="w-full"
                id="query"
                placeholder={object?.inputPlaceholder}
                value={query}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              disabled={pending || isGenerating}
            >
              <FastForward size={16} className="mr-1" />
              Skip
            </Button>
            <Button type="submit" disabled={isButtonDisabled || pending}>
              <ArrowRight size={16} className="mr-1" />
              Send
            </Button>
          </div>
        </form>
      </Card>
    );
  }
};
