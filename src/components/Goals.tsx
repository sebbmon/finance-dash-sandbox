"use client";

import { useState } from "react";
import { useFinance } from "../hooks/useFinance";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { GoalFormModal } from "./GoalFormModal";
import { PageDescription } from "./PageDescription";
import { Plus, Edit2, Trash2, Target, Calendar, TrendingUp } from "lucide-react";
import { Goal } from "../types";

export function Goals() {
  const { goals, addGoal, editGoal, deleteGoal, isHydrated, preferences } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>();



  const handleOpenAdd = () => {
    setEditingGoal(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSaveGoal = (goalData: Omit<Goal, 'id'>) => {
    if (editingGoal) {
      editGoal({ ...goalData, id: editingGoal.id });
    } else {
      addGoal(goalData);
    }
  };

  // sort by percentage complete descending
  const sortedGoals = [...goals].sort((a, b) => {
    const pctA = a.targetAmount > 0 ? a.savedAmount / a.targetAmount : 0;
    const pctB = b.targetAmount > 0 ? b.savedAmount / b.targetAmount : 0;
    return pctB - pctA;
  });

  return (
    <div className="space-y-6">
      <PageDescription>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Add New Goal
        </Button>
      </PageDescription>

      {!isHydrated ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <Card key={i} className="animate-pulse h-48"><CardContent /></Card>)}
        </div>
      ) : sortedGoals.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No financial goals set yet. Start planning out your future!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedGoals.map(goal => {
            const percentage = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
            const remainingAmt = Math.max(goal.targetAmount - goal.savedAmount, 0);

            // color logic: < 50% red, 50-80% yellow, > 80% green
            let barColor = "bg-red-500";
            if (percentage >= 100) barColor = "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]";
            else if (percentage >= 80) barColor = "bg-green-500";
            else if (percentage >= 50) barColor = "bg-yellow-500";

            return (
              <Card key={goal.id} className="relative group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-none truncate pr-4" title={goal.title}>{goal.title}</h3>
                      {goal.deadline ? (
                        <div className="flex items-center text-xs text-zinc-500 font-medium pt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-zinc-500 font-medium pt-1">
                          No deadline
                        </div>
                      )}
                    </div>
                    {/* Hover Actions */}
                    <div className="flex space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm rounded-md absolute top-4 right-4 p-1 shadow-sm border border-zinc-200 dark:border-zinc-800">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30" onClick={() => handleOpenEdit(goal)} title="Edit or Add Funds">
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30" onClick={() => deleteGoal(goal.id)} title="Delete Goal">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold tracking-tight">
                        {formatCurrency(goal.savedAmount, preferences.currency)}
                      </div>
                      <div className="text-sm font-medium text-zinc-500">
                        / {formatCurrency(goal.targetAmount, preferences.currency)}
                      </div>
                    </div>

                    <div className="relative h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden" title={`${percentage.toFixed(1)}% completed`}>
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${barColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      <span>{percentage.toFixed(0)}% Completed</span>
                      {remainingAmt > 0 ? (
                        <span className="flex items-center text-zinc-400"><TrendingUp className="w-3 h-3 mr-1" /> {formatCurrency(remainingAmt, preferences.currency)} Left</span>
                      ) : (
                        <span className="text-green-500">Goal Reached!</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <GoalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
      />
    </div>
  );
}
