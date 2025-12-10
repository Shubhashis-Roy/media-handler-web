"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  ImageIcon,
  Calendar as CalendarIcon,
  Clock,
  Smile,
} from "lucide-react";

import { SiInstagram, SiFacebook, SiX, SiLinkedin } from "react-icons/si";
import EmojiPicker from "emoji-picker-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Calendar } from "../../../components/ui/calendar";

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: SiInstagram,
    color: "text-pink-500",
    connected: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: SiFacebook,
    color: "text-blue-600",
    connected: true,
  },
  {
    id: "twitter",
    name: "X",
    icon: SiX,
    color: "text-black dark:text-white",
    connected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: SiLinkedin,
    color: "text-blue-700",
    connected: true,
  },
];

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(
    new Set(["instagram"])
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [scheduleType, setScheduleType] = useState<"now" | "schedule">(
    "schedule"
  );

  const togglePlatform = (platformId: string) => {
    const newSet = new Set(selectedPlatforms);
    newSet.has(platformId) ? newSet.delete(platformId) : newSet.add(platformId);
    setSelectedPlatforms(newSet);
  };

  const handleEmojiClick = (emojiData: any) => {
    setContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const characterCount = content.length;
  const maxCharacters = 280;

  return (
    <div className="p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Create Post</h1>
        <p className="text-muted-foreground mb-6">
          Compose and schedule your social media content
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section – Content Creator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Content Box */}
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
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>

              {/* Emoji + Media Buttons */}
              <div className="flex items-center gap-2">
                <Popover
                  open={showEmojiPicker}
                  onOpenChange={setShowEmojiPicker}
                >
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Smile className="h-4 w-4 mr-2" />
                      Emoji
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </PopoverContent>
                </Popover>

                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Attach Media
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <motion.div key={platform.id} whileHover={{ scale: 1.02 }}>
                    <Button
                      variant={
                        selectedPlatforms.has(platform.id)
                          ? "default"
                          : "outline"
                      }
                      className="w-full py-4 flex-col gap-2"
                      onClick={() => togglePlatform(platform.id)}
                      disabled={!platform.connected}
                    >
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                      <span>{platform.name}</span>
                      {!platform.connected && (
                        <span className="text-xs bg-muted rounded px-2 py-1">
                          Not Connected
                        </span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Options */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={scheduleType}
                onValueChange={(v) => setScheduleType(v as any)}
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="now">Post Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="mt-4 space-y-4">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          mode="single"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            size="lg"
            className="w-full"
            disabled={!content || selectedPlatforms.size === 0}
          >
            {scheduleType === "now" ? "Publish Now" : "Schedule Post"}
          </Button>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="instagram">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                  <TabsTrigger value="twitter">X</TabsTrigger>
                </TabsList>

                {/* Instagram preview */}
                <TabsContent value="instagram" className="mt-4">
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">your_account</p>
                        <p className="text-xs text-muted-foreground">
                          Just now
                        </p>
                      </div>
                    </div>

                    <div className="aspect-square bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <p className="text-sm whitespace-pre-wrap">
                      {content || "Your post content will appear here..."}
                    </p>
                  </div>
                </TabsContent>

                {/* Twitter preview */}
                <TabsContent value="twitter" className="mt-4">
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Your Name</p>
                        <p className="text-xs text-muted-foreground">
                          @yourhandle · now
                        </p>
                        <p className="text-sm mt-2 whitespace-pre-wrap">
                          {content || "Your post content will appear here..."}
                        </p>

                        {content && (
                          <div className="mt-3 aspect-video bg-muted rounded flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
