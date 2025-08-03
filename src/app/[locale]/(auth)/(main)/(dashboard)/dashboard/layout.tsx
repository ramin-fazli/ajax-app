import './globals.css';

import { AppStateProvider } from '@/lib/utils/app-state';

export default function DashboardAppLayout(props: { children: React.ReactNode }) {
  return (
    <div className="size-full">
      <AppStateProvider>
        {props.children}

      </AppStateProvider>
    </div>
  );
}
