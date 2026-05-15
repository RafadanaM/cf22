import { useWatch } from 'react-hook-form';

import { Field, FieldLabel } from '@/core/ui/components/field';
import { Progress } from '@/core/ui/components/progress';

import { useBookmarkForm } from '../contexts/BookmarkFormProvider';

function BookmarkProgress() {
  const { control } = useBookmarkForm();

  const bookmarkedCircles = useWatch({
    control,
    name: 'bookmarks'
  });

  const { completedCircles, totalCircles } = Object.values(bookmarkedCircles).reduce(
    (acc, curr) => {
      acc.totalCircles += 1;

      if (curr.isComplete) {
        acc.completedCircles += 1;
      }

      return acc;
    },
    {
      totalCircles: 0,
      completedCircles: 0
    }
  );

  const progress = totalCircles ? Math.round((completedCircles / totalCircles) * 100) : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <Field className="w-full">
        <FieldLabel htmlFor="progress-bookmark">
          <h3 className="text-lg font-semibold">{'Progress'}</h3>
          <span className="ml-auto">{`${completedCircles}/${totalCircles}`}</span>
        </FieldLabel>
        <Progress value={progress} max={100} id="progress-bookmark" />
      </Field>
    </div>
  );
}
export default BookmarkProgress;
