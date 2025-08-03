import { UserProfile } from '@clerk/nextjs';

// import { useTranslations } from 'next-intl';
// import { TitleBar } from '@/features/dashboard/TitleBar';
import { getI18nPath } from '@/utils/Helpers';

const UserProfilePage = (props: { params: { locale: string } }) => {
  // const t = useTranslations('UserProfile');

  return (
    <>
      {/*       <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      /> */}
      <div className="mx-auto max-w-screen-xl px-3 py-6">
        <UserProfile
          routing="path"
          path={getI18nPath('/user-profile', props.params.locale)}
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

export default UserProfilePage;
