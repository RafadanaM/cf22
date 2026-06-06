import { useForm } from 'react-hook-form';

import { Button } from '@/core/ui/components/button';
import Drawer from '@/core/ui/components/drawer/Drawer';
import { DrawerProps } from '@/core/ui/components/drawer/DrawerProvider';
import { Field, FieldLabel } from '@/core/ui/components/field';
import { Textarea } from '@/core/ui/components/textarea';
import { interactionResponse } from '@/core/utils/scheduler';

import { Circle } from '@/domain/circle/types';
import { useBookmarkForm } from '@/features/bookmark/contexts/BookmarkFormProvider';

interface EditBookmarkNoteDrawerProps extends DrawerProps {
  circle: Circle;
  note: string;
}

interface EditBookmarkNote {
  note: string;
}

function EditBookmarkNoteDrawer({ note, circle, close }: EditBookmarkNoteDrawerProps) {
  const { register, handleSubmit } = useForm<EditBookmarkNote>({
    defaultValues: {
      note
    }
  });

  const { setValue } = useBookmarkForm();

  const onSubmit = async (data: EditBookmarkNote) => {
    close();
    await interactionResponse();
    setValue(`bookmarks.${circle.id}.note`, data.note.trim());
  };

  return (
    <Drawer close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Drawer.Header className="flex gap-2">
            <h2 className="text-xl font-semibold">{`Edit ${circle.name}`}</h2>
          </Drawer.Header>

          <Drawer.Body className="flex flex-col gap-2 border-t border-border">
            <FieldLabel className="text-md" htmlFor={`note-${circle.name}-${circle.id}`}>
              {'Note:'}
            </FieldLabel>
            <Textarea
              {...register('note')}
              className="resize-none text-sm h-40"
              id={`note-${circle.name}-${circle.id}`}
              placeholder="Type your notes here"
            />
          </Drawer.Body>
        </Field>

        <Drawer.Footer className="flex flex-col gap-1">
          <Button className="h-10" size="lg">
            {'Submit'}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={close}>
            {'Cancel'}
          </Button>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
}

export default EditBookmarkNoteDrawer;
