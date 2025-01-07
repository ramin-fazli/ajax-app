import './globals.css'
import { AppStateProvider } from '@/lib/utils/app-state'

export default function DashboardAppLayout(props: { children: React.ReactNode }) {

  return (
    <div className="h-full w-full">
      <AppStateProvider>
          {props.children}

      </AppStateProvider>
    </div>
  );
}
