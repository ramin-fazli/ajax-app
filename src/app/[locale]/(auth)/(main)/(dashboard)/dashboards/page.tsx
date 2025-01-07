'use client';

const AgentsPage = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-3 py-6">
        <h1 className="text-2xl font-bold">Dashboards</h1>
        <h2 className="text-sm text-gray-500">Execute your Agentic AI workflows and receive reports and insights.</h2>
      </div>

      <div className="mx-auto flex h-[1900px] flex-col items-center justify-center">
        <iframe
          src="https://tryajax.com/agent-dashboard/"
          className="size-full border-none"
          title="Embedded Content"
        >
        </iframe>
      </div>
    </>
  );
};

export default AgentsPage;
