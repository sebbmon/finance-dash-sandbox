"use client";

import { useMemo, useState } from "react";
import { useFinance } from "../hooks/useFinance";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { Select } from "./ui/Select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function SavingsTrendChart() {
  const { transactions, isHydrated, preferences } = useFinance();
  const [viewType, setViewType] = useState<"cumulative" | "monthly">("cumulative");

  const data = useMemo(() => {
    // Sort transactions by date ascending
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Group by month-year
    const monthlyData: Record<string, { income: number; expense: number; date: Date }> = {};

    sortedTx.forEach((tx) => {
      const date = new Date(tx.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0, date };
      }
      if (tx.type === "income") monthlyData[monthYear].income += tx.amount;
      if (tx.type === "expense") monthlyData[monthYear].expense += tx.amount;
    });

    const result = [];
    let cumulativeBalance = 0;

    const sortedMonths = Object.keys(monthlyData).sort();

    for (const month of sortedMonths) {
      const { income, expense, date } = monthlyData[month];
      const monthlyNet = income - expense;
      cumulativeBalance += monthlyNet;

      result.push({
        month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        monthly: monthlyNet,
        cumulative: cumulativeBalance,
      });
    }

    return result;
  }, [transactions]);

  if (!isHydrated) return <Card className="w-full h-96 animate-pulse bg-zinc-100 dark:bg-zinc-800" />;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Savings Trend</CardTitle>
          <CardDescription>How your savings grow overtime</CardDescription>
        </div>
        <div className="w-36">
          <Select
            value={viewType}
            onChange={(val) => setViewType(val as "cumulative" | "monthly")}
            options={[
              { value: "cumulative", label: "Cumulative" },
              { value: "monthly", label: "Monthly" },
            ]}
          />
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-zinc-500">
            No savings data available yet.
          </div>
        ) : (
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#71717a" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#71717a" }}
                  tickFormatter={(value) => `${value}`}
                  dx={-10}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value ?? 0).toFixed(2)} ${preferences.currency}`,
                    viewType === "cumulative" ? "Cumulative Balance" : "Monthly Net",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: "var(--bg-card, white)",
                  }}
                  itemStyle={{ color: "#3b82f6" }}
                  labelStyle={{ color: "#09090b", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey={viewType}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
