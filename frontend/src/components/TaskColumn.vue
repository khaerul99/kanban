<script setup lang="ts">
import draggable from "vuedraggable";
import type { Task } from "../types/task";
import { useTaskStore } from "../stores/task.store";
import TaskCard from "./TaskCard.vue";

const props = defineProps<{
  title: string;
  status: Task["status"];
  tasks: Task[];
}>();

const taskStore = useTaskStore();

const onMove = (evt: any) => {
  if (evt.added) {
    const id = evt.added.element.id;
    const newStatus = props.status;
    taskStore.updateTaskStatus(id, newStatus);
  }
};
</script>

<template>
  <div class="w-full lg:w-96 shrink-0 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 flex flex-col max-h-[80vh]">
    <div class="flex items-center justify-between mb-6 px-1">
      <div class="flex items-center gap-3">
        <div :class="['w-2 h-2 rounded-full', 
          status === 'TODO' ? 'bg-sky-400' : 
          status === 'IN_PROGRESS' ? 'bg-amber-400' : 'bg-emerald-400']">
        </div>
        <h3 class="font-bold text-slate-100 tracking-tight text-sm uppercase italic">{{ title }}</h3>
      </div>
      <span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-500 text-[10px] font-bold">{{ tasks.length }}</span>
    </div>

    <draggable 
      :list="tasks" 
      group="tasks" 
      item-key="id"
      :animation="250"
      :force-fallback="true"
      fallback-tolerance="3"
      class="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar min-h-50"
      @change="onMove"
      ghost-class="ghost-card"
      drag-class="dragging-card"
    >
      <template #item="{ element }">
        <div class="flex flex-col gap-4 p-2 min-h-37.5 overflow-visible">
            <TaskCard :task="element" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.ghost-card {
  opacity: 0.2 !important;
  background: #38bdf8 !important;
  border: 2px dashed #38bdf8 !important;
  border-radius: 0.75rem;
}

.dragging-card {
  opacity: 1 !important;
  transform: rotate(2deg) scale(1.05);
  cursor: grabbing;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

.custom-scrollbar {
  scrollbar-gutter: stable; 
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(51, 65, 85, 0.5); 
  border-radius: 20px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(51, 65, 85, 1);
}
</style>