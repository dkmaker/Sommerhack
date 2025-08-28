import React, { useState, useEffect } from 'react';
import { TodoItem } from './types/todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { saveTasks, loadTasks, generateId, isStorageAvailable } from './lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    // Check if localStorage is available
    const available = isStorageAvailable();
    setStorageAvailable(available);
    
    if (available) {
      // Load existing todos from localStorage
      const savedTodos = loadTasks();
      setTodos(savedTodos);
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (storageAvailable && todos.length > 0) {
      saveTasks(todos);
    }
  }, [todos, storageAvailable]);

  const handleAddTodo = (title: string, deadline?: string) => {
    const newTodo: TodoItem = {
      id: generateId(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
      deadline
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  const handleUpdateTodo = (id: string, updates: { title?: string; completed?: boolean; deadline?: string }) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const overdueCount = todos.filter(todo => 
    todo.deadline && 
    new Date(todo.deadline) < new Date() && 
    !todo.completed
  ).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">TODO List MVP</CardTitle>
            {totalCount > 0 && (
              <div className="text-center text-sm text-muted-foreground space-y-1">
                <p>{completedCount} of {totalCount} tasks completed</p>
                {overdueCount > 0 && (
                  <p className="text-destructive font-medium">
                    {overdueCount} task{overdueCount === 1 ? '' : 's'} overdue
                  </p>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!storageAvailable && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">
                  Local storage is not available. Tasks will not persist after page refresh.
                </p>
              </div>
            )}
            
            <TodoInput 
              onAdd={handleAddTodo}
              disabled={false}
            />
          </CardContent>
        </Card>

        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;