"use client";

import "../../styles/enhanced-sidebar.css";
import EnhancedSidebar from "../../components/ui/enhanced-sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <EnhancedSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
