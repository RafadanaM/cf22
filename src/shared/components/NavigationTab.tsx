import { RiBookMarkedLine, RiRefreshFill, RiRoadMapLine } from '@remixicon/react';
import { motion } from 'motion/react';
import { useTransition } from 'react';

import { cn } from '../../core/ui/utils';
import { NAVIGATION_TABS, useNavigationTab } from '../constants/navigation';

function NavigationTab() {
  return (
    <nav className="overflow-hidden fixed bottom-3 w-4/5 max-w-96 min-w-72 mx-2 left-1/2 -translate-x-1/2 bg-card border border-border shadow-2xl rounded-full">
      <ul className="flex items-center">
        {NAVIGATION_TABS.map((tab, idx) => (
          <TabButton key={tab} isLast={idx === NAVIGATION_TABS.length - 1} value={tab} />
        ))}
      </ul>
    </nav>
  );
}

export default NavigationTab;

interface TabButton {
  isLast: boolean;
  value: string;
}

function TabButton({ value }: TabButton) {
  const [isLoading, startTransition] = useTransition();
  const { setTab, tab } = useNavigationTab();

  const handleChangeTab = () => {
    startTransition(() => {
      setTab(value as (typeof NAVIGATION_TABS)[number]);
    });
  };

  const isActive = tab === value;
  return (
    <li className={cn('flex-1 relative flex justify-center items-center flex-col')}>
      <button
        className={cn(
          'flex items-center gap-1 capitalize font-semibold delay-150 px-2 py-3 cursor-pointer',
          isActive ? 'text-primary-foreground' : 'text-secondary-foreground',
          isLoading && 'text-muted-foreground'
        )}
        onClick={handleChangeTab}
      >
        {value === 'MAP' && <RiRoadMapLine size={20} />}
        {value === 'BOOKMARKS' && <RiBookMarkedLine size={20} />}
        {value === 'SYNC' && <RiRefreshFill size={20} />}
        <span>{value.toLowerCase()}</span>
      </button>
      {isActive && (
        <motion.div
          className="inset-0 border border-primary absolute bg-primary -z-1"
          layoutId={`tab-pill-highlighter`}
          transition={{ type: 'tween', duration: 0.15 }}
        />
      )}
    </li>
  );
}
