"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X } from "lucide-react";
import { Goal } from "../types";
import { cn } from "../utils/utils";

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id'>) => void;
  editingGoal?: Goal;
}

export function GoalFormModal({ isOpen, onClose, onSave, editingGoal }: GoalFormModalProps) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingGoal && isOpen) {
      setTitle(editingGoal.title);
      setTargetAmount(editingGoal.targetAmount.toString());
      setSavedAmount(editingGoal.savedAmount.toString());
      setDeadline(editingGoal.deadline || '');
      setError('');
    } else if (isOpen) {
      setTitle('');
      setTargetAmount('');
      setSavedAmount('');
      setDeadline('');
      setError('');
    }
  }, [editingGoal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }

    const targetParsed = Number(targetAmount);
    if (isNaN(targetParsed) || targetParsed <= 0) {
      setError('Target amount must be greater than 0.');
      return;
    }

    const savedParsed = Number(savedAmount);
    if (savedAmount !== '' && (isNaN(savedParsed) || savedParsed < 0)) {
      setError('Saved amount cannot be negative.');
      return;
    }

    onSave({
      title: title.trim(),
      targetAmount: targetParsed,
      savedAmount: savedParsed || 0,
      deadline: deadline || undefined,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium">Goal Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Car"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Amount</label>
              <Input
                type="number"
                step="1.00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Already Saved</label>
              <Input
                type="number"
                step="1.00"
                value={savedAmount}
                onChange={(e) => setSavedAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deadline (Optional)</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingGoal ? 'Save Changes' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
