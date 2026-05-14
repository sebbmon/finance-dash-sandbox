import { Category, Transaction, Goal } from '../types';

export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Food', type: 'expense', color: '#ef4444' }, // red-500
  { id: 'cat-2', name: 'Transport', type: 'expense', color: '#3b82f6' }, // blue-500
  { id: 'cat-3', name: 'Bills', type: 'expense', color: '#eab308' }, // yellow-500
  { id: 'cat-4', name: 'Entertainment', type: 'expense', color: '#a855f7' }, // purple-500
  { id: 'cat-5', name: 'Salary', type: 'income', color: '#22c55e' }, // green-500
  { id: 'cat-6', name: 'Other', type: 'expense', color: '#6b7280' }, // gray-500
];

const getPastDate = (monthsAgo: number, day: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  d.setDate(day);
  return d.toISOString().split('T')[0];
};

export const mockTransactions: Transaction[] = [];

for (let i = 11; i >= 0; i--) {
  // Monthly salary
  mockTransactions.push({
    id: `tx-salary-${i}`,
    amount: 5000 + Math.floor(Math.random() * 500),
    type: 'income',
    categoryId: 'cat-5',
    date: getPastDate(i, 2),
    note: 'Monthly salary',
  });

  // Groceries
  mockTransactions.push({
    id: `tx-food1-${i}`,
    amount: 400 + Math.floor(Math.random() * 200),
    type: 'expense',
    categoryId: 'cat-1',
    date: getPastDate(i, 5),
    note: 'Groceries',
  });

  // Transport
  mockTransactions.push({
    id: `tx-transport-${i}`,
    amount: 150 + Math.floor(Math.random() * 50),
    type: 'expense',
    categoryId: 'cat-2',
    date: getPastDate(i, 8),
    note: 'Gas',
  });

  // Bills
  mockTransactions.push({
    id: `tx-bills-${i}`,
    amount: 600 + Math.floor(Math.random() * 100),
    type: 'expense',
    categoryId: 'cat-3',
    date: getPastDate(i, 10),
    note: 'Electricity & Utilities',
  });

  // Entertainment
  mockTransactions.push({
    id: `tx-ent-${i}`,
    amount: 200 + Math.floor(Math.random() * 200),
    type: 'expense',
    categoryId: 'cat-4',
    date: getPastDate(i, 15),
    note: 'Cinema & Dining out',
  });

  // Additional Groceries later in the month
  mockTransactions.push({
    id: `tx-food2-${i}`,
    amount: 300 + Math.floor(Math.random() * 150),
    type: 'expense',
    categoryId: 'cat-1',
    date: getPastDate(i, 20),
    note: 'Supermarket',
  });

  // Random occasional expense
  if (Math.random() > 0.4) {
    mockTransactions.push({
      id: `tx-other-${i}`,
      amount: 150 + Math.floor(Math.random() * 300),
      type: 'expense',
      categoryId: 'cat-6',
      date: getPastDate(i, 25),
      note: 'Shopping / Other',
    });
  }
}

export const defaultGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    savedAmount: 4500,
    deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  },
  {
    id: 'goal-2',
    title: 'BMW M5',
    targetAmount: 600000,
    savedAmount: 90000,
    deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  },
  {
    id: 'goal-3',
    title: 'Apartment',
    targetAmount: 1000000,
    savedAmount: 790000,
    deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  },
  {
    id: 'goal-4',
    title: 'Computer',
    targetAmount: 10000,
    savedAmount: 9800,
    deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  },
];
