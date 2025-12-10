import {
  MessageSquare,
  CheckCircle,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export type ActivityItem = {
  id: number;
  user: { name: string; initial: string; color: string };
  action: string;
  target: string;
  time: string;
  dateGroup: string;
  type: string;
  icon: any;
  status: "read" | "unread";
};

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    user: { name: "Sarah Wilson", initial: "SW", color: "bg-pink-500" },
    action: "commented on",
    target: "Q3 Marketing Strategy",
    time: "10 mins ago",
    dateGroup: "Today",
    type: "comment",
    icon: MessageSquare,
    status: "unread",
  },
  {
    id: 2,
    user: { name: "David Chen", initial: "DC", color: "bg-blue-500" },
    action: "approved",
    target: "Homepage Hero Video",
    time: "45 mins ago",
    dateGroup: "Today",
    type: "approval",
    icon: CheckCircle,
    status: "read",
  },
  {
    id: 3,
    user: { name: "System", initial: "SYS", color: "bg-gray-500" },
    action: "alert",
    target: "Storage usage at 85%",
    time: "2 hours ago",
    dateGroup: "Today",
    type: "alert",
    icon: AlertCircle,
    status: "unread",
  },
  {
    id: 4,
    user: { name: "Jessica Lee", initial: "JL", color: "bg-purple-500" },
    action: "uploaded",
    target: "Campaign Assets v2.zip",
    time: "4 hours ago",
    dateGroup: "Today",
    type: "upload",
    icon: MessageSquare,
    status: "read",
  },
  {
    id: 5,
    user: { name: "Mike Ross", initial: "MR", color: "bg-green-500" },
    action: "completed task",
    target: "Review Social Media Plan",
    time: "Yesterday",
    dateGroup: "Yesterday",
    type: "task",
    icon: CheckCircle,
    status: "read",
  },
  {
    id: 6,
    user: { name: "Team Alpha", initial: "TA", color: "bg-orange-500" },
    action: "mentioned you in",
    target: "Weekly Sync Notes",
    time: "Yesterday",
    dateGroup: "Yesterday",
    type: "mention",
    icon: UserCheck,
    status: "read",
  },
];

export const TRENDING_SEARCHES = [
  "Q4 Campaign Assets",
  "Social Media Templates",
  "Video Export Settings",
  "Team Permission Roles",
];

export const RECENT_SEARCHES = [
  "Logo files",
  "Meeting notes",
  "Budget spreadsheet",
];

export const SUGGESTED_PROJECTS = [
  { name: "Summer Launch 2025", category: "Marketing" },
  { name: "Website Redesign", category: "Development" },
  { name: "Client Onboarding", category: "Operations" },
];
