"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative bg-zinc-100 dark:bg-zinc-950 min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 md:relative">
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full min-h-screen overflow-hidden relative">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute top-14 left-0 w-full z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg transition-all duration-200 origin-top ${isSidebarOpen
              ? "opacity-100 translate-y-0 visible pointer-events-auto"
              : "opacity-0 -translate-y-2 invisible pointer-events-none"
            }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} isMobile />
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
