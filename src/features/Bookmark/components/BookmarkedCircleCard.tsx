import { memo, useMemo } from 'react';

import BookmarkCard from '@/features/Bookmark/components/BookmarkCard';
import { Circle } from '@/domain/circle/types';

import CircleCard from '@/features/search/components/CircleCard';

interface BookmarkedCircleCardProps {
  circle: Circle;
}

function BookmarkedCircleCard({ circle }: BookmarkedCircleCardProps) {
  // practically useless, too lazy to revert
  const memoedCircleCard = useMemo(
    () => <CircleCard circle={circle} className="rounded-none" />,
    [circle]
  );

  return <BookmarkCard circle={circle} Content={memoedCircleCard} />;
}

export default memo(BookmarkedCircleCard);
