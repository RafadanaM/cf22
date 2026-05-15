import Section from '@/shared/components/Section';
import RestoreSyncCard from '@/features/Bookmark/components/RestoreSyncCard';
import UploadSyncCard from '@/features/Bookmark/components/UploadSyncCard';

function SyncSection() {
  return (
    <Section title="Sync Bookmark">
      <UploadSyncCard />
      <RestoreSyncCard />
    </Section>
  );
}

export default SyncSection;
