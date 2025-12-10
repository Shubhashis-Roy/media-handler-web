"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2, Plus, UserCheck, CheckCircle } from "lucide-react";

import ActivityHeader from "../../components/activity/ActivityHeader";
import ActivitySearchBar from "../../components/activity/ActivitySearchBar";
import ActivityFeed from "../../components/activity/ActivityFeed";
import ActivityRightSidebar from "../../components/activity/ActivityRightSidebar";

import {
  ActivityItem,
  INITIAL_ACTIVITIES,
} from "../../components/activity/types";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useToast } from "../../hooks/use-toast";

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activities, setActivities] =
    useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedId, setHighlightedId] = useState<number | null>(null); // ⭐ REQUIRED
  const { toast } = useToast();

  // ----------------------------------------------
  // ⭐ SAFE HIGHLIGHT EFFECT — NO CASCADING RENDERS
  // ----------------------------------------------
  useEffect(() => {
    let hasRun = false;

    const run = () => {
      if (hasRun) return;
      hasRun = true;

      const params = new URLSearchParams(window.location.search);
      const highlightParam = params.get("highlight");
      if (!highlightParam) return;

      const id = Number(highlightParam);

      // Set state AFTER microtask to avoid synchronous re-render
      Promise.resolve().then(() => {
        setHighlightedId(id);

        // Scroll AFTER DOM renders
        setTimeout(() => {
          const element = document.getElementById(`activity-${id}`);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 350);
      });
    };

    run();
  }, []);

  // ------------------------------------------------
  // FILTERED ACTIVITIES
  // ------------------------------------------------
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (activeTab === "unread" && activity.status !== "unread") return false;
      if (activeTab === "mentions" && activity.type !== "mention") return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          activity.user.name.toLowerCase().includes(q) ||
          activity.target.toLowerCase().includes(q) ||
          activity.action.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [activities, activeTab, searchQuery]);

  // ------------------------------------------------
  // GROUPED BY DATE (Today, Yesterday)
  // ------------------------------------------------
  type GroupedActivities = Record<string, ActivityItem[]>;

  const groupedActivities = useMemo<GroupedActivities>(() => {
    return filteredActivities.reduce((groups, item) => {
      if (!groups[item.dateGroup]) groups[item.dateGroup] = [];
      groups[item.dateGroup].push(item);
      return groups;
    }, {} as GroupedActivities);
  }, [filteredActivities]);

  // ------------------------------------------------
  // ACTIONS
  // ------------------------------------------------
  const handleMarkAllRead = () => {
    setActivities((prev) => prev.map((a) => ({ ...a, status: "read" })));

    toast({
      title: "All caught up!",
      description: "All notifications have been marked as read.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your activity report is being generated.",
    });
  };

  const handleReadItem = (id: number) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "read" } : a))
    );
  };

  const handleLoadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      const newItem: ActivityItem = {
        id: Date.now(),
        user: { name: "New User", initial: "NU", color: "bg-indigo-500" },
        action: "joined the team",
        target: "Design Department",
        time: "Just now",
        dateGroup: "Older",
        type: "mention",
        icon: UserCheck,
        status: "read",
      };

      setActivities((prev) => [...prev, newItem]);
      setIsLoading(false);

      toast({ title: "Loaded older activity" });
    }, 1000);
  };

  // ------------------------------------------------
  // DROPDOWN MENU HANDLERS
  // ------------------------------------------------
  const handleToggleRead = (id: number) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "read" ? "unread" : "read" }
          : a
      )
    );

    toast({
      title: "Status updated",
      description: "Activity status has been toggled.",
    });
  };

  const handleViewDetails = (id: number) => {
    toast({
      title: "View Details",
      description: `Viewing details for activity ${id}`,
    });
  };

  const handleShare = (id: number) => {
    toast({
      title: "Share",
      description: `Sharing activity ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));

    toast({
      title: "Activity deleted",
      description: "The activity has been removed.",
      variant: "destructive",
    });
  };

  const handleReport = (id: number) => {
    toast({
      title: "Report submitted",
      description: `Activity ${id} has been reported.`,
    });
  };

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  return (
    <div className="min-h-screen pt-28 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <ActivityHeader
        handleExport={handleExport}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Search */}
      <ActivitySearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-[var(--color-surface-muted)] p-1 rounded-xl mb-6 grid grid-cols-3 sm:flex">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ActivityFeed
                activities={activities}
                filteredActivities={filteredActivities}
                groupedActivities={groupedActivities}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleReadItem={handleReadItem}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
                setSearchQuery={setSearchQuery}
                highlightedId={highlightedId}
                handleToggleRead={handleToggleRead}
                handleViewDetails={handleViewDetails}
                handleShare={handleShare}
                handleDelete={handleDelete}
                handleReport={handleReport}
              />
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
                  <p>You&apos;re all caught up!</p>
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
                  No recent mentions found.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT SIDEBAR */}
        <ActivityRightSidebar />
      </div>
    </div>
  );
}
