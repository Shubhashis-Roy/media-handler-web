"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Filter,
  Zap,
  Download,
  CheckCircle,
  Users,
  Layers,
} from "lucide-react";

import { Button } from "../../components/radix-ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../components/radix-ui/dropdown-menu";

type Props = {
  handleExport: () => void;
  onMarkAllRead: () => void; // ✅ updated prop name
};

export default function ActivityHeader({
  handleExport,
  onMarkAllRead,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-2 flex items-center gap-3"
        >
          <Activity className="w-8 h-8 text-[var(--color-primary)]" />
          Activity Feed
        </motion.h1>

        <p className="text-[var(--color-text-muted)] text-lg">
          Track updates, mentions, and system alerts in real-time.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 w-full md:w-auto flex-wrap">
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 hidden md:flex">
              <Filter size={16} /> Filter View
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" /> Team Updates
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Layers className="mr-2 h-4 w-4" /> System Logs
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Zap className="mr-2 h-4 w-4" /> Project Actions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export */}
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download size={16} /> Export
        </Button>

        {/* Mark All Read */}
        <Button
          className="gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white shadow-lg shadow-[var(--color-primary)]/20"
          onClick={onMarkAllRead}
        >
          <CheckCircle size={16} /> Mark all read
        </Button>
      </div>
    </div>
  );
}
