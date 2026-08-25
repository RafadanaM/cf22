import uFuzzy from '@leeoniya/ufuzzy';
import { memo, useDeferredValue, useMemo } from 'react';
import { VList } from 'virtua';

import { cn } from '@/core/ui/utils';

import { useCircle } from '@/domain/circle/contexts/CircleProvider';
import { Circle } from '@/domain/circle/types';

import CircleCard from './CircleCard';

interface SearchResultProps {
  keyword: string;
  isLoading: boolean;
}

const uf = new uFuzzy({
  intraMode: 1
});

function SearchResult({ keyword, isLoading }: SearchResultProps) {
  const { circles, searchableCircles } = useCircle();

  // holy shit ufuzzy is fkin fast
  const result: Circle[] = useMemo(() => {
    const query = keyword.trim();
    if (!query) return circles;

    const idxs = uf.filter(searchableCircles, query);

    if (!idxs || idxs.length === 0) return [];

    const info = uf.info(idxs, searchableCircles, query);

    const order = uf.sort(info, searchableCircles, query);

    return order.map((i) => circles[info.idx[i]!]!);
  }, [circles, keyword, searchableCircles]);

  const deferredResult = useDeferredValue(result);
  const hasResult = deferredResult.length > 0;

  const showLoading = isLoading || deferredResult !== result;
  const showEmpty = !hasResult && keyword.length > 0;

  return (
    <div
      className={cn(
        'fixed top-20 left-0 right-0 bottom-0 md:bottom-auto overflow-hidden md:right-auto md:left-1/2 md:-translate-x-1/2  bg-secondary border-t border-boder origin-top md:w-full md:max-w-2xl md:h-4/5'
      )}
    >
      <div className={cn('h-full', showLoading ? 'opacity-50' : 'opacity-100')}>
        {showEmpty && (
          <div className="p-2">
            <div className={cn('p-2 rounded-lg gap-1.5')}>
              <p className="text-center text-primary font-medium text-md">
                {'Circle not found'}
              </p>
            </div>
          </div>
        )}
        {hasResult && <CircleCards circlesResult={deferredResult} />}
      </div>
    </div>
  );
}

export default memo(SearchResult);
interface CircleCardsProps {
  circlesResult: Circle[];
}

const CircleCards = memo(({ circlesResult }: CircleCardsProps) => {
  return (
    <VList role="list" className="p-2 scrollbar-thin" data={circlesResult}>
      {(circle) => <CircleCard key={circle.id} className="my-1" circle={circle} />}
    </VList>
  );
});
