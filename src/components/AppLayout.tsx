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
      <div className="flex flex-col flex-1 w-full min-h-screen overflow-hidden">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Mobile Dropdown Menu */}
        {isSidebarOpen && (
           <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 w-full animate-in slide-in-from-top-2 duration-200">
             <Sidebar onClose={() => setIsSidebarOpen(false)} isMobile />
           </div>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
