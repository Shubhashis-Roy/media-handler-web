import ActivityItemCard from "./ActivityItemCard";
import type { ActivityItem } from "./types";

type Props = {
  date: string;
  items: ActivityItem[];
  highlightedId?: number | null;
  handleReadItem: (id: number) => void;
  handleToggleRead: (id: number) => void;
  handleViewDetails: (id: number) => void;
  handleShare: (id: number) => void;
  handleDelete: (id: number) => void;
  handleReport: (id: number) => void;
  setSearchQuery: (v: string) => void;
};

export default function ActivitySection({
  date,
  items,
  highlightedId,
  handleReadItem,
  handleToggleRead,
  handleViewDetails,
  handleShare,
  handleDelete,
  handleReport,
  setSearchQuery,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
          {date}
        </h3>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {items.map((item, index) => (
        <ActivityItemCard
          key={item.id}
          item={item}
          index={index}
          highlightedId={highlightedId}
          handleReadItem={handleReadItem}
          handleToggleRead={handleToggleRead}
          handleViewDetails={handleViewDetails}
          handleShare={handleShare}
          handleDelete={handleDelete}
          handleReport={handleReport}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
}
