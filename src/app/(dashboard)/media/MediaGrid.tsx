import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Search, Download, Trash2, Check } from "lucide-react";

export interface MediaItem {
  id: string;
  url: string;
  name?: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface MediaGridProps {
  media: MediaItem[];
  onSelectMedia: (id: string) => void;
  bulkSelected: Set<string>;
  toggleBulkSelect: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MediaGrid({
  media,
  onSelectMedia,
  bulkSelected,
  toggleBulkSelect,
  onDownload,
  onDelete,
}: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="relative group"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative cursor-pointer">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    className="object-cover w-full h-full"
                    onClick={() => onSelectMedia(item.id)}
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={item.name ?? ""}
                    fill
                    className="object-cover"
                    onClick={() => onSelectMedia(item.id)}
                  />
                )}

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMedia(item.id);
                    }}
                  >
                    <Search className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(item.id);
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Checkbox */}
                <div className="absolute top-2 right-2">
                  <Button
                    size="icon"
                    variant={
                      bulkSelected.has(item.id) ? "default" : "secondary"
                    }
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBulkSelect(item.id);
                    }}
                  >
                    {bulkSelected.has(item.id) && <Check className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
