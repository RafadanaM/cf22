import Fuse, { FuseResult } from 'fuse.js/basic';
import { motion } from 'motion/react';
import { memo, useDeferredValue, useMemo } from 'react';
import { VList } from 'virtua';

import { cn } from '@/core/ui/utils';

import { Circle } from '@/domain/circle/types';

import { useCircle } from '@/domain/circle/contexts/CircleProvider';
import CircleCard from './CircleCard';

interface SearchResultProps {
  keyword: string;
  isLoading: boolean;
}

function SearchResult({ keyword, isLoading }: SearchResultProps) {
  const { circles } = useCircle();

  const fuse = useMemo(
    () =>
      new Fuse(circles, {
        keys: ['name', 'code']
      }),
    [circles]
  );

  const result = fuse.search(keyword);

  const deferredResult = useDeferredValue(result);
  const hasResult = deferredResult.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'fixed top-20 left-0 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2  bg-secondary border-t border-boder origin-top overflow-auto md:w-full md:max-w-2xl h-full md:h-4/5'
      )}
    >
      {!hasResult && (
        <div className="p-2">
          <div
            className={cn(
              'p-2 rounded-lg gap-1.5',
              isLoading || deferredResult !== result ? 'opacity-50' : 'opacity-100'
            )}
          >
            <p className="text-center text-primary font-medium text-md">
              {'Circle not found'}
            </p>
          </div>
        </div>
      )}
      {hasResult && <CircleCards circlesResult={deferredResult} />}
    </motion.div>
  );
}

export default SearchResult;
interface CircleCardsProps {
  circlesResult: FuseResult<Circle>[];
}

const CircleCards = memo(({ circlesResult }: CircleCardsProps) => {
  return (
    <VList role="list" data={circlesResult} style={{ padding: 2 }}>
      {(circle) => (
        <CircleCard key={circle.item.id} className="my-1.5 mx-2" circle={circle.item} />
      )}
    </VList>
  );
});
