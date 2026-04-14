import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Transaction, Category, Budget, FilterOptions, Goal } from '../types';
import { defaultCategories, mockTransactions, defaultGoals } from '../utils/mockData';

export function useFinance() {
  const [transactions, setTransactions, isHydrated] = useLocalStorage<Transaction[]>(
    'dashboard_transactions',
    mockTransactions
  );

  const [categories, setCategories] = useLocalStorage<Category[]>(
    'dashboard_categories',
    defaultCategories
  );

  const [budget, setBudget] = useLocalStorage<Budget>(
    'dashboard_budget',
    { monthlyLimit: 3000 }
  );

  const [goals, setGoals] = useLocalStorage<Goal[]>(
    'dashboard_goals',
    defaultGoals || []
  );

  // computations

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [currentMonthTransactions]);

  const totalExpense = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [currentMonthTransactions]);

  const currentBalance = totalIncome - totalExpense;

  // actions

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...t,
      // simple id generation
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const editTransaction = (t: Transaction) => {
    setTransactions(prev => prev.map(item => item.id === t.id ? t : item));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addCategory = (c: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...c,
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateBudget = (amount: number) => {
    setBudget({ monthlyLimit: amount });
  };

  const addGoal = (g: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...g,
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const editGoal = (g: Goal) => {
    setGoals(prev => prev.map(item => item.id === g.id ? g : item));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(item => item.id !== id));
  };

  // filtering

  const getFilteredTransactions = (options: FilterOptions) => {
    return transactions.filter(t => {
      let matches = true;
      if (options.type && t.type !== options.type) matches = false;
      if (options.categoryId && t.categoryId !== options.categoryId) matches = false;
      if (options.startDate && new Date(t.date) < new Date(options.startDate)) matches = false;
      if (options.endDate && new Date(t.date) > new Date(options.endDate)) matches = false;
      return matches;
    });
  };

  return {
    transactions,
    categories,
    budget,
    goals,
    isHydrated,

    // calculated values for current month
    totalIncome,
    totalExpense,
    currentBalance,

    // methods
    addTransaction,
    editTransaction,
    deleteTransaction,
    addCategory,
    updateBudget,
    getFilteredTransactions,
    addGoal,
    editGoal,
    deleteGoal
  };
}
