"use client";

import { Button } from "../../../components/ui/button";

interface MediaHeaderProps {
  onUpload: (files: FileList | null) => void;
}

export default function MediaHeader({ onUpload }: MediaHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Media Library</h2>

      <input
        id="media-upload-input"
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => onUpload(e.target.files)}
      />

      <Button
        onClick={() => document.getElementById("media-upload-input")?.click()}
      >
        Upload Media
      </Button>
    </div>
  );
}
