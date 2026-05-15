import BookmarkProgress from '@/features/Bookmark/components/BookmarkProgress';
import BookmarkedCircleList from '@/features/Circle/components/BookmarkCircleList';
import Section from '@/shared/components/Section';

function BookmarkSection() {
  return (
    <Section title="Bookmarked Circles">
      <BookmarkProgress />
      <BookmarkedCircleList />
    </Section>
  );
}

export default BookmarkSection;
