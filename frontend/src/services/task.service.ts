import api from '../api/api';
import type { Task } from '../types/task';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

 async createTask(title: string, dueDate?: string): Promise<Task> {
  const response = await api.post<Task>('/tasks', { title, dueDate });
  return response.data;
},

  async updateTask(id: string, payload: Partial<Task>): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};