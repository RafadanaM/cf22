import { lazy, Suspense } from 'react';

import Section from '@/shared/components/Section';

const BookmarkProgress = lazy(
  () => import('@/features/Bookmark/components/BookmarkProgress')
);
const BookmarkedCircleList = lazy(
  () => import('@/features/Circle/components/BookmarkCircleList')
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
