'use client';

import { useEffect, useState } from 'react';

const AgentsPage = () => {
  const [agentServerUrl, setAgentServerUrl] = useState('');

  useEffect(() => {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
    if (environment === 'production') {
      setAgentServerUrl(process.env.NEXT_PUBLIC_AGENT_SERVER_URL || '');
      // console.log('agent server url', process.env.NEXT_PUBLIC_AGENT_SERVER_URL);
    } else {
      setAgentServerUrl(process.env.NEXT_PUBLIC_AGENT_SERVER_URL_DEV || '');
      // console.log('agent server url', process.env.NEXT_PUBLIC_AGENT_SERVER_URL_DEV);
    }
  }, []);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-3 pt-6">
        <h1 className="text-2xl font-bold">Agents</h1>
        <h2 className="text-sm text-gray-500">Manage your agentic workflows.</h2>
      </div>
      <div className="mx-auto flex h-[704px] max-w-screen-xl flex-col items-center justify-center">

        <iframe
          src={`${agentServerUrl}/agents`}
          className="size-full border-none"
          title="Embedded Content"
        >
        </iframe>
      </div>
    </>
  );
};

export default AgentsPage;
