"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import "../../../styles/dashboard.css";
import "../../../styles/dashboard-enhanced.css";
import { motion } from "framer-motion";
import {
  Calendar,
  ImageIcon,
  PlusSquare,
  Link as LinkIcon,
  Clock,
  Image as ImageIcon2,
  Video,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

// Mock data
const upcomingPosts = [
  {
    id: "1",
    content: "Check out our new product launch!",
    scheduledFor: "2024-01-20 14:00",
    platforms: ["instagram", "facebook"],
    type: "image",
  },
  {
    id: "2",
    content: "Behind the scenes of our creative process",
    scheduledFor: "2024-01-21 10:00",
    platforms: ["twitter", "linkedin"],
    type: "video",
  },
  {
    id: "3",
    content: "Weekly roundup and highlights",
    scheduledFor: "2024-01-22 16:00",
    platforms: ["instagram", "twitter"],
    type: "carousel",
  },
];

const recentMedia = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    type: "image",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400",
    type: "image",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400",
    type: "image",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400",
    type: "image",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
    type: "image",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400",
    type: "image",
  },
];

const platformColors = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-blue-600",
  twitter: "bg-black",
  linkedin: "bg-blue-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          {"Welcome back! Here's what's happening."}
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="quick-actions-header">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="quick-actions-enhanced">
              <Link href="/media" className="quick-action-card-enhanced">
                <div className="quick-action-icon-enhanced">
                  <ImageIcon />
                </div>
                <div className="quick-action-title-enhanced">Upload Media</div>
                <div className="quick-action-subtitle-enhanced">Add images & videos</div>
              </Link>
              <Link href="/create-post" className="quick-action-card-enhanced">
                <div className="quick-action-icon-enhanced">
                  <PlusSquare />
                </div>
                <div className="quick-action-title-enhanced">Create Post</div>
                <div className="quick-action-subtitle-enhanced">Compose content</div>
              </Link>
              <Link href="/accounts" className="quick-action-card-enhanced">
                <div className="quick-action-icon-enhanced">
                  <LinkIcon />
                </div>
                <div className="quick-action-title-enhanced">Connect Account</div>
                <div className="quick-action-subtitle-enhanced">Link profiles</div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="upcoming-posts-enhanced">
                {upcomingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="upcoming-post-enhanced"
                    data-testid={`card-upcoming-post-${post.id}`}
                  >
                    <div className="post-header-enhanced">
                      <div className="post-type-icon-enhanced">
                        {post.type === 'image' && <ImageIcon2 />}
                        {post.type === 'video' && <Video />}
                        {post.type === 'carousel' && <Layers />}
                      </div>
                      <div className="post-content-enhanced">
                        <h3 className="post-title-enhanced">{post.content}</h3>
                        <p className="post-timestamp-enhanced">
                          <Clock className="w-3 h-3" />
                          {post.scheduledFor}
                        </p>
                      </div>
                    </div>
                    <div className="post-footer-enhanced">
                      <div className="post-platforms-enhanced">
                        {post.platforms.map((platform) => (
                          <div
                            key={platform}
                            className={`platform-dot-enhanced ${
                              platformColors[
                                platform as keyof typeof platformColors
                              ]
                            }`}
                          />
                        ))}
                      </div>
                      <div className="post-status-enhanced">
                        <div className="status-dot-enhanced" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/scheduled">
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  data-testid="button-view-all-scheduled"
                >
                  View All Scheduled Posts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Recent Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="media-grid-enhanced">
                {recentMedia.map((media, index) => (
                  <motion.div
                    key={media.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="media-tile-enhanced"
                    data-testid={`media-thumbnail-${media.id}`}
                  >
                    <img
                      src={media.url}
                      alt={`Media ${media.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="media-selection-overlay">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/media">
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  data-testid="button-view-all-media"
                >
                  View All Media
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
