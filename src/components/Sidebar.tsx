"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { LayoutDashboard, WalletCards, Settings, Wallet, Goal, User, LogOut } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { cn } from '../utils/utils';

export function Sidebar({ onClose, isMobile }: { onClose?: () => void, isMobile?: boolean }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const displayName = user?.displayName || user?.email || 'User';
  const accountLabel = user?.email || displayName;
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  const links = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: WalletCards },
    { name: 'Goals', href: '/goals', icon: Goal },
    { name: 'Profile', href: '/profile', icon: User },
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

      <div className={cn(
        "mt-auto border-t border-zinc-200 dark:border-zinc-800",
        isMobile ? "px-3 py-3" : "p-3"
      )}>
        <div className="flex items-center gap-3 rounded-lg p-2 text-zinc-900 dark:text-zinc-50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{displayName}</p>
            {accountLabel !== displayName && (
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {accountLabel}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label={`Wyloguj ${displayName}`}
            title="Wyloguj"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            disabled={isSigningOut}
            onClick={async () => {
              setIsSigningOut(true);
              try {
                onClose?.();
                await logout();
              } finally {
                setIsSigningOut(false);
              }
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function getInitials(value: string) {
  const nameParts = value
    .replace(/@.*/, '')
    .split(/\s+/)
    .filter(Boolean);

  if (nameParts.length === 0) {
    return 'U';
  }

  return nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
