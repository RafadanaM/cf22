import { useDeferredValue, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { Pane } from 'react-leaflet/Pane';
import { SVGOverlay } from 'react-leaflet/SVGOverlay';
import { useBookmarkForm } from '@/features/Bookmark/contexts/BookmarkFormProvider';
import { useCircleFilter } from '@/features/Circle/contexts/CircleFilterProvider';
import { useCircle } from '@/features/Circle/contexts/CircleProvider';
import { Circle } from '@/shared/types/circle';
import { bounds, MAP_HEIGHT, MAP_WIDTH } from '../constants/map';
import BoothRectangle from './BoothRectangle';
import CircleCodeText from './CircleCodeText';

function BookmarkedCircleBooths() {
  const { control } = useBookmarkForm();
  const { getCircleDetail } = useCircle();

  const { attendingDay } = useCircleFilter();

  const bookmarkedCircleIds = useWatch({
    control,
    name: 'bookmarkedCircleIds'
  });

  const renderedItems = useMemo(
    () =>
      bookmarkedCircleIds.reduce<Circle[]>((acc, curr) => {
        const circle = getCircleDetail(curr);

        if (circle?.attendingDays.includes(attendingDay)) {
          acc.push(circle);
        }

        return acc;
      }, []),
    [bookmarkedCircleIds, getCircleDetail, attendingDay]
  );

  const deferredRenderedItems = useDeferredValue(renderedItems);

  if (deferredRenderedItems.length === 0) return null;

  return (
    <Pane
      key={`${attendingDay}-${deferredRenderedItems.length}`}
      name="bookmarked-circle-booths"
      style={{ zIndex: 475, pointerEvents: 'none' }}
    >
      {deferredRenderedItems.map((circle) => (
        <BoothRectangle key={circle.id} circle={circle} isBookmarked />
      ))}

      <SVGOverlay
        bounds={bounds}
        attributes={{ viewBox: `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}` }}
      >
        {deferredRenderedItems.map((circle) => (
          <CircleCodeText key={circle.id} circle={circle} isActive />
        ))}
      </SVGOverlay>
    </Pane>
  );
}

export default BookmarkedCircleBooths;
