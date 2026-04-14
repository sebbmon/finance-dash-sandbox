"use client";

import { useState } from "react";
import { useFinance } from "../hooks/useFinance";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";

const COLOR_OPTIONS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
];

export function CategoriesManager() {
  const { categories, addCategory, isHydrated } = useFinance();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [error, setError] = useState('');

  if (!isHydrated) return <Card className="animate-pulse h-64"><CardContent /></Card>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a category name.');
      return;
    }

    addCategory({
      name: name.trim(),
      type,
      color,
    });

    setName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
        <CardDescription>Add new categories for your transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'outline'}
              className={type === 'expense' ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white' : ''}
              onClick={() => setType('expense')}
            >
              Expense Category
            </Button>
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              className={type === 'income' ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' : ''}
              onClick={() => setType('income')}
            >
              Income Category
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Travel"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === opt.value ? 'border-zinc-950 dark:border-white scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.name}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h4 className="text-sm font-medium mb-3">Current Categories</h4>
          <div className="flex flex-wrap gap-2 text-sm">
            {categories.map(c => (
              <Badge key={c.id} variant="outline" style={{ color: c.color, borderColor: c.color }}>
                {c.name} {c.type === 'income' ? '(Inc)' : '(Exp)'}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
