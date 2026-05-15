import appAPIClient from '@/core/apiClient/appApiClient';

import { UserBookmark } from '../types/Bookmark';

async function upsertBookmarkAPI(id: string, bookmarkData: UserBookmark) {
  return appAPIClient.put<UserBookmark, { bookmark: UserBookmark }>(
    `/api/v1/bookmarks/${id}`,
    {
      bookmark: bookmarkData
    }
  );
}

export default upsertBookmarkAPI;
