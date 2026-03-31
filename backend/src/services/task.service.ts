import prisma from '../client.js';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: { position: 'asc' },
  });
};

export const createTask = async (title: string, dueDate?: string) => {
  const lastTask = await prisma.task.findFirst({
    orderBy: { position: 'desc' },
  });
  
  const newPosition = lastTask ? lastTask.position + 1000 : 1000;

  return await prisma.task.create({
    data: { 
      title, 
      position: newPosition,
      status: 'TODO',
      subtasks: [],
      dueDate: dueDate ? new Date(dueDate) : null
    },
  });
};


export const updateTask = async (id: string, data: any) => {

  return await prisma.task.update({
    where: { id },
    data: {
      ...data,
     
    },
  });
};

export const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: { id },
  });
};