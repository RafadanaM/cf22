import { ClientOnly } from '@tanstack/react-router';
import { Suspense } from 'react';

import { Spinner } from '@/core/ui/components/spinner';
import NavigationTab from '@/shared/components/NavigationTab';
import { useNavigationTab } from '@/shared/constants/navigation';

import DayFilter from '@/features/Map/components/DayFilter';
import ExpoMap from '@/features/Map/components/ExpoMap';

import BookmarkSection from '@/sections/BookmarkSection';
import SearchFormSection from '@/sections/SearchFormSection';
import SyncSection from '@/sections/SyncSection';

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
