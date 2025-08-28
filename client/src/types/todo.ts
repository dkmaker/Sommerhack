export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  deadline?: string;
}

export interface CreateTodoRequest {
  title: string;
  deadline?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
  deadline?: string;
}

export interface TodoResponse {
  success: boolean;
  data?: TodoItem | TodoItem[];
  message?: string;
}