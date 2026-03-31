import type { Request, Response } from 'express';
import * as TaskService from '../services/task.service.js';

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const task = await TaskService.createTask(title, dueDate);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    // req.body sekarang bisa berisi title, status, position, atau subtasks
    const updatedTask = await TaskService.updateTask(id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await TaskService.deleteTask(id);
    // 204 No Content adalah status yang tepat untuk delete sukses
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};