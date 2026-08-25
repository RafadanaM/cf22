import appAPIClient from '@/core/api/client';

import { UserBookmark } from '../types/bookmark';

async function createBookmarkAPI(bookmarkData: UserBookmark) {
  return appAPIClient.post<UserBookmark, { bookmark: UserBookmark }>(
    `/api/v1/bookmarks`,
    {
      bookmark: bookmarkData
    }
  );
}

export default createBookmarkAPI;
