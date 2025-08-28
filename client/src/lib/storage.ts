import { TodoItem } from '../types/todo';

const STORAGE_KEY = "TODO_APP_TASKS";

export function saveTasks(tasks: TodoItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
    // Handle storage quota exceeded or disabled localStorage
  }
}

export function loadTasks(): TodoItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    
    // Validate structure
    return parsed.filter(item => 
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.completed === 'boolean' &&
      typeof item.createdAt === 'number'
    );
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
}

export function validateTaskTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return "Task title is required";
  if (trimmed.length > 200) return "Task title too long (max 200 characters)";
  return null;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function isStorageAvailable(): boolean {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch {
    return false;
  }
}