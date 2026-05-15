import { ClientOnly } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { Spinner } from '@/core/ui/components/spinner';
import NavigationTab from '@/shared/components/NavigationTab';
import { useNavigationTab } from '@/shared/constants/navigation';

import DayFilter from '@/features/Map/components/DayFilter';
import ExpoMap from '@/features/Map/components/ExpoMap';
import SearchFormSection from '@/sections/SearchFormSection';

const BookmarkSection = lazy(() => import('@/sections/BookmarkSection'));
const SyncSection = lazy(() => import('@/sections/SyncSection'));

function MainLayout() {
  const { tab } = useNavigationTab();

  return (
    <div className="flex flex-col relative h-screen w-full">
      <main className="flex flex-col flex-1">
        <ClientOnly fallback={<MapLoader />}>
          <ExpoMap />
        </ClientOnly>
        {tab === 'BOOKMARKS' && (
          <Suspense>
            <BookmarkSection />
          </Suspense>
        )}
        {tab === 'SYNC' && (
          <Suspense>
            <SyncSection />
          </Suspense>
        )}
      </main>
      <Suspense>
        <NavigationTab />
      </Suspense>
      {tab === 'MAP' && <DayFilter />}
      {tab === 'MAP' && <SearchFormSection />}
    </div>
  );
}

export default MainLayout;

function MapLoader() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
