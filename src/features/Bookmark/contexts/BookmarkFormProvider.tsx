import { nanoid } from 'nanoid';
import { PropsWithChildren, useDeferredValue, useEffect, useMemo } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';

import { BookmarkDetail, UserBookmark } from '../types/bookmark';
import { CircleId } from '@/domain/circle/types';

import { saveLocalBookmark, getLocalBookmark } from '../utils/bookmark';

function BookmarkFormProvider({ children }: PropsWithChildren<{}>) {
  const methods = useForm<UserBookmark>({
    defaultValues: {
      bookmarkedCircleIds: [],
      bookmarks: {} as Record<CircleId, BookmarkDetail>,
      bookmarkId: nanoid()
    }
  });

  const values = useDeferredValue(useWatch({ control: methods.control }));
  const reset = useMemo(() => methods.reset, [methods.reset]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveLocalBookmark(values as UserBookmark);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [values]);

  useEffect(() => {
    const localBookmark = getLocalBookmark();

    if (localBookmark) {
      reset(localBookmark);
    }
  }, [reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default BookmarkFormProvider;

export const useBookmarkForm = () => useFormContext<UserBookmark>();
