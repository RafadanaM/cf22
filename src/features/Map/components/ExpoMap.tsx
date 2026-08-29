import L from 'leaflet';
import { memo, useCallback } from 'react';
import { ImageOverlay } from 'react-leaflet/ImageOverlay';
import { MapContainer } from 'react-leaflet/MapContainer';

import { bounds } from '../constants/map';
import { useMapRegistry } from '../contexts/MapProvider';
import ActiveCircleBooth from './ActiveCircleBooth';
import BookmarkedCircleBooths from './BookmarkedCircleBooths';
import CircleBoothMap from './CircleBoothMap';

const renderer = L.canvas({ padding: 0.5 });
const crs = L.CRS.Simple;

function ExpoMap() {
  const { register } = useMapRegistry();

  const handleImageOverlay = useCallback((overlay: L.ImageOverlay) => {
    overlay?.getElement()?.setAttribute('fetchpriority', 'high');
  }, []);

  return (
    <section
      id="section-MAP"
      role="tabpanel"
      aria-labelledby="tab-MAP"
      className="w-screen h-screen overflow-hidden"
    >
      <div className="will-change-transform relative inline-block border border-black">
        <div className="relative">
          <MapContainer
            ref={register}
            crs={crs}
            bounds={bounds}
            maxBounds={bounds}
            className="w-screen h-screen"
            minZoom={-1.5}
            maxZoom={2}
            zoomControl={false}
            preferCanvas
            renderer={renderer}
          >
            <ImageOverlay
              url="/floor_map.webp"
              bounds={bounds}
              ref={handleImageOverlay}
            />
            <ActiveCircleBooth />
            <BookmarkedCircleBooths />
            <CircleBoothMap />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default memo(ExpoMap);
