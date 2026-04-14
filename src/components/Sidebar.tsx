"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, WalletCards, Settings, Wallet, Goal } from 'lucide-react';
import { cn } from '../utils/utils';

export function Sidebar({ onClose, isMobile }: { onClose?: () => void, isMobile?: boolean }) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: WalletCards },
    { name: 'Goals', href: '/goals', icon: Goal },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "bg-white dark:bg-zinc-950 transition-all flex flex-col",
      isMobile ? "w-full border-0" : "w-64 border-r border-zinc-200 dark:border-zinc-800 min-h-screen"
    )}>
      {!isMobile && (
        <div className="flex h-14 shrink-0 items-center px-5 border-b border-transparent">
          <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
            <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">FinanceDash</span>
          </Link>
        </div>
      )}

      <div className={cn("px-3 flex-1 overflow-y-auto", isMobile ? "py-2" : "py-4")}>
        <ul className="space-y-2 font-medium">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center p-2 rounded-lg transition-colors group",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400"
                      : "text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
