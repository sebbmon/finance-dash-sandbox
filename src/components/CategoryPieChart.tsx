"use client";

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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

export function CategoryPieChart({
  type = 'expense',
  title = 'Expenses by Category',
  emptyMessage = 'No expenses found.',
  className,
}: CategoryPieChartProps) {
  const { transactions, categories, isHydrated, preferences } = useFinance();

  const data = useMemo(() => {
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

  if (!isHydrated) return <Card className={cn("h-64 animate-pulse", className)}><CardContent /></Card>;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-zinc-500">
            {emptyMessage}
          </div>
        ) : (
          <div className="h-[327px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [formatCurrency(Number(value ?? 0), preferences.currency), String(name)]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
