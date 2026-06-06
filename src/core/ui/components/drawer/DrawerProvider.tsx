import { AnimatePresence, motion } from 'motion/react';
import {
  ComponentProps,
  ComponentType,
  createContext,
  Fragment,
  PropsWithChildren,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { createPortal } from 'react-dom';

import { useLocation, useNavigate } from '@tanstack/react-router';
import { DrawerComponents, DrawerId, DrawerRegistry } from './DrawerRegistry';

type DrawerContextValue<Id extends DrawerId, Props> = {
  openDrawer(id: Id, props: Props, hideOverlay?: boolean): void;
  closeDrawer(id: Id): void;
};

type IsEmptyObject<T> = keyof T extends never ? true : false;

const DrawerContext = createContext<DrawerContextValue<DrawerId, unknown>>(null!);

export type DrawerProps = {
  close: () => void;
};

type DrawerInstance<Id extends DrawerId, Components extends DrawerComponents<Id>> = {
  id: Id;
  props: Omit<ComponentProps<Components[Id]>, 'close'>;
  hideOverlay?: boolean;
};

type DrawerProviderProps<Components extends DrawerComponents<DrawerId>> = {
  registry: DrawerRegistry<Components>;
};

function DrawerProvider<Id extends DrawerId, Components extends DrawerComponents<Id>>({
  registry,
  children
}: PropsWithChildren<DrawerProviderProps<Components>>) {
  const [mounted, setMounted] = useState(false);
  const [trays, setDrawers] = useState<DrawerInstance<Id, Components>[]>([]);
  const navigate = useNavigate();
  const { hash } = useLocation();

  const currentHash = hash;

  useEffect(() => {
    setMounted(true);
  }, []);

  const drawerIds = useMemo(() => {
    const set = new Set<Id>();

    for (let key of registry.getAllDrawers().keys()) {
      set.add(key as Id);
    }
    return set;
  }, [registry]);

  const openDrawer = useCallback(
    (id: Id, props?: ComponentProps<Components[Id]>, hideOverlay?: boolean) => {
      let shouldNavigate = true;
      setDrawers((prevDrawers) => {
        const nextDrawers = [
          ...prevDrawers.filter((drawer) => drawer.id !== id),
          { id, props: props ?? ({} as ComponentProps<Components[Id]>), hideOverlay }
        ];

        if (prevDrawers.length === nextDrawers.length) {
          shouldNavigate = false;
        }

        return nextDrawers;
      });

      if (!shouldNavigate) return;
      navigate({
        hash: id
      });
    },
    [navigate]
  );

  const closeDrawer = useCallback(
    (id: Id) => {
      let nextHash: undefined | string;
      setDrawers((prevDrawers) => {
        const nextDrawers = prevDrawers.filter((tray) => tray.id !== id);
        nextHash = nextDrawers.length
          ? nextDrawers[nextDrawers.length - 1]?.id
          : undefined;

        return nextDrawers;
      });
      navigate({
        hash: nextHash,
        replace: true
      });
    },
    [navigate]
  );

  const closeTopDrawer = useCallback(() => {
    let newHash: string | undefined = undefined;
    setDrawers((prev) => {
      if (prev.length === 0) return prev;

      const nextDrawers = prev.slice(0, -1);
      newHash = nextDrawers[nextDrawers.length - 1]?.id;

      return nextDrawers;
    });

    navigate({
      hash: newHash,
      replace: true
    });
  }, [navigate]);

  useEffect(() => {
    if (!currentHash) {
      setDrawers((prev) => (prev.length ? [] : prev));
      return;
    }

    if (!drawerIds.has(currentHash as Id)) return;

    if (currentHash) {
      // only update state when go back, opening may require props
      setDrawers((prev) => {
        const idx = prev.findIndex((d) => d.id === 'currentHash');
        if (idx === -1) return prev;

        return prev.slice(0, idx + 1);
      });
    }
  }, [currentHash, drawerIds]);

  const values = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
      closeTopDrawer
    }),
    [closeDrawer, openDrawer, closeTopDrawer]
  );

  return (
    <DrawerContext.Provider value={values}>
      {children}

      {mounted &&
        createPortal(
          <div id="drawer-root" className="pointer-events-none">
            <AnimatePresence>
              {trays.map((tray) => {
                const DrawerComponent = registry.getDrawer(tray.id) as ComponentType<
                  typeof tray.props
                >;
                if (!DrawerComponent) return null;

                return (
                  <Fragment key={tray.id}>
                    {!tray.hideOverlay && (
                      <motion.div
                        className="pointer-events-auto fixed top-0 bottom-0 left-0 right-0 bg-card-foreground/20 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeTopDrawer}
                      />
                    )}
                    <Suspense fallback={null}>
                      <DrawerComponent
                        key={tray.id}
                        {...tray.props}
                        close={() => closeDrawer(tray.id)}
                      />
                    </Suspense>
                  </Fragment>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;

export function createUseDrawer<Components extends DrawerComponents<DrawerId>>() {
  return function useDrawer() {
    const ctx = useContext(DrawerContext);

    if (!ctx) {
      throw new Error('useDrawer must be used inside DrawerProvider');
    }

    type Id = Extract<keyof Components, string>;

    return useMemo(
      () => ({
        openDrawer<K extends Id>(
          id: K,
          ...args: IsEmptyObject<
            Omit<ComponentProps<Components[K]>, 'close'>
          > extends true
            ? [props?: { hideOverlay?: boolean }]
            : [
                props: Omit<ComponentProps<Components[K]>, 'close'> & {
                  hideOverlay?: boolean;
                }
              ]
        ) {
          const props = args[0] ?? {};
          const { hideOverlay, ...componentProps } = props;
          ctx.openDrawer(id, componentProps, hideOverlay ?? false);
        },

        closeDrawer<K extends Id>(id: K) {
          ctx.closeDrawer(id);
        }
      }),
      [ctx]
    );
  };
}
