"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MoreHorizontal,
  Eye,
  EyeOff,
  Share,
  Trash2,
  Flag,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

import type { ActivityItem } from "./types";

type Props = {
  item: ActivityItem;
  index: number;
  highlightedId?: number | null;
  handleReadItem: (id: number) => void;
  handleToggleRead: (id: number) => void;
  handleViewDetails: (id: number) => void;
  handleShare: (id: number) => void;
  handleDelete: (id: number) => void;
  handleReport: (id: number) => void;
  setSearchQuery: (v: string) => void;
};

export default function ActivityItemCard({
  item,
  index,
  highlightedId,
  handleReadItem,
  handleToggleRead,
  handleViewDetails,
  handleShare,
  handleDelete,
  handleReport,
  setSearchQuery,
}: Props) {
  const isHighlighted = highlightedId === item.id;

  return (
    <motion.div
      id={`activity-${item.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isHighlighted ? 1.02 : 1,
        boxShadow: isHighlighted ? "0 0 0 3px var(--color-primary)" : "none",
      }}
      transition={{ delay: index * 0.05 }}
      onClick={() => handleReadItem(item.id)}
    >
      <Card
        className={`border-[var(--color-border)] shadow-sm hover:shadow-md transition-all cursor-pointer group 
        ${isHighlighted ? "ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/5" : ""}
        ${
          item.status === "unread"
            ? "bg-[var(--color-surface)] border-l-4 border-l-[var(--color-primary)]"
            : "bg-[var(--color-surface)] opacity-90 hover:opacity-100"
        }`}
      >
        <div className="p-5 flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-[var(--color-surface)] shadow-sm">
            <AvatarFallback className={`${item.user.color} text-white`}>
              {item.user.initial}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text)]">
                  <span className="font-semibold">{item.user.name}</span>{" "}
                  <span className="text-[var(--color-text-muted)]">
                    {item.action}
                  </span>{" "}
                  <span
                    className="font-medium text-[var(--color-primary)] hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(item.target);
                    }}
                  >
                    {item.target}
                  </span>
                </p>

                <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1 mt-1">
                  <Clock size={12} /> {item.time}
                </p>
              </div>

              {/* Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border border-border" align="end">
                  <DropdownMenuItem onClick={() => handleToggleRead(item.id)}>
                    {item.status === "read" ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" /> Mark as Unread
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" /> Mark as Read
                      </>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleViewDetails(item.id)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleShare(item.id)}>
                    <Share className="mr-2 h-4 w-4" /> Share
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleReport(item.id)}>
                    <Flag className="mr-2 h-4 w-4" /> Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
