import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');

  return (
    <>
      <div className="border-b border-gray-300 shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
          <DashboardHeader
            menu={[
              {
                href: '/',
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

    </>
  );
}

export const dynamic = 'force-dynamic';
