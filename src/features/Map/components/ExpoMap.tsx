import L from 'leaflet';
import { memo, useCallback } from 'react';
import { ImageOverlay } from 'react-leaflet/ImageOverlay';
import { MapContainer } from 'react-leaflet/MapContainer';

import { bounds } from '../constants/map';
import { useMapRegistry } from '../contexts/MapProvider';
import ActiveCircleBooth from './ActiveCircleBooth';
import BookmarkedCircleBooths from './BookmarkedCircleBooths';
import CircleBoothMap from './CircleBoothMap';

function ExpoMap() {
  const { register } = useMapRegistry();

  const handleImageOverlay = useCallback((overlay: L.ImageOverlay) => {
    overlay?.getElement()?.setAttribute('fetchpriority', 'high');
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="will-change-transform relative inline-block border border-black">
        <div className="relative">
          <MapContainer
            ref={register}
            crs={L.CRS.Simple}
            bounds={bounds}
            maxBounds={bounds}
            style={{ width: '100vw', height: '100vh' }}
            minZoom={-1.5}
            maxZoom={2}
            zoomControl={false}
            preferCanvas
            renderer={L.canvas({ padding: 0.5 })}
          >
            <ImageOverlay
              url="/floor_map.webp"
              bounds={bounds}
              ref={handleImageOverlay}
            />
            <CircleBoothMap />
            <BookmarkedCircleBooths />
            <ActiveCircleBooth />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default memo(ExpoMap);
