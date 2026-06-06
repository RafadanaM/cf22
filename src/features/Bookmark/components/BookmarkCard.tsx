import { RiCheckLine, RiEditLine } from '@remixicon/react';
import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useWatch } from 'react-hook-form';

import { Badge } from '@/core/ui/components/badge';
import { Button } from '@/core/ui/components/button';
import { BookmarkDetail } from '../types/bookmark';
import { Circle } from '@/domain/circle/types';

import { useAppDrawer, APP_DRAWER_ID } from '@/layout/drawers/useAppDrawer';

import { useBookmarkForm } from '../contexts/BookmarkFormProvider';

interface BookmarkCardProps {
  circle: Circle;
  Content?: ReactNode;
}

function BookmarkCard({ circle, Content }: BookmarkCardProps) {
  const { control, getValues, setValue } = useBookmarkForm();

  const { openDrawer } = useAppDrawer();

  const bookmarkDetail: BookmarkDetail = useWatch({
    control,
    name: `bookmarks.${circle.id}`
  });

  const note = useWatch({
    control,
    name: `bookmarks.${circle.id}.note`
  });

  const handleToggleBookmark = () => {
    setValue(
      `bookmarks.${circle.id}.isComplete`,
      !getValues(`bookmarks.${circle.id}.isComplete`)
    );
  };

  const handleEditNote = () => {
    openDrawer(APP_DRAWER_ID.EDIT_BOOKMARK_NOTE, {
      note: bookmarkDetail.note,
      circle
    });
  };

  const handleSeeNote = () => {
    openDrawer(APP_DRAWER_ID.SEE_BOOKMARK_NOTE, {
      circle,
      note: bookmarkDetail.note
    });
  };

  return (
    <motion.div layout="position">
      <div className="bg-card rounded-t-xl border-t border-r border-l border-border px-3 py-2 flex justify-between items-center">
        {bookmarkDetail.isComplete ? (
          <Badge>
            <RiCheckLine data-icon="inline-start" />
            {'Complete'}
          </Badge>
        ) : (
          <div />
        )}

        <Button
          variant={bookmarkDetail.isComplete ? 'default' : 'outline'}
          size="icon"
          className="rounded-full"
          onClick={handleToggleBookmark}
          aria-label={bookmarkDetail.isComplete ? 'Unclomplete item' : 'Complete Item'}
        >
          <RiCheckLine />
        </Button>
      </div>
      {Content}
      <div className="flex gap-3 px-4 py-2 bg-card border-b border-l border-r border-border rounded-b-xl">
        <div className="flex flex-col flex-1">
          <h4 className="text-sm font-semibold">{'Note:'}</h4>
          <button
            onClick={handleSeeNote}
            className="block mt-1 p-2 rounded-lg bg-secondary border"
          >
            <p className="whitespace-pre-wrap text-justify text-xs text-muted-foreground text-ellipsis leading-tight line-clamp-3">
              {note || '-'}
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleEditNote}
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label="Edit Note"
          >
            <RiEditLine />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default BookmarkCard;
