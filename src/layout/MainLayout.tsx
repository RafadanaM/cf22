import { ClientOnly } from '@tanstack/react-router';
import { Suspense } from 'react';

import { Spinner } from '@/core/ui/components/spinner';
import { useNavigationTab } from '@/layout/navigation/navigation';
import NavigationTab from '@/layout/navigation/NavigationTab';

import DayFilter from '@/features/map/components/DayFilter';
import ExpoMap from '@/features/map/components/ExpoMap';

import BookmarkSection from '@/layout/sections/BookmarkSection';
import SearchFormSection from '@/layout/sections/SearchFormSection';
import SyncSection from '@/layout/sections/SyncSection';

function MainLayout() {
  const { tab } = useNavigationTab();

  return (
    <div className="flex flex-col relative h-screen w-full">
      <main className="flex flex-col flex-1">
        <ClientOnly fallback={<MapLoader />}>
          <ExpoMap />
        </ClientOnly>
        {tab === 'BOOKMARKS' && <BookmarkSection />}
        {tab === 'SYNC' && <SyncSection />}
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
