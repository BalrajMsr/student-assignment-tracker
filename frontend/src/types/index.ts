export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignment {
  _id: string;
  title: string;
  subject: string;
  dueDate: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority?: 'Low' | 'Medium' | 'High';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

