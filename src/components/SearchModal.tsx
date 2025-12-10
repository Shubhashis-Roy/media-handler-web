"use client";

import { motion } from "framer-motion";
import { X, Search } from "lucide-react";

export default function SearchBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      className="nav-search-bar"
      initial={{ width: 0, opacity: 0 }}
      animate={open ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="nav-search-inner">
        <Search size={18} className="nav-search-icon" />
        <input type="text" placeholder="Search…" className="nav-search-input" autoFocus />
        <button className="nav-search-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
}
