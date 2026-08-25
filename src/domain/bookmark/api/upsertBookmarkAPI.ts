import appAPIClient from '@/core/api/client';
import { UserBookmark } from '../types/bookmark';

async function upsertBookmarkAPI(id: string, bookmarkData: UserBookmark) {
  return appAPIClient.put<UserBookmark, { bookmark: UserBookmark }>(
    `/api/v1/bookmarks/${id}`,
    {
      bookmark: bookmarkData
    }
  );
}

export default upsertBookmarkAPI;
