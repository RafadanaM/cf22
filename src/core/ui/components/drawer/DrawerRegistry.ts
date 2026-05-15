import { ComponentType } from 'react';

export type DrawerId = string;

export type DrawerComponent<Props> = ComponentType<Props>;

// oxlint-disable-next-line typescript/no-explicit-any
export type DrawerComponents<Id extends DrawerId> = Record<Id, DrawerComponent<any>>;

export type DrawerRegistry<Components extends DrawerComponents<DrawerId>> = {
  registerDrawer<K extends keyof Components>(id: K, component: Components[K]): void;
  getDrawer<K extends keyof Components>(id: K): Components[K] | undefined;
};

export function createDrawerRegistry<
  Components extends DrawerComponents<DrawerId>
>(): DrawerRegistry<Components> {
  type Id = keyof Components;
  const registry = new Map<Id, Components[Id]>();

  function registerDrawer<K extends Id>(id: K, component: Components[K]) {
    registry.set(id, component);
  }

  function getDrawer<K extends Id>(id: K): Components[K] | undefined {
    return registry.get(id) as Components[K] | undefined;
  }

  return {
    getDrawer,
    registerDrawer
  };
}
