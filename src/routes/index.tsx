import { QueryClientProvider } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DrawerProvider from '@/core/ui/components/drawer/DrawerProvider';

import queryClient from '@/core/config/queryClient';
import MainLayout from '@/layout/MainLayout';
import { NavigationTabProvider } from '@/layout/navigation/navigation';

import ToastProvider from '@/core/ui/components/toast/ToastProvider';
import CircleProvider from '@/domain/circle/contexts/CircleProvider';
import BookmarkFormProvider from '@/features/bookmark/contexts/BookmarkFormProvider';
import ActiveCircleProvider from '@/features/map/contexts/ActiveCircleProvider';
import CircleFilterProvider from '@/features/map/contexts/CircleFilterProvider';
import MapProvider from '@/features/map/contexts/MapProvider';
import SearchFormProvider from '@/features/search/contexts/SearchFormProvider';
import { appDrawerRegistry } from '@/layout/drawers/useAppDrawer';

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
