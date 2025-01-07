import { auth } from '@clerk/nextjs/server';

import { HistoryList } from './history-list';

export const maxDuration = 60;

export default function Page() {
  const { userId } = auth();
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-3 pt-6">
        <h1 className="text-2xl font-bold">History</h1>
        <h2 className="text-sm text-gray-500">Review your past AI Wizard conversations.</h2>
      </div>
      <div className="mx-auto max-w-screen-xl px-3 pb-6">
        <div className="mx-auto flex max-w-4xl flex-col space-y-3 px-8 pb-14 pt-1 sm:px-12 md:space-y-4 md:pb-24 md:pt-2">
          <HistoryList userId={userId} />
        </div>
      </div>
    </>
  );
}
