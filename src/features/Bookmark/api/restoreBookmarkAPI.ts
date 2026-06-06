import appAPIClient from '@/core/apiClient/appApiClient';

import { UserBookmark } from '../types/bookmark';

async function restoreBookmarkAPI(id: string) {
  return appAPIClient.get<UserBookmark>(`/api/v1/bookmarks/${id}`);
}

export default restoreBookmarkAPI;
