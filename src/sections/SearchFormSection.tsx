import { lazy, startTransition, useCallback, useDeferredValue, useState } from 'react';
import useDebounceValue from '@/core/hooks/useDebounceValue';

import DynamicSearchBar from '@/features/Circle/components/DynamicSearchBar';
import { useSearchForm } from '@/features/Circle/contexts/SearchFormContext';
import { APP_DRAWER_ID, useAppDrawer } from '@/features/Drawers/hooks/useAppDrawer';

const SearchResult = lazy(() => import('@/features/Circle/components/SearchResult'));

function SearchFormSection() {
  const [keyword, setKeyword] = useState('');

  const { isOpen, setIsOpen } = useSearchForm();
  const { closeDrawer } = useAppDrawer();

  const [debouncedKeyword, isKeywordLoading] = useDebounceValue(keyword.trim());
  const deferredKeyword = useDeferredValue(debouncedKeyword);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    setKeyword('');
  }, [setIsOpen]);

  const handleFocus = useCallback(() => {
    startTransition(() => {
      setIsOpen(true);
    });
    closeDrawer(APP_DRAWER_ID.CIRCLE_DETAIL);
  }, [closeDrawer, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div className="pointer-events-auto fixed top-0 bottom-0 left-0 right-0 bg-card-foreground/20 backdrop-blur-lg hidden md:block" />
      )}
      <DynamicSearchBar
        keyword={keyword}
        onChange={setKeyword}
        isFocused={isOpen}
        onFocus={handleFocus}
        onClose={handleClose}
      />
      {isOpen && (
        <SearchResult
          key="search-result"
          isLoading={isKeywordLoading}
          keyword={deferredKeyword}
        />
      )}
    </>
  );
}

export default SearchFormSection;
