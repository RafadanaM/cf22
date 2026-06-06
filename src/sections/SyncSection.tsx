import { lazy, Suspense } from 'react';

import Section from '@/core/ui/components/section';

const RestoreSyncCard = lazy(() => import('@/features/sync/components/RestoreSyncCard'));
const UploadSyncCard = lazy(() => import('@/features/sync/components/UploadSyncCard'));

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
