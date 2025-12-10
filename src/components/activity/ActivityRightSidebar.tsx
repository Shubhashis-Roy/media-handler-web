"use client";

import { MessageSquare, Calendar, FileText, Zap, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

export default function ActivityRightSidebar() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="border-[var(--color-border)] shadow-sm bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white border-none relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 relative z-10">
            <Zap className="w-5 h-5" /> Productivity Pulse
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs opacity-80">Tasks Done</div>
            </div>

            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs opacity-80">Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming */}
      <Card className="border-[var(--color-border)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Upcoming
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
              <Plus size={14} />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Item */}
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-muted)] rounded-lg cursor-pointer">
              <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Q4 Review</p>
                <p className="text-xs text-[var(--color-text-muted)]">Tomorrow at 2:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-muted)] rounded-lg cursor-pointer">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <FileText size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Contract Sign</p>
                <p className="text-xs text-[var(--color-text-muted)]">Nov 12, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Online */}
      <Card className="border-[var(--color-border)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
            Team Online
            <Badge
              variant="secondary"
              className="text-[10px] bg-green-100 text-green-700 hover:bg-green-200"
            >
              3 Active
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {["Sarah Wilson", "Mike Ross", "David Chen"].map((name) => (
              <div key={name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-[var(--color-surface)]">
                      <AvatarFallback className="bg-[var(--color-surface-muted)] text-xs">
                        {name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="text-sm font-medium">{name}</span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-50 hover:opacity-100 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                  onClick={() => toast({ title: `Started chat with ${name}` })}
                >
                  <MessageSquare size={14} />
                </Button>
              </div>
            ))}

            <Button variant="outline" className="w-full text-xs mt-2" size="sm">
              View all team members
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
