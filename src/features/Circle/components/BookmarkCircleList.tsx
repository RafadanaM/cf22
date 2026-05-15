import { AnimatePresence } from 'motion/react';
import { memo, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Circle } from '@/shared/types/circle';

import { useBookmarkForm } from '../../Bookmark/contexts/BookmarkFormProvider';
import { useCircle } from '../contexts/CircleProvider';
import BookmarkedCircleCard from './BookmarkedCircleCard';

function BookmarkedCircleList() {
  const { control } = useBookmarkForm();

  const bookmarkedCircleIds = useWatch({ control, name: 'bookmarkedCircleIds' });
  const bookmarks = useWatch({
    control,
    name: 'bookmarks'
  });

  const { getCircleDetail } = useCircle();

  const bookmarkItems = useMemo(
    () =>
      bookmarkedCircleIds
        .map((id) => getCircleDetail(id))
        .filter((item): item is Circle => Boolean(item))
        .sort((a, b) => {
          const isAComplete = bookmarks[a.id]?.isComplete ?? false;
          const isBComplete = bookmarks[b.id]?.isComplete ?? false;

          return Number(isAComplete) - Number(isBComplete);
        }),
    [bookmarkedCircleIds, getCircleDetail, bookmarks]
  );

  if (bookmarkItems.length === 0) {
    return (
      <div className="flex flex-col gap-2 bg-card rounded-xl border border-border p-4">
        <p className="font-semibold text-center">{'You have no Circles Bookmarked'}</p>

        <p className="text-center text-sm text-muted-foreground">
          {'Bookmark circles to track your progress'}
        </p>
      </div>
    );
  }

  return (
    <div className={'flex flex-col gap-2 pb-20'}>
      <AnimatePresence>
        <BookmarkCards circles={bookmarkItems} />
      </AnimatePresence>
    </div>
  );
}

export default BookmarkedCircleList;

interface BookmarkCardsProps {
  circles: Circle[];
}

const BookmarkCards = memo(({ circles }: BookmarkCardsProps) => {
  return circles.map((bookmarkItem) => {
    return <BookmarkedCircleCard key={bookmarkItem.id} circle={bookmarkItem} />;
  });
});
