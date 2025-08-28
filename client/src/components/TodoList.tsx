import React from 'react';
import { TodoItem as TodoItemType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: TodoItemType[];
  onUpdate: (id: string, updates: { title?: string; completed?: boolean; deadline?: string }) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  // Sort todos: incomplete first, then by deadline, then by creation date
  const sortedTodos = [...todos].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by deadline if present
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    
    // Sort by creation date (newest first)
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}