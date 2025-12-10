"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "../../../components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

import * as Dialog from "@radix-ui/react-dialog";
import { DialogHeader, DialogTitle } from "../../../components/ui/dialog";

import MediaHeader from "./MediaHeader";
import MediaFilters from "./MediaFilters";
import BulkActions from "./BulkActions";
import MediaGrid, { MediaItem } from "./MediaGrid";

// Mock Data
const mockMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    name: "sample-1.jpg",
    type: "image",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800",
    name: "sample-2.jpg",
    type: "image",
    size: "1.8 MB",
    uploadedAt: "2024-01-14",
  },
];

export default function Media() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [mediaList, setMediaList] = useState<MediaItem[]>(mockMedia);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());

  // Bulk toggle
  const toggleBulkSelect = (id: string) => {
    const next = new Set(bulkSelected);
    next.has(id) ? next.delete(id) : next.add(id);
    setBulkSelected(next);
  };

  // Upload (with video 5-minute limit)
  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("video")) {
        const videoURL = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.src = videoURL;

        video.onloadedmetadata = () => {
          if (video.duration > 300) {
            alert(`❌ ${file.name} is longer than 5 minutes`);
            URL.revokeObjectURL(videoURL);
            return;
          }
          addFile(file, index);
        };
      } else {
        addFile(file, index);
      }
    });
  };

  // Helper to add file
  const addFile = (file: File, index: number) => {
    const newItem: MediaItem = {
      id: `uploaded-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type.startsWith("video") ? "video" : "image",
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    setMediaList((prev) => [newItem, ...prev]);
  };

  // Search + filter
  const filteredMedia = mediaList.filter((item) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q);

    const matchesType = filterType === "all" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  // Delete
  const handleDelete = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    setBulkSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    setMediaList((prev) => prev.filter((m) => !bulkSelected.has(m.id)));
    setBulkSelected(new Set());
  };

  // Download
  const handleDownload = async (id: string) => {
    const media = mediaList.find((m) => m.id === id);
    if (!media) return;

    try {
      const response = await fetch(media.url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = media.name ?? `${media.id}.file`;
      link.click();

      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MediaHeader onUpload={handleUpload} />

        <MediaFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <BulkActions
          bulkSelected={bulkSelected}
          onBulkDelete={handleBulkDelete}
          onBulkDownload={() => {}}
          onClearSelection={() => setBulkSelected(new Set())}
        />
      </motion.div>

      <MediaGrid
        media={filteredMedia}
        onSelectMedia={setSelectedMedia}
        bulkSelected={bulkSelected}
        toggleBulkSelect={toggleBulkSelect}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      {/* ===================== MODAL ===================== */}
      <Dialog.Root
        open={!!selectedMedia}
        onOpenChange={() => setSelectedMedia(null)}
      >
        <Dialog.Portal>
          {/* BACKDROP */}
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-[9998]" />

          {/* MODAL CONTENT */}
          <Dialog.Content
            className="
        fixed z-[9999]
        left-1/2 top-[50vh]
        -translate-x-1/2 -translate-y-1/2
        w-full max-w-5xl max-h-[90vh]
        overflow-y-auto
        bg-white dark:bg-neutral-900
        rounded-xl shadow-2xl
        p-6
      "
          >
            {/* CLOSE BUTTON (CROSS ICON) */}
            <Dialog.Close asChild>
              <button
                className="
            absolute right-4 top-4
            rounded-full p-2
            hover:bg-gray-200 dark:hover:bg-neutral-800
            transition
          "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </Dialog.Close>

            {/* HEADER */}
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-4">
                Media Preview
              </DialogTitle>
            </DialogHeader>

            {/* CONTENT */}
            {selectedMedia &&
              (() => {
                const item = mediaList.find((m) => m.id === selectedMedia);
                if (!item) return null;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT: PREVIEW */}
                    <div className="w-full">
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          controls
                          className="w-full rounded-lg max-h-[70vh] object-contain"
                        />
                      ) : (
                        <Image
                          src={item.url}
                          alt={item.name ?? ""}
                          width={900}
                          height={700}
                          className="rounded-lg object-contain max-h-[70vh] w-full"
                        />
                      )}
                    </div>

                    {/* RIGHT: DETAILS */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">File Name</p>
                        <p className="font-medium break-all">{item.name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p>{item.size}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <Badge variant="secondary">{item.type}</Badge>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Uploaded</p>
                        <p>{item.uploadedAt}</p>
                      </div>

                      <div className="flex gap-2 pt-6">
                        <Button
                          variant="outline"
                          onClick={() => handleDownload(item.id)}
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
