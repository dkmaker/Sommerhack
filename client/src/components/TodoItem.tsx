import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { TodoItem as TodoItemType } from '../types/todo';
import { validateTaskTitle } from '../lib/storage';
import { Trash2, Edit, Save, X, Calendar } from 'lucide-react';

interface TodoItemProps {
  todo: TodoItemType;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean; deadline?: string }) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const titleError = validateTaskTitle(editTitle);
    if (titleError) {
      setError(titleError);
      return;
    }

    setError(null);
    onUpdate(todo.id, { 
      title: editTitle.trim(),
      deadline: editDeadline || undefined
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDeadline(todo.deadline || '');
    setError(null);
    setIsEditing(false);
  };

  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date() && !todo.completed;
  const deadlineText = todo.deadline ? new Date(todo.deadline).toLocaleDateString() : null;

  return (
    <Card className={`transition-all ${todo.completed ? 'opacity-75' : ''} ${isOverdue ? 'border-destructive' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Switch
            checked={todo.completed}
            onCheckedChange={(checked) => onUpdate(todo.id, { completed: checked })}
            aria-label="Toggle task completion"
          />
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={!!error}
                />
                <Input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  placeholder="Deadline (optional)"
                />
                {error && (
                  <p className="text-destructive text-sm" role="alert">
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <span className={`block ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.title}
                </span>
                {deadlineText && (
                  <div className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{deadlineText}</span>
                    {isOverdue && <span className="text-destructive font-medium">(Overdue)</span>}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editTitle.trim()}
                >
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(todo.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}