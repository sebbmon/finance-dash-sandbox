"use client";

import { useFinance } from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function DashboardSummary() {
  const { totalIncome, totalExpense, currentBalance, isHydrated } = useFinance();

  if (!isHydrated) return <div className="grid gap-4 grid-cols-1 md:grid-cols-3 h-32 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl" />;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <Wallet className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentBalance)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-500">
            {formatCurrency(totalIncome)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-500">
            {formatCurrency(totalExpense)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
