"use client";

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { TooltipContentProps } from 'recharts';
import { useFinance } from '../hooks/useFinance';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import type { TransactionType } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { cn } from '../utils/utils';

type CategoryPieChartProps = {
  type?: TransactionType;
  title?: string;
  emptyMessage?: string;
  className?: string;
};

type CategoryChartItem = {
  name: string;
  value: number;
  color: string;
};

type CategoryTooltipProps = TooltipContentProps & {
  currency: string;
};

function CategoryTooltip({ active, payload, currency }: CategoryTooltipProps) {
  if (!active || !payload.length) {
    return null;
  }

  const item = payload[0];
  const rawValue = Array.isArray(item.value) ? item.value[0] : item.value;
  const color = item.payload?.color || item.color || '#71717a';

  return (
    <div className="relative z-[9999] min-w-36 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 shadow-xl shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-black/40">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {String(item.name ?? '')}
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold">
        {formatCurrency(Number(rawValue ?? 0), currency)}
      </p>
    </div>
  );
}

export function CategoryPieChart({
  type = 'expense',
  title = 'Expenses by Category',
  emptyMessage = 'No expenses found.',
  className,
}: CategoryPieChartProps) {
  const { transactions, categories, isHydrated, preferences } = useFinance();

  const data = useMemo<CategoryChartItem[]>(() => {
    const filteredTransactions = transactions.filter(t => t.type === type);

    const grouped = filteredTransactions.reduce((acc, tx) => {
      acc[tx.categoryId] = (acc[tx.categoryId] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([categoryId, value]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        name: category?.name || 'Unknown',
        value,
        color: category?.color || '#cbd5e1'
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories, type]);

  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  const topCategories = data.slice(0, 4);

  if (!isHydrated) return <Card className={cn("h-64 animate-pulse", className)}><CardContent /></Card>;

  return (
    <Card className={cn("overflow-visible", className)}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-zinc-500">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative mx-auto h-[230px] w-full max-w-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {data.map((entry, index) => (
                      <linearGradient key={entry.name} id={`gradient-${type}-${index}`} x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.95} />
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.68} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={94}
                    paddingAngle={3}
                    cornerRadius={8}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="var(--background)"
                    strokeWidth={4}
                  >
                    {data.map((entry, index) => (
                      <Cell key={entry.name} fill={`url(#gradient-${type}-${index})`} />
                    ))}
                  </Pie>
                  <Tooltip
                    allowEscapeViewBox={{ x: true, y: true }}
                    content={(props) => (
                      <CategoryTooltip {...props} currency={preferences.currency} />
                    )}
                    wrapperStyle={{ zIndex: 60, outline: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Total
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {formatCurrency(total, preferences.currency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {topCategories.map((entry) => {
                const percentage = Math.round((entry.value / total) * 100);

                return (
                  <div key={entry.name} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="truncate font-medium text-zinc-700 dark:text-zinc-200">
                        {entry.name}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>{percentage}%</span>
                      <span className="text-zinc-300 dark:text-zinc-700">/</span>
                      <span>{formatCurrency(entry.value, preferences.currency)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
