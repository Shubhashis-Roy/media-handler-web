import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ImageIcon, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  showEmojiPicker: boolean;
  onEmojiPickerToggle: (show: boolean) => void;
  onEmojiClick: () => void;
  characterCount: number;
  maxCharacters: number;
}

export default function ContentEditor({
  content,
  onContentChange,
  showEmojiPicker,
  onEmojiPickerToggle,
  onEmojiClick,
  characterCount,
  maxCharacters,
}: ContentEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Post Content</Label>
            <span
              className={`text-sm ${
                characterCount > maxCharacters
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {characterCount} / {maxCharacters}
            </span>
          </div>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[150px] resize-none"
          />
        </div>

        {/* Emoji + Media Buttons */}
        <div className="flex items-center gap-2">
          <Popover open={showEmojiPicker} onOpenChange={onEmojiPickerToggle}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm">
            <ImageIcon className="h-4 w-4 mr-2" />
            Attach Media
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
