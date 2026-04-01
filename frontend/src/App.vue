<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from './stores/task.store';
import TaskColumn from './components/TaskColumn.vue';
import TaskForm from './components/TaskForm.vue';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
    <div class="max-w-7xl mx-auto px-6 py-12">
      
      <header class="text-center mb-16">
        <h1 class="text-5xl font-black tracking-tighter p-6 bg-linear-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4 italic">
         KANBAN APP
        </h1>
        <p class="text-slate-500 font-medium tracking-widest uppercase text-[10px]">
          Organize your workflow with drag and drop
        </p>
      </header>

      <div class="mb-20">
        <TaskForm />
      </div>

      <div v-if="taskStore.isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
        <p class="mt-4 text-slate-600 text-sm animate-pulse italic">Menghubungkan ... </p>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8 lg:justify-center items-start overflow-x-hidden pb-10">
        <TaskColumn title="To Do" status="TODO" :tasks="taskStore.todoTasks" class="snap-center" />
        <TaskColumn title="In Progress" status="IN_PROGRESS" :tasks="taskStore.inProgressTasks" class="snap-center" />
        <TaskColumn title="Finished" status="DONE" :tasks="taskStore.doneTasks" class="snap-center" />
      </div>
    </div>
  </div>
</template>