import { RiFileCopyLine, RiUploadCloud2Line, RiUploadCloudLine } from '@remixicon/react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/core/ui/components/button';
import { Field, FieldDescription, FieldLabel } from '@/core/ui/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/core/ui/components/input-group';
import { Spinner } from '@/core/ui/components/spinner';
import { useToast } from '@/core/ui/components/toast/ToastProvider';

import { UserBookmark } from '@/features/Bookmark/types/bookmark';

import { useBookmarkForm } from '@/features/Bookmark/contexts/BookmarkFormProvider';
import useUpsertBookmarkAPI from '@/features/Bookmark/hooks/useUpsertBookmarkAPI';

function UploadSyncCard() {
  const { control } = useBookmarkForm();
  const { isPending, mutate } = useUpsertBookmarkAPI();
  const { showToast } = useToast();

  // for some reason useWatch returns deep partial like WTF!!!
  const bookmark = useWatch({
    control
  }) as UserBookmark;

  const handleSync = () => {
    mutate(
      { id: bookmark.bookmarkId!, bookmarkData: bookmark },
      {
        onSuccess: () => {
          showToast({
            title: 'Bookmark Synced!',
            description: 'Access this bookmark on other devices'
          });
        },
        onError: (e) => {
          showToast({
            title: 'Failed To Sync Bookmark',
            description: e.message
          });
        }
      }
    );
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.bookmarkId!);
      showToast({
        title: 'Copy Success!',
        description: 'Save your code to be reused later.',
        timeoutMs: 2000
      });
    } catch {
      showToast({
        title: 'Copy Failed!',
        description: 'Please update your browser',
        timeoutMs: 2000
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-card rounded-lg border border-border p-4">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10">
          <RiUploadCloudLine size={32} className="text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">{'Upload To Cloud'}</h3>
          <FieldDescription className="text-sm text-muted-foreground">
            {
              'Backup your bookmark and notes to our server. Use the unique sync code below to access your data on other devices'
            }
          </FieldDescription>
        </div>
      </div>
      <Field>
        <div className="flex flex-col gap-2 py-2 px-4 border bg-secondary rounded-md">
          <FieldLabel
            htmlFor="sync-code"
            className="text-sm font-semibold text-muted-foreground text-center self-center"
          >
            {'Your Sync Code'}
          </FieldLabel>

          <InputGroup className="h-10 bg-white flex items-center">
            <InputGroupInput id="sync-cod" value={bookmark.bookmarkId} readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={handleCopyCode} size="icon-sm">
                <RiFileCopyLine />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Field>
      <Button disabled={isPending} size="lg" onClick={handleSync}>
        {isPending ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <RiUploadCloud2Line data-icon="inline-start" />
        )}
        {isPending ? 'Syncing data...' : 'Sync Data'}
      </Button>
    </div>
  );
}

export default UploadSyncCard;
