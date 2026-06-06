import { lazy, Suspense } from 'react';

import Section from '@/core/ui/components/section';

const BookmarkProgress = lazy(
  () => import('@/features/bookmark/components/BookmarkProgress')
);
const BookmarkedCircleList = lazy(
  () => import('@/features/bookmark/components/BookmarkCircleList')
);

function BookmarkSection() {
  return (
    <Section title="Bookmarked Circles">
      <Suspense>
        <BookmarkProgress />
      </Suspense>
      <Suspense>
        <BookmarkedCircleList />
      </Suspense>
    </Section>
  );
}

export default BookmarkSection;
