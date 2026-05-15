import appAPIClient from '@/core/apiClient/appApiClient';

import { UserBookmark } from '../types/Bookmark';

async function restoreBookmarkAPI(id: string) {
  return appAPIClient.get<UserBookmark>(`/api/v1/bookmarks/${id}`);
}

export default restoreBookmarkAPI;
