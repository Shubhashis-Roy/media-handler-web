"use client";

import {
  Tabs,
  TabsContent,
} from "../../components/radix-ui/tabs";
import { Button } from "../../components/radix-ui/button";
import { CheckCircle, UserCheck } from "lucide-react";

import ActivitySection from "./ActivitySection";
import LoadMore from "./LoadMore";
import type { ActivityItem } from "./types";

type Props = {
  activities: ActivityItem[];
  filteredActivities: ActivityItem[];
  groupedActivities: Record<string, ActivityItem[]>;
  activeTab: string;
  setActiveTab: (v: string) => void;
  handleReadItem: (id: number) => void;
  handleLoadMore: () => void;
  isLoading: boolean;
  setSearchQuery: (v: string) => void;

  highlightedId?: number | null;

  handleToggleRead: (id: number) => void;
  handleViewDetails: (id: number) => void;
  handleShare: (id: number) => void;
  handleDelete: (id: number) => void;
  handleReport: (id: number) => void;
};

export default function ActivityFeed({
  groupedActivities,
  filteredActivities,
  activeTab,
  setActiveTab,
  handleReadItem,
  handleLoadMore,
  isLoading,
  setSearchQuery,
  highlightedId,
  handleToggleRead,
  handleViewDetails,
  handleShare,
  handleDelete,
  handleReport,
}: Props) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">


      {/* ALL */}
      <TabsContent value="all">
        {Object.keys(groupedActivities).length > 0 ? (
          <>
            {Object.entries(groupedActivities).map(([date, items]) => (
              <ActivitySection
                key={date}
                date={date}
                items={items}
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

            <LoadMore isLoading={isLoading} onClick={handleLoadMore} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-muted)]">
              No activity found matching your filters.
            </p>
            <Button variant="link" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </TabsContent>

      {/* UNREAD */}
      <TabsContent value="unread">
        {filteredActivities.length > 0 ? (
          <p className="text-center text-[var(--color-text-muted)] py-4">
            Showing {filteredActivities.length} unread items.
          </p>
        ) : (
          <div className="text-center py-12 text-[var(--color-text-muted)] bg-[var(--color-surface-muted)]/30 rounded-2xl border border-dashed border-[var(--color-border)]">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>You’re all caught up!</p>
          </div>
        )}
      </TabsContent>

      {/* MENTIONS */}
      <TabsContent value="mentions">
        {filteredActivities.length > 0 ? (
          <p className="text-center text-[var(--color-text-muted)] py-4">
            Showing {filteredActivities.length} mentions.
          </p>
        ) : (
          <div className="text-center py-12 text-[var(--color-text-muted)] bg-[var(--color-surface-muted)]/30 rounded-2xl border border-dashed border-[var(--color-border)]">
            <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No recent mentions found.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
