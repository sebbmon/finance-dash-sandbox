"use client";

import { useState, useEffect } from "react";
import { useFinance } from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function BudgetSettings() {
  const { budget, updateBudget, totalExpense, isHydrated, preferences } = useFinance();
  const [newLimit, setNewLimit] = useState(budget.monthlyLimit.toString());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewLimit(budget.monthlyLimit.toString());
    }
  }, [budget.monthlyLimit, isHydrated]);

  if (!isHydrated) return <Card className="animate-pulse h-64"><CardContent /></Card>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(newLimit);
    if (!isNaN(parsed) && parsed > 0) {
      updateBudget(parsed);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const percentage = Math.min((totalExpense / budget.monthlyLimit) * 100, 100);
  const isWarning = percentage >= 80;
  const isExceeded = percentage >= 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
        <CardDescription>Set a limit for your monthly expenses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Budget Usage</span>
            <span className="text-sm text-zinc-500 font-medium">
              {formatCurrency(totalExpense, preferences.currency)} / {formatCurrency(budget.monthlyLimit, preferences.currency)}
            </span>
          </div>

          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isExceeded ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-blue-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {isExceeded && (
            <div className="flex items-center text-red-500 mt-2 text-sm font-medium">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Budget exceeded!
            </div>
          )}
          {isWarning && !isExceeded && (
            <div className="flex items-center text-yellow-500 mt-2 text-sm font-medium">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Approaching budget limit.
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Limit ({preferences.currency})</label>
            <div className="flex space-x-2">
              <Input
                type="number"
                step="1.00"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
              />
              <Button type="submit">Update</Button>
            </div>
          </div>
          {isSaved && (
            <div className="flex items-center text-green-500 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              Budget saved!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
