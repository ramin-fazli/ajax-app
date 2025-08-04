'use client';

import { useTranslations } from 'next-intl';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { AppStateProvider } from '@/lib/utils/app-state';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');

  return (
    <AppStateProvider>
      <div className="border-b border-gray-300 shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
          <DashboardHeader
            menu={[
              {
                href: '/dashboard',
                label: t('home'),
              },
              {
                href: '/agents',
                label: t('agents'),
              },
              {
                href: '/history',
                label: t('history'),
              },
              {
                href: '/dashboards',
                label: t('dashboards'),
              },
              // PRO: Link to the /dashboard/todos page
              {
                href: '/organization-profile',
                label: t('organization'),
              },
              // PRO: Link to the /dashboard/billing page
            ]}
          />
        </div>
      </div>

      <div>
        {props.children}
      </div>
    </AppStateProvider>
  );
}

export const dynamic = 'force-dynamic';
