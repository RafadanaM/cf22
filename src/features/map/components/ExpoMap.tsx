import L from 'leaflet';
import { memo } from 'react';
import { ImageOverlay } from 'react-leaflet/ImageOverlay';
import { MapContainer } from 'react-leaflet/MapContainer';
import { Pane } from 'react-leaflet/Pane';

import { bounds } from '../constants/map';
import { useMapRegistry } from '../contexts/MapProvider';
import ActiveCircleBooth from './ActiveCircleBooth';
import BookmarkedCircleBooths from './BookmarkedCircleBooths';
import CircleBoothMap from './CircleBoothMap';

const renderer = L.canvas({ padding: 0.5 });
export const crs = L.extend({}, L.CRS.Simple, {
  infinite: false
});

function ExpoMap() {
  const { register } = useMapRegistry();

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
            maxBounds={bounds}
            bounds={bounds}
            style={{ width: '100vw', height: '100vh' }}
            minZoom={-2}
            maxZoom={2}
            zoomControl={false}
            preferCanvas
            renderer={renderer}
          >
            <ImageOverlay url="/floor_map.webp" alt="cf22 map" bounds={bounds} />
            <Pane name="bookmarks" className="pointer-events-none" />
            <Pane name="active" className="pointer-events-none" />

            <CircleBoothMap />
            <BookmarkedCircleBooths />
            <ActiveCircleBooth />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default memo(ExpoMap);
