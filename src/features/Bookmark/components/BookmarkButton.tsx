import { RiBookmarkLine } from '@remixicon/react';
import { ComponentProps, startTransition } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/core/ui/components/button';
import { cn } from '@/core/ui/utils';

import { CircleId } from '@/domain/circle/types';

import { useToast } from '@/core/ui/components/toast/ToastProvider';
import { interactionResponse } from '@/core/utils/scheduler';
import { useBookmarkForm } from '../contexts/BookmarkFormProvider';

interface BookmarkButtonProps {
  circleId: CircleId;
  size?: ComponentProps<typeof Button>['size'];
}

function BookmarkButton({ circleId, size = 'icon' }: BookmarkButtonProps) {
  const { setValue, getValues, control } = useBookmarkForm();
  const { showToast } = useToast();

  const isBookmarked = useWatch({
    control,
    name: 'bookmarks',
    compute: (bookmarks) => !!bookmarks[circleId]
  });

  const handleToggleBookmark = async () => {
    const bookmarkedCircleIds = getValues('bookmarkedCircleIds');
    const bookmarks = getValues('bookmarks');

    if (isBookmarked) {
      setValue(
        'bookmarkedCircleIds',
        bookmarkedCircleIds.filter((id) => id !== circleId)
      );
      // oxlint-disable-next-line no-unused-vars
      const { [circleId]: _, ...filteredRecord } = bookmarks;
      setValue(`bookmarks`, filteredRecord);
    } else {
      setValue('bookmarkedCircleIds', [...bookmarkedCircleIds, circleId]);
      setValue(`bookmarks.${circleId}`, {
        id: circleId,
        isComplete: false,
        note: ''
      });
    }

    startTransition(() => {
      showToast({
        title: isBookmarked ? 'Circle Removed from Bookmark' : 'Circle Added to Bookmark',
        description: 'Check your bookmark page'
      });
    });
  };

  return (
    <Button
      size={size}
      variant={isBookmarked ? 'default' : 'outline'}
      onClick={handleToggleBookmark}
      aria-label={isBookmarked ? 'Unbookmark Item' : 'Bookmark Item'}
    >
      <RiBookmarkLine className={cn(!isBookmarked && 'text-primary')} />
    </Button>
  );
}

export default BookmarkButton;
