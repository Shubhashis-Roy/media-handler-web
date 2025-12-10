"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, Star, ArrowUpRight, Zap } from "lucide-react";
import { Input } from "../../components/radix-ui/input";
import { Badge } from "../../components/radix-ui/badge";

import {
  TRENDING_SEARCHES,
  RECENT_SEARCHES,
  SUGGESTED_PROJECTS,
} from "./types";

type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
};

export default function ActivitySearchBar({ searchQuery, setSearchQuery }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-40 mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
        
        <Input
          className="pl-12 h-14 text-lg rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
          placeholder="Search activity, users, or files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />

        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-16 left-0 right-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 grid md:grid-cols-2 gap-8 z-50"
          >
            {/* Left side */}
            <div>
              <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp size={14} /> Trending Now
              </h3>

              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary"
                    className="px-3 py-1.5 cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-colors text-sm"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>

              <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mt-6 mb-4 flex items-center gap-2">
                <Clock size={14} /> Recent Searches
              </h3>

              <ul className="space-y-2">
                {RECENT_SEARCHES.map((term, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] p-2 rounded-lg cursor-pointer"
                    onClick={() => setSearchQuery(term)}
                  >
                    <Clock size={14} className="text-[var(--color-text-muted)]" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Projects */}
            <div className="border-l border-[var(--color-border)] pl-8 hidden md:block">
              <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star size={14} /> Suggested Projects
              </h3>

              <div className="space-y-3">
                {SUGGESTED_PROJECTS.map((project, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between group cursor-pointer p-3 hover:bg-[var(--color-surface-muted)] rounded-xl"
                    onClick={() => setSearchQuery(project.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        i === 0 ? "bg-pink-100 text-pink-600" :
                        i === 1 ? "bg-blue-100 text-blue-600" :
                                  "bg-green-100 text-green-600"
                      }`}>
                        <Zap size={18} />
                      </div>

                      <div>
                        <p className="font-medium text-sm">{project.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{project.category}</p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Projects", "Team", "System", "Files"].map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-[var(--color-surface-muted)] px-3 py-1"
            onClick={() => setSearchQuery(tag === "All" ? "" : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
