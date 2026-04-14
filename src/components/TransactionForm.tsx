"use client";

import { useState } from "react";
import { useFinance } from "../hooks/useFinance";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Transaction } from "../types";

export function TransactionForm() {
  const { addTransaction, categories, isHydrated } = useFinance();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!isHydrated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!categoryId) {
      setError('Please select a category.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }

    addTransaction({
      amount: Number(amount),
      type,
      categoryId,
      date,
      note
    });

    // Reset simple form
    setAmount('');
    setNote('');
  };

  const filteredCategories = categories.filter(c => c.type === type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'outline'}
              className={type === 'expense' ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white' : ''}
              onClick={() => { setType('expense'); setCategoryId(''); }}
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              className={type === 'income' ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' : ''}
              onClick={() => { setType('income'); setCategoryId(''); }}
            >
              Income
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (PLN)</label>
            <Input
              type="number"
              step="1.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={categoryId}
              onChange={(val) => setCategoryId(val)}
              options={filteredCategories.map(c => ({ value: c.id, label: c.name }))}
              placeholder="Select category"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Note (Optional)</label>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Groceries"
            />
          </div>

          <Button type="submit" className="w-full">
            Add {type}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
