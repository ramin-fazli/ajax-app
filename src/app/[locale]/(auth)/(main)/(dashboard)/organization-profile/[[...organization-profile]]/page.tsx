import { OrganizationProfile } from '@clerk/nextjs';
//import { useTranslations } from 'next-intl';

//import { TitleBar } from '@/features/dashboard/TitleBar';
import { getI18nPath } from '@/utils/Helpers';

const OrganizationProfilePage = (props: { params: { locale: string } }) => {
  //const t = useTranslations('OrganizationProfile');

  return (
    <>
{/*       <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      /> */}
        <div className="mx-auto max-w-screen-xl px-3 pb-6 pt-6">
          <OrganizationProfile
            routing="path"
            path={getI18nPath(
              '/organization-profile',
              props.params.locale,
            )}
            afterLeaveOrganizationUrl="/onboarding/organization-selection"
            appearance={{
              elements: {
                rootBox: 'w-full',
                cardBox: 'w-full flex',
              },
            }}
          />
      </div>
    </>
  );
};

export default OrganizationProfilePage;
