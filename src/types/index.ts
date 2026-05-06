export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  note?: string;
}

export interface Budget {
  monthlyLimit: number;
}

export interface FilterOptions {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
}

export interface Preferences {
  currency: string;
  emailNotifications: boolean;
}

export interface FinanceState {
  transactions: Transaction[];
  categories: Category[];
  budget: Budget;
  goals: Goal[];
  preferences: Preferences;
}
