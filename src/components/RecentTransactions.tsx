"use client";

import Link from "next/link";
import { useFinance } from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/utils";

export function RecentTransactions({ className }: { className?: string }) {
  const { transactions, categories, isHydrated, preferences } = useFinance();

  if (!isHydrated) return <Card className={cn("h-64 animate-pulse", className)}><CardContent className="pt-6">Loading...</CardContent></Card>;

  const recent = transactions.slice(0, 6);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <CardTitle>Recent Transactions</CardTitle>
        <Link href="/transactions" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recent.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-4">No transactions found.</p>
          ) : (
            recent.map((tx) => {
              const category = categories.find(c => c.id === tx.categoryId);
              const isIncome = tx.type === 'income';

              return (
                <div key={tx.id} className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500'}`}>
                      {isIncome ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{tx.note || category?.name}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {category && (
                      <Badge variant="outline" className="hidden sm:inline-flex" style={{ color: category.color, borderColor: category.color }}>
                        {category.name}
                      </Badge>
                    )}
                    <div className={`font-semibold ${isIncome ? 'text-green-600 dark:text-green-500' : ''}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amount, preferences.currency)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
