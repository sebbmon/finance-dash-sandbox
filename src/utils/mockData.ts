import { Category, Transaction, Goal } from '../types';

export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Food', type: 'expense', color: '#ef4444' }, // red-500
  { id: 'cat-2', name: 'Transport', type: 'expense', color: '#3b82f6' }, // blue-500
  { id: 'cat-3', name: 'Bills', type: 'expense', color: '#eab308' }, // yellow-500
  { id: 'cat-4', name: 'Entertainment', type: 'expense', color: '#a855f7' }, // purple-500
  { id: 'cat-5', name: 'Salary', type: 'income', color: '#22c55e' }, // green-500
  { id: 'cat-6', name: 'Other', type: 'expense', color: '#6b7280' }, // gray-500
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    amount: 5000,
    type: 'income',
    categoryId: 'cat-5',
    date: new Date(new Date().setDate(2)).toISOString().split('T')[0],
    note: 'Monthly salary',
  },
  {
    id: 'tx-2',
    amount: 120,
    type: 'expense',
    categoryId: 'cat-1',
    date: new Date(new Date().setDate(5)).toISOString().split('T')[0],
    note: 'Groceries',
  },
  {
    id: 'tx-3',
    amount: 50,
    type: 'expense',
    categoryId: 'cat-2',
    date: new Date(new Date().setDate(8)).toISOString().split('T')[0],
    note: 'Gas',
  },
  {
    id: 'tx-4',
    amount: 400,
    type: 'expense',
    categoryId: 'cat-3',
    date: new Date(new Date().setDate(10)).toISOString().split('T')[0],
    note: 'Electricity and Water',
  },
  {
    id: 'tx-5',
    amount: 150,
    type: 'expense',
    categoryId: 'cat-4',
    date: new Date(new Date().setDate(12)).toISOString().split('T')[0],
    note: 'Cinema',
  },
  {
    id: 'tx-6',
    amount: 80,
    type: 'expense',
    categoryId: 'cat-1',
    date: new Date(new Date().setDate(15)).toISOString().split('T')[0],
    note: 'Dinner out',
  },
];

export const defaultGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    savedAmount: 4500,
    deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  }
];
