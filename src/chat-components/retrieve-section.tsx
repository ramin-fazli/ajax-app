import React from 'react';

import { SearchResults } from '@/chat-components/search-results';
import { Section } from '@/chat-components/section';
import type { SearchResults as SearchResultsType } from '@/lib/types';

type RetrieveSectionProps = {
  data: SearchResultsType;
};

const RetrieveSection: React.FC<RetrieveSectionProps> = ({ data }) => {
  return (
    <Section title="Sources">
      <SearchResults results={data.results} />
    </Section>
  );
};

export default RetrieveSection;
