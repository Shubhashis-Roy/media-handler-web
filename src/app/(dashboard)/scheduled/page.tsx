"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";

import { Edit, Trash2, Clock } from "lucide-react";

import { SiInstagram, SiFacebook, SiX, SiLinkedin } from "react-icons/si";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: (typeof mockPosts)[number];
};

const mockPosts = [
  {
    id: "1",
    title: "Product Launch Announcement",
    content:
      "Excited to announce our new product launch! Stay tuned for more details.",
    platforms: ["instagram", "facebook"],
    status: "scheduled",
    scheduledFor: new Date(2024, 0, 25, 14, 0),
  },
  {
    id: "2",
    title: "Weekly Tips",
    content: "This week's productivity tips for social media managers...",
    platforms: ["twitter", "linkedin"],
    status: "scheduled",
    scheduledFor: new Date(2024, 0, 26, 10, 0),
  },
  {
    id: "3",
    title: "Behind the Scenes",
    content: "Get a sneak peek into our creative process!",
    platforms: ["instagram"],
    status: "scheduled",
    scheduledFor: new Date(2024, 0, 27, 16, 0),
  },
];

const platformIcons: Record<string, any> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  twitter: SiX,
  linkedin: SiLinkedin,
};

const platformColors: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  twitter: "#000000",
  linkedin: "#0A66C2",
};

// -----------------------------------------------------
// Localizer Setup
// -----------------------------------------------------
const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// -----------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------
export default function Scheduled() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"calendar" | "list">("calendar");

  const events = mockPosts.map((post) => ({
    id: post.id,
    title: post.title,
    start: post.scheduledFor,
    end: post.scheduledFor,
    resource: post,
  }));

  const currentPost = mockPosts.find((p) => p.id === selectedPost);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Scheduled Posts</h1>
        <p className="text-muted-foreground">
          Manage and view your scheduled content
        </p>
      </motion.div>

      {/* TABS */}
      <Tabs
        value={viewType}
        onValueChange={(v) => setViewType(v as any)}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* -----------------------------------------------------
           CALENDAR VIEW
        ----------------------------------------------------- */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="h-[600px]">
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  views={["month", "week", "day"]}
                  defaultView="month"
                  onSelectEvent={(event: CalendarEvent) =>
                    setSelectedPost(event.id)
                  }
                  eventPropGetter={(event: CalendarEvent) => {
                    const platform = event.resource.platforms[0];
                    return {
                      style: {
                        backgroundColor: platformColors[platform] || "#3174ad",
                        opacity: 0.85,
                        borderRadius: "4px",
                        border: "none",
                      },
                    };
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* -----------------------------------------------------
           LIST VIEW
        ----------------------------------------------------- */}
        <TabsContent value="list" className="mt-6 space-y-4">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className="hover-elevate cursor-pointer"
                onClick={() => setSelectedPost(post.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center gap-3">
                        {post.title}
                        <Badge variant="secondary">{post.status}</Badge>
                      </h3>

                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{format(post.scheduledFor, "PPP p")}</span>
                        </div>

                        {/* Platforms */}
                        <div className="flex items-center gap-2">
                          {post.platforms.map((p) => {
                            const Icon = platformIcons[p];
                            return (
                              <Icon
                                key={p}
                                className="h-4 w-4"
                                style={{ color: platformColors[p] }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* -----------------------------------------------------
         POST DETAILS SLIDE PANEL (SHEET)
      ----------------------------------------------------- */}
      <Sheet
        open={selectedPost !== null}
        onOpenChange={() => setSelectedPost(null)}
      >
        <SheetContent className="w-full sm:max-w-lg">
          {currentPost && (
            <>
              <SheetHeader>
                <SheetTitle>{currentPost.title}</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Content */}
                <div>
                  <h4 className="font-semibold mb-2">Content</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {currentPost.content}
                  </p>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="font-semibold mb-2">Platforms</h4>
                  <div className="flex gap-2">
                    {currentPost.platforms.map((p) => {
                      const Icon = platformIcons[p];
                      return (
                        <Badge
                          key={p}
                          variant="outline"
                          className="gap-2 capitalize"
                        >
                          <Icon
                            className="h-3 w-3"
                            style={{ color: platformColors[p] }}
                          />
                          {p}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Scheduled Time */}
                <div>
                  <h4 className="font-semibold mb-2">Scheduled For</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{format(currentPost.scheduledFor, "PPP p")}</span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <Badge>{currentPost.status}</Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>

                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" /> Reschedule
                  </Button>

                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
