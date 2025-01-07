import React from 'react'
import { History } from './history'
import { HistoryList } from './history-list'
import { auth } from '@clerk/nextjs/server';

type HistoryContainerProps = {
  location: 'sidebar' | 'header'
}

const HistoryContainer: React.FC<HistoryContainerProps> = async ({
  location
}) => {
  const { userId } = auth()
  return (
    <div
      className={location === 'header' ? 'block sm:hidden' : 'hidden sm:block'}
    >
      <History location={location}>
        <HistoryList userId={userId} />
      </History>
    </div>
  )
}

export default HistoryContainer
