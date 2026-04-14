"use client";

import { useState } from "react";
import { useFinance } from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Trash2, Edit2, X, Check } from "lucide-react";
import { Transaction } from "../types";

export function TransactionsTable() {
  const { transactions, categories, deleteTransaction, editTransaction, isHydrated } = useFinance();
  
  // Filters state
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});
  
  if (!isHydrated) return <Card className="animate-pulse h-[400px]"><CardContent /></Card>;

  // Apply filters
  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterCategory !== 'all' && t.categoryId !== filterCategory) return false;
    if (filterStartDate && new Date(t.date) < new Date(filterStartDate)) return false;
    if (filterEndDate && new Date(t.date) > new Date(filterEndDate)) return false;
    return true;
  });

  const handleEditClick = (tx: Transaction) => {
    setEditingId(tx.id);
    setEditForm(tx);
  };

  const handleSaveEdit = () => {
    if (editForm.id && editForm.amount && editForm.categoryId && editForm.date) {
      editTransaction(editForm as Transaction);
      setEditingId(null);
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-col items-start gap-4">
        <CardTitle>All Transactions</CardTitle>
        <div className="flex flex-wrap gap-4 w-full">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[120px] max-w-sm">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</label>
            <Select
              value={filterType}
              onChange={setFilterType}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' }
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px] max-w-sm">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</label>
            <Select
              value={filterCategory}
              onChange={setFilterCategory}
              disabled={categories.length === 0}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categories.map(c => ({ value: c.id, label: c.name }))
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">From Date</label>
            <Input 
               type="date" 
               className="w-full" 
               value={filterStartDate}
               onChange={(e) => setFilterStartDate(e.target.value)}
               title="Start Date"
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">To Date</label>
            <Input 
               type="date" 
               className="w-full" 
               value={filterEndDate}
               onChange={(e) => setFilterEndDate(e.target.value)}
               title="End Date"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500">Date</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500">Note</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500">Category</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-zinc-500">Amount</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-zinc-500 text-sm">No transactions found matching your filters.</td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const category = categories.find(c => c.id === tx.categoryId);
                  const isIncome = tx.type === 'income';
                  
                  if (editingId === tx.id) {
                    return (
                      <tr key={tx.id} className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 h-16">
                        <td className="px-2 h-16 align-middle"><Input type="date" value={editForm.date || ''} onChange={e => setEditForm({...editForm, date: e.target.value})} className="h-9 text-xs px-2" /></td>
                        <td className="px-2 h-16 align-middle"><Input type="text" value={editForm.note || ''} onChange={e => setEditForm({...editForm, note: e.target.value})} className="h-9 text-xs px-2" placeholder="Note" /></td>
                        <td className="px-2 h-16 align-middle min-w-[140px]">
                           <Select 
                              value={editForm.categoryId || ''} 
                              onChange={val => setEditForm({...editForm, categoryId: val})}
                              options={categories.map(c => ({ value: c.id, label: c.name }))}
                           />
                        </td>
                        <td className="px-2 h-16 align-middle"><Input type="number" step="0.01" value={editForm.amount || ''} onChange={e => setEditForm({...editForm, amount: Number(e.target.value)})} className="h-9 text-xs px-2 text-right" /></td>
                        <td className="px-2 h-16 align-middle text-right space-x-1">
                          <Button variant="ghost" size="icon" onClick={handleSaveEdit} className="h-9 w-9 text-green-600">
                             <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingId(null)} className="h-9 w-9 text-zinc-500">
                             <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  }

                  return (
                    <tr key={tx.id} className="border-b border-zinc-200 dark:border-zinc-800 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 last:border-0 group h-16">
                      <td className="px-4 h-16 align-middle whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="px-4 h-16 align-middle font-medium">{tx.note || '-'}</td>
                      <td className="px-4 h-16 align-middle">
                        {category ? (
                          <Badge variant="outline" style={{ color: category.color, borderColor: category.color}}>
                            {category.name}
                          </Badge>
                        ) : '-'}
                      </td>
                      <td className={`px-4 h-16 align-middle text-right font-semibold whitespace-nowrap ${isIncome ? 'text-green-600 dark:text-green-500' : ''}`}>
                        {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      <td className="px-4 h-16 align-middle text-right whitespace-nowrap space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditClick(tx)}
                          className="h-8 w-8 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          title="Edit transaction"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteTransaction(tx.id)}
                          className="h-8 w-8 text-zinc-500 hover:text-red-600 dark:hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          title="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
