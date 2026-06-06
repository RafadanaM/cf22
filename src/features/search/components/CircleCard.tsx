import { RiCalendarCheckLine, RiFileImageLine, RiMapPinLine } from '@remixicon/react';
import { CSSProperties, memo, startTransition, useCallback } from 'react';

import { Badge } from '@/core/ui/components/badge';
import { Button } from '@/core/ui/components/button';
import { cn } from '@/core/ui/utils';
import { interactionResponse } from '@/core/utils/scheduler';

import { useNavigationTab } from '@/layout/navigation/navigation';
import { Circle } from '@/domain/circle/types';

import BookmarkButton from '@/features/Bookmark/components/BookmarkButton';
import { APP_DRAWER_ID, useAppDrawer } from '@/layout/drawers/useAppDrawer';
import { useMapControl } from '@/features/Map/contexts/MapProvider';
import { boothToBounds } from '@/features/Map/utils/map';

import { useActiveCircle } from '@/features/Map/contexts/ActiveCircleProvider';
import { useCircleFilter } from '@/features/Map/contexts/CircleFilterProvider';
import { useSearchForm } from '@/features/search/contexts/SearchFormProvider';
import { attendingDaysToString } from '@/domain/circle/utils';

interface CircleCardProps {
  style?: CSSProperties;
  className?: string;
  circle: Circle;
}

function CircleCard({ circle, className, style }: CircleCardProps) {
  const { zoomToPoint } = useMapControl();
  const { openDrawer } = useAppDrawer();
  const { setTab } = useNavigationTab();
  const { setIsOpen } = useSearchForm();
  const { setActiveCircleId } = useActiveCircle();
  const { attendingDay, setAttendingDay } = useCircleFilter();

  // honestly, I'm just throwing what I think I know here, all the operations are heavy af
  const handlePressDetail = useCallback(async () => {
    // close search list immediately
    setIsOpen(false);
    setTab('MAP');

    // transition these heavy updates
    startTransition(() => {
      // opening drawer might be heavy??
      openDrawer(APP_DRAWER_ID.CIRCLE_DETAIL, { circle, hideOverlay: true });
      // this should be quite better than initial implementation but just in case
      setActiveCircleId(circle.id);
      // these one is really heavy because it rerenders everything, based on "testing" Activity seems to help alot
      if (!circle.attendingDays.includes(attendingDay) && circle.attendingDays[0]) {
        setAttendingDay(circle.attendingDays[0]);
      }
    });

    await interactionResponse();
    requestAnimationFrame(() => {
      zoomToPoint(boothToBounds(circle.rect, { y: -150 }));
    });

    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
  }, [openDrawer, zoomToPoint, circle, setTab, setIsOpen, setActiveCircleId]);

  return (
    <div
      style={style}
      className={cn('flex flex-col gap-1 py-3 bg-card rounded-lg border', className)}
    >
      <div className="flex gap-2 px-3">
        {circle.imageUrl ? (
          <img
            src={circle.imageUrl}
            width={56}
            height={56}
            loading="lazy"
            className="object-cover size-14 overflow-hidden rounded-xl border border-muted-foreground"
          />
        ) : (
          <div className="flex items-center justify-center size-14 overflow-hidden rounded-xl border border-muted-foreground bg-secondary">
            <RiFileImageLine size={24} className="text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 self-center">
          <h3 className="flex font-semibold flex-1">{circle.name}</h3>
          <div className="flex gap-1 items-center">
            <RiMapPinLine size={18} className="text-primary" />
            <span className="text-sm text-secondary-foreground font-medium capitalize">
              {circle.code}
            </span>
          </div>
        </div>
        <div className="flex gap-1 self-start items-center">
          <Badge variant="outline" className="text-xs text-primary py-0.5 h-6">
            <RiCalendarCheckLine className="size-4" />
            {attendingDaysToString(circle.attendingDays)}
          </Badge>

          <BookmarkButton circleId={circle.id} />
        </div>
      </div>
      <div className="flex items-center gap-2 px-2">
        <div className="flex gap-1 w-max overflow-auto flex-1 pl-2 no-scrollbar">
          {circle.fandoms.map((fandom) => (
            <Badge
              variant="outline"
              key={fandom}
              className="text-xs capitalize py-0.5 h-auto bg-secondary"
            >
              {fandom}
            </Badge>
          ))}
        </div>

        <Button onClick={handlePressDetail}>{'Detail'}</Button>
      </div>
    </div>
  );
}

export default memo(CircleCard);
