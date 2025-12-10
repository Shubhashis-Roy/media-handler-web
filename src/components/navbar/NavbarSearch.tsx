"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  TrendingUp,
  FileImage,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type NavbarSearchProps = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export function NavbarSearch({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}: NavbarSearchProps) {
  return (
    <div className={`nav-search-wrapper ${searchOpen ? "open" : ""}`}>
      {!searchOpen && (
        <Search
          className="acc-icon search-trigger"
          size={22}
          onClick={() => setSearchOpen(true)}
        />
      )}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="nav-search-bar"
          >
            <div className="flex flex-col w-full">
              {/* Input Row */}
              <div className="nav-search-inner">
                <Search size={19} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search templates, media, projects…"
                  className="nav-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="nav-search-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ⭐ Suggestions Panel */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="nav-search-suggestions mt-2 p-5 bg-[var(--color-surface)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* LEFT COLUMN */}
                  <div className="space-y-6">
                    {/* Trending */}
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp
                          size={14}
                          className="text-[var(--color-primary)]"
                        />
                        Trending Now
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {[
                          "#SummerCampaign",
                          "#ProductLaunch",
                          "#ViralVideo",
                          "#Rebrand2025",
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-[var(--color-surface-muted)] hover:bg-[var(--color-primary)] hover:text-white rounded-full text-sm cursor-pointer transition-colors font-medium"
                            onClick={() => setSearchQuery(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Files */}
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileImage
                          size={14}
                          className="text-[var(--color-secondary)]"
                        />
                        Recent Files
                      </h4>

                      <ul className="space-y-2">
                        {[
                          { name: "Hero_Banner_v2.png", type: "image" },
                          { name: "Q3_Report.pdf", type: "file" },
                        ].map((file, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-muted)] rounded-lg transition-colors cursor-pointer group"
                            onClick={() => setSearchQuery(file.name)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center group-hover:bg-white">
                              <FileImage
                                size={16}
                                className="text-[var(--color-text-muted)]"
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {file.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-6 border-l border-[var(--color-border)] pl-0 md:pl-8">
                    {/* Suggested People */}
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Users size={14} className="text-pink-500" />
                        Suggested People
                      </h4>

                      <div className="space-y-3">
                        {[
                          { name: "Sarah Wilson", role: "Art Director" },
                          { name: "David Chen", role: "Video Editor" },
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-muted)] rounded-xl cursor-pointer transition-colors"
                            onClick={() => setSearchQuery(p.name)}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white flex items-center justify-center text-xs font-bold">
                              {p.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{p.name}</p>
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {p.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Generate */}
                    <div className="pt-2">
                      <div
                        className="p-3 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-xl border border-[var(--color-primary)]/20 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSearchQuery("AI Generate")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles
                              size={16}
                              className="text-[var(--color-primary)]"
                            />
                            <span className="text-sm font-bold text-[var(--color-primary)]">
                              AI Generate
                            </span>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-[var(--color-primary)]"
                          />
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                          Create new media from text...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
