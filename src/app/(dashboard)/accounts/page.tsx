"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

import { SiInstagram, SiFacebook, SiX, SiLinkedin } from "react-icons/si";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

// -----------------------------------
// SOCIAL ACCOUNTS MOCK DATA
// -----------------------------------
const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: SiInstagram,
    connected: true,
    accountName: "@your_brand",
    lastSynced: "2 hours ago",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: SiFacebook,
    connected: true,
    accountName: "Your Brand Page",
    lastSynced: "5 hours ago",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: SiX,
    connected: false,
    accountName: null,
    lastSynced: null,
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: SiLinkedin,
    connected: true,
    accountName: "Your Company",
    lastSynced: "1 day ago",
    color: "from-blue-600 to-blue-800",
  },
];

// -----------------------------------
// PAGE COMPONENT
// -----------------------------------
export default function Accounts() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Social Accounts</h1>
        <p className="text-muted-foreground">
          Connect and manage your social media accounts
        </p>
      </motion.div>

      {/* SOCIAL ACCOUNTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;

          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {/* LEFT: ICON + TEXT */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${platform.color}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      <div>
                        <CardTitle className="text-xl">
                          {platform.name}
                        </CardTitle>

                        {platform.connected && platform.accountName && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {platform.accountName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* RIGHT: STATUS BADGE */}
                    {platform.connected ? (
                      <Badge className="gap-1 bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <XCircle className="h-3 w-3" />
                        Not Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* If Connected */}
                  {platform.connected ? (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Last synced:
                        </span>
                        <span>{platform.lastSynced}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Reconnect
                        </Button>

                        <Button variant="destructive">Disconnect</Button>
                      </div>
                    </>
                  ) : (
                    /* Not connected */
                    <Button className="w-full">Connect {platform.name}</Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* HELP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Need Help Connecting?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Each platform requires authorization to post on your behalf. Click
              the connect button to authorize access through the platform`s
              secure OAuth flow.
            </p>

            <Button variant="outline" size="sm">
              View Documentation
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
