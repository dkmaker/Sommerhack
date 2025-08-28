import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { validateTaskTitle } from '../lib/storage';

interface TodoInputProps {
  onAdd: (title: string, deadline?: string) => void;
  disabled?: boolean;
}

export function TodoInput({ onAdd, disabled }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const titleError = validateTaskTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }

    setError(null);
    onAdd(title.trim(), deadline || undefined);
    setTitle('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Add new task..."
          disabled={disabled}
          aria-invalid={!!error}
        />
        <Button type="submit" disabled={disabled || !title.trim()}>
          Add Task
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Deadline (optional)"
          disabled={disabled}
        />
      </div>

      {error && (
        <p className="text-destructive text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}