import {
  LeafletEventHandlerFnMap,
  PathOptions,
  Rectangle as LeafletRectangle,
  PointTuple
} from 'leaflet';
import { memo, startTransition, useMemo, useRef } from 'react';
import { Rectangle } from 'react-leaflet/Rectangle';
import { Tooltip } from 'react-leaflet/Tooltip';

import { Circle } from '@/domain/circle/types';
import { useAppDrawer, APP_DRAWER_ID } from '@/layout/drawers/useAppDrawer';

import { cn } from '@/core/ui/utils';
import { interactionResponse } from '@/core/utils/scheduler';
import { useActiveCircle } from '../contexts/ActiveCircleProvider';
import { boothToBounds } from '../utils/map';

interface BoothRectangleProps {
  pane?: string;
  circle: Circle;
  isActive?: boolean;
  isBookmarkComplete?: boolean;
  isBookmarked?: boolean;
  isHighlighted?: boolean;
}

const tooltipOffset: PointTuple = [0, 0];

function BoothRectangle({
  circle,
  isActive = false,
  isBookmarked = false,
  isHighlighted = false,
  isBookmarkComplete = false,
  pane
}: BoothRectangleProps) {
  const rectangleRef = useRef<LeafletRectangle | null>(null);
  const { openDrawer } = useAppDrawer();
  const { setActiveCircleId } = useActiveCircle();

  const { backgroundColor, backgroundColorHover, borderColor } = getColorConfig(
    circle,
    isActive,
    isBookmarked
  );

  const eventHandlers: LeafletEventHandlerFnMap = useMemo(() => {
    return {
      click: async () => {
        startTransition(() => {
          setActiveCircleId(circle.id);
        });
        await interactionResponse();

        openDrawer(APP_DRAWER_ID.CIRCLE_DETAIL, {
          circle,
          hideOverlay: true,
          onClose: () => setActiveCircleId('')
        });
      },
      mouseover: () => {
        rectangleRef.current?.setStyle({
          fillColor: backgroundColorHover
        });
      },
      mouseout: () => {
        rectangleRef.current?.setStyle({
          fillColor: backgroundColor
        });
      }
    };
  }, [openDrawer, circle, backgroundColor, backgroundColorHover, setActiveCircleId]);

  const pathOptions: PathOptions = useMemo(
    () => ({
      fillColor: backgroundColor,
      color: borderColor,
      pane
    }),
    [borderColor, backgroundColor, pane]
  );

  const bounds = useMemo(() => boothToBounds(circle.rect), [circle.rect]);

  return (
    <Rectangle
      ref={rectangleRef}
      key={circle.id}
      eventHandlers={eventHandlers}
      bounds={bounds}
      pathOptions={pathOptions}
      fillOpacity={1}
    >
      {isHighlighted && (
        <Tooltip
          direction="top"
          offset={tooltipOffset}
          permanent
          className={cn(
            'flex flex-col ',
            isBookmarkComplete ? 'bg-secondary! border-muted!' : ''
          )}
          pane="bookmarked-circle-booths"
        >
          <span className="text-sm font-bold">{circle.code}</span>
          <span className="text-xs font-medium">{circle.name}</span>
        </Tooltip>
      )}
    </Rectangle>
  );
}

export default memo(BoothRectangle);

function getColorConfig(circle: Circle, isActive: boolean, isBookmarked: boolean) {
  if (isActive || isBookmarked) {
    return {
      backgroundColor: '#5a58ed',
      borderColor: '#432dd7',
      backgroundColorHover: '#432dd7'
    };
  }

  return {
    backgroundColor: circle.displayConfig.backgroundColor,
    borderColor: circle.displayConfig.borderColor,
    backgroundColorHover: circle.displayConfig.backgroundColorHover
  };
}
