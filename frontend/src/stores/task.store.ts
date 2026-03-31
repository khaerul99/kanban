import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { taskService } from '../services/task.service'; 
import type { Task, SubTask } from '../types/task';
import Swal from 'sweetalert2';

export const useTaskStore = defineStore('task', () => {

  const tasks = ref<Task[]>([]);
  const isLoading = ref(false);

  const todoTasks = computed(() => tasks.value.filter(t => t.status === 'TODO'));
  const inProgressTasks = computed(() => tasks.value.filter(t => t.status === 'IN_PROGRESS'));
  const doneTasks = computed(() => tasks.value.filter(t => t.status === 'DONE'));

  const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', 
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#1e293b', 
  color: '#f8fafc',      
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

  
  async function fetchTasks() {
    isLoading.value = true;
    try {
      const data = await taskService.getAllTasks();
      tasks.value = data.map(t => ({ ...t, subtasks: t.subtasks || [] }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      isLoading.value = false;
    }
  }

async function addTask(title: string, dueDate: string) {
  try {
    const newTask = await taskService.createTask(title, dueDate);
    tasks.value.push({ ...newTask, subtasks: [] });
    
    Toast.fire({ icon: 'success', title: 'Tugas baru ditambahkan!' });
  } catch (error) {
    console.error('Error adding task:', error);
    Toast.fire({ icon: 'error', title: 'Gagal menambah tugas' });
  }
}

  async function updateTaskTitle(id: string, title: string) {
    if (!title.trim()) return; 

    try {
      const updatedTask = await taskService.updateTask(id, { title });
      
      const index = tasks.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
    } catch (error) {
      console.error('Error updating title:', error);
      Toast.fire({ icon: 'error', title: 'Gagal memperbarui tugas' });
    }
  }

async function toggleSubTask(taskId: string, subTaskId: string) {
    const task = tasks.value.find(t => t.id === taskId);
    const subtask = task?.subtasks?.find((s: SubTask) => s.id === subTaskId); 
    
    if (subtask && task) {
      subtask.isDone = !subtask.isDone;
      await taskService.updateTask(taskId, { subtasks: [...task.subtasks] });
        Toast.fire({ icon: 'success', title: 'Status subtugas diperbarui!' });
    }
  }

  async function addSubTask(taskId: string, title: string) {
    const task = tasks.value.find(t => t.id === taskId);
    if (task && title.trim()) {
      const newSub: SubTask = { id: Date.now().toString(), title, isDone: false };
      if (!task.subtasks) task.subtasks = [];
      task.subtasks.push(newSub);
      await taskService.updateTask(taskId, { subtasks: [...task.subtasks] });
      Toast.fire({ icon: 'success', title: 'Subtugas ditambahkan!' });
    }
  }

  async function updateTaskStatus(id: string, status: Task['status']) {
    try {
      const updated = await taskService.updateTask(id, { status });
      const index = tasks.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks.value[index] = updated;
      }
      Toast.fire({ icon: 'success', title: 'Status tugas diperbarui!' });
    } catch (error) {
      console.error('Error updating status:', error);
      Toast.fire({ icon: 'error', title: 'Gagal memperbarui status tugas' });
    }
  }

  async function deleteSubTask(taskId: string, subTaskId: string) {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.subtasks = task.subtasks.filter(s => s.id !== subTaskId);
    
    try {
      await taskService.updateTask(taskId, { subtasks: [...task.subtasks] });
      Toast.fire({ icon: 'success', title: 'Subtugas dihapus!' });

    } catch (error) {
      console.error('Error deleting subtask:', error);
      Toast.fire({ icon: 'error', title: 'Gagal menghapus subtugas' });
    }
  }
}

async function removeTask(id: string) {
  
  const result = await Swal.fire({
    title: 'Hapus Tugas?',
    text: "Tugas yang dihapus tidak bisa dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', 
    cancelButtonColor: '#334155',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal',
    background: '#0f172a',
    color: '#f1f5f9'
  });

  if (result.isConfirmed) {
    try {
      await taskService.deleteTask(id); 
      tasks.value = tasks.value.filter((t) => t.id !== id); 
      
      Toast.fire({
        icon: 'success',
        title: 'Tugas berhasil dihapus'
      });
    } catch (error) {
     
      Toast.fire({
        icon: 'error',
        title: 'Gagal menghapus tugas'
      });
    }
  }
}

  return {
    tasks,
    isLoading,
    todoTasks,
    inProgressTasks,
    doneTasks,
    toggleSubTask,
    deleteSubTask,
    addSubTask,
    updateTaskTitle,
    fetchTasks,
    addTask,
    updateTaskStatus,
    removeTask
  };
});