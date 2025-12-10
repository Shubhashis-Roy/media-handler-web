import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Download, Trash2, X } from "lucide-react";

interface BulkActionsProps {
  bulkSelected: Set<string>;
  onBulkDownload: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  bulkSelected,
  onBulkDownload,
  onBulkDelete,
  onClearSelection,
}: BulkActionsProps) {
  return (
    <AnimatePresence>
      {bulkSelected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {bulkSelected.size} item
                  {bulkSelected.size > 1 ? "s" : ""} selected
                </span>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={onBulkDownload}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onBulkDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClearSelection}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
