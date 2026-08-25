import {
  lazy,
  useCallback,
  useMemo,
  useState,
  useTransition,
  startTransition
} from 'react';

import { debounce } from '@/core/utils/scheduler';
import DynamicSearchBar from '@/features/search/components/DynamicSearchBar';
import { useSearchForm } from '@/features/search/contexts/SearchFormProvider';
import { APP_DRAWER_ID, useAppDrawer } from '@/layout/drawers/useAppDrawer';

const SearchResult = lazy(() => import('@/features/search/components/SearchResult'));

function SearchFormSection() {
  const [keyword, setKeyword] = useState('');
  const [autocompleteKeyword, setAutocompleteKeyword] = useState('');
  const [isPending, startKeywordTransition] = useTransition();

  const { isOpen, setIsOpen } = useSearchForm();
  const { closeDrawer } = useAppDrawer();

  const handleClose = useCallback(() => {
    startTransition(() => {
      setIsOpen(false);
    });
    setKeyword('');
    setAutocompleteKeyword('');
  }, [setIsOpen]);

  const handleFocus = useCallback(() => {
    startTransition(() => {
      setIsOpen(true);
    });

    closeDrawer(APP_DRAWER_ID.CIRCLE_DETAIL);
  }, [closeDrawer, setIsOpen]);

  const handleAutocompleteKeywordChange = useMemo(() => {
    return debounce((inputStr: string) => {
      startKeywordTransition(() => {
        setAutocompleteKeyword(inputStr);
      });
    });
  }, []);

  const handleKeywordChange = useCallback(
    (inputStr: string) => {
      setKeyword(inputStr);
      handleAutocompleteKeywordChange(inputStr);
    },
    [handleAutocompleteKeywordChange]
  );

  return (
    <>
      {isOpen && (
        <div
          className="pointer-events-auto fixed top-0 bottom-0 left-0 right-0 bg-card-foreground/20 backdrop-blur-lg hidden md:block cursor-pointer"
          onClick={handleClose}
        />
      )}
      <DynamicSearchBar
        keyword={keyword}
        onChange={handleKeywordChange}
        isFocused={isOpen}
        onFocus={handleFocus}
        onClose={handleClose}
      />
      {isOpen && (
        <SearchResult
          key="search-result"
          keyword={autocompleteKeyword}
          isLoading={isPending}
        />
      )}
    </>
  );
}

export default SearchFormSection;
