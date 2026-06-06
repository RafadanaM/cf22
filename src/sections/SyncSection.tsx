import { lazy, Suspense } from 'react';

import Section from '@/shared/components/Section';

const RestoreSyncCard = lazy(
  () => import('@/features/Bookmark/components/RestoreSyncCard')
);
const UploadSyncCard = lazy(
  () => import('@/features/Bookmark/components/UploadSyncCard')
);

function SyncSection() {
  return (
    <Section title="Sync Bookmark">
      <Suspense>
        <UploadSyncCard />
      </Suspense>
      <Suspense>
        <RestoreSyncCard />
      </Suspense>
    </Section>
  );
}

export default SyncSection;
