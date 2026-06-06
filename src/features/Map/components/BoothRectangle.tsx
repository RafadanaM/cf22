import {
  LeafletEventHandlerFnMap,
  PathOptions,
  Rectangle as LeafletRectangle
} from 'leaflet';
import { memo, startTransition, useMemo, useRef } from 'react';
import { Rectangle } from 'react-leaflet/Rectangle';

import { Circle } from '@/domain/circle/types';
import { useAppDrawer, APP_DRAWER_ID } from '@/layout/drawers/useAppDrawer';
import { useActiveCircle } from '../contexts/ActiveCircleProvider';

import { boothToBounds } from '../utils/map';

interface BoothRectangleProps {
  circle: Circle;
  isActive?: boolean;
  isBookmarked?: boolean;
  pane?: string;
}

function BoothRectangle({
  circle,
  isActive = false,
  isBookmarked = false,
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
      click: () => {
        startTransition(() => {
          setActiveCircleId(circle.id);
        });
        openDrawer(APP_DRAWER_ID.CIRCLE_DETAIL, { circle, hideOverlay: true });
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
    />
  );
}

export default memo(BoothRectangle);

function getColorConfig(circle: Circle, isActive: boolean, isBookmarked: boolean) {
  if (isActive) {
    return {
      backgroundColor: '#5a58ed',
      borderColor: '#432dd7',
      backgroundColorHover: '#432dd7'
    };
  }

  if (isBookmarked) {
    return {
      backgroundColor: '#ff6f59',
      borderColor: '#ef3054',
      backgroundColorHover: '#f95738'
    };
  }

  return {
    backgroundColor: circle.displayConfig.backgroundColor,
    borderColor: circle.displayConfig.borderColor,
    backgroundColorHover: circle.displayConfig.backgroundColorHover
  };
}
