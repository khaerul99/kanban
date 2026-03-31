import api from '../api/api';
import type { Task } from '../types/task';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/');
    return response.data;
  },

 async createTask(title: string, dueDate?: string): Promise<Task> {
  const response = await api.post<Task>('/', { title, dueDate });
  return response.data;
},

  async updateTask(id: string, payload: Partial<Task>): Promise<Task> {
    const response = await api.patch<Task>(`/${id}`, payload);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/${id}`);
  }
};