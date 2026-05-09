"use client";

import { usePathname } from "next/navigation";

export const routeDescriptions: Record<string, string> = {
  "/": "Overview of your finances",
  "/transactions": "Manage your income and expenses",
  "/goals": "Set and track your financial goals",
  "/profile": "Manage your profile",
  "/settings": "Manage your preferences",
};

export function PageDescription() {
  const pathname = usePathname();
  const description = routeDescriptions[pathname];

  if (!description) return null;

  return (
    <div className="flex items-center justify-between space-y-2 pb-2">
      <h2 className="text-2xl font-bold tracking-tight">{description}</h2>
    </div>
  );
}
