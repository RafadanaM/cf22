import { CircleId } from "./circle";

export type UserBookmark = {
  bookmarkId: string;
  bookmarks: Record<CircleId, BookmarkDetail>;
  bookmarkedCircleIds: CircleId[];
};

export type BookmarkDetail = {
  isComplete: boolean;
  id: CircleId;
  note: string;
};
