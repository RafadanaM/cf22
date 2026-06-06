import { memo, useMemo } from 'react';

import { Circle } from '@/domain/circle/types';
import BookmarkCard from '@/features/bookmark/components/BookmarkCard';

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
