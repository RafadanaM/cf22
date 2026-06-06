import { QueryClientProvider } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DrawerProvider from '@/core/ui/components/drawer/DrawerProvider';

import MainLayout from '@/layout/MainLayout';
import { NavigationTabProvider } from '@/layout/navigation/navigation';
import queryClient from '@/core/config/queryClient';

import ToastProvider from '@/core/ui/components/toast/ToastProvider';
import BookmarkFormProvider from '@/features/Bookmark/contexts/BookmarkFormProvider';
import ActiveCircleProvider from '@/features/Map/contexts/ActiveCircleProvider';
import CircleFilterProvider from '@/features/Map/contexts/CircleFilterProvider';
import CircleProvider from '@/domain/circle/contexts/CircleProvider';
import SearchFormProvider from '@/features/search/contexts/SearchFormProvider';
import { appDrawerRegistry } from '@/layout/drawers/useAppDrawer';
import MapProvider from '@/features/Map/contexts/MapProvider';

export const Route = createFileRoute('/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CircleProvider>
          <CircleFilterProvider>
            <MapProvider>
              <NavigationTabProvider>
                <ActiveCircleProvider>
                  <SearchFormProvider>
                    <BookmarkFormProvider>
                      <DrawerProvider registry={appDrawerRegistry}>
                        <MainLayout />
                      </DrawerProvider>
                    </BookmarkFormProvider>
                  </SearchFormProvider>
                </ActiveCircleProvider>
              </NavigationTabProvider>
            </MapProvider>
          </CircleFilterProvider>
        </CircleProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
