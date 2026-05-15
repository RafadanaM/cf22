/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';

import leafletStyles from 'leaflet/dist/leaflet.css?url';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'CF22 Interactive Map'
      },
      {
        name: 'description',
        content:
          'Interactive Map For CF22. Plan, bookmark, and write notes for your CF22 trip.'
      },
      {
        name: 'theme-color',
        content: '#432dd7'
      }
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: leafletStyles },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon-180x180.png'
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any'
      },
      {
        rel: 'preload',
        href: 'floor_map.webp',
        as: 'image',
        type: 'image/webp',
        fetchPriority: 'high'
      }
    ]
  }),
  component: RootComponent
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
