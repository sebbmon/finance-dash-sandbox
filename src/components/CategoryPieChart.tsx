"use client";

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '../hooks/useFinance';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function CategoryPieChart() {
  const { transactions, categories, isHydrated } = useFinance();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');

    // grupby category
    const grouped = expenses.reduce((acc, tx) => {
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
    }).sort((a, b) => b.value - a.value); // sortby largest expense
  }, [transactions, categories]);

  if (!isHydrated) return <Card className="col-span-full lg:col-span-3 h-64 animate-pulse"><CardContent /></Card>;

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-zinc-500">
            No expenses found.
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
                  formatter={(value: number, name: string) => [`${Number(value).toFixed(2)} PLN`, name]}
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
