<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import type { Task } from "../types/task";
import { useTaskStore } from "../stores/task.store";

const props = defineProps<{ task: Task }>();
const taskStore = useTaskStore();

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const inputRef = ref<HTMLInputElement | null>(null);

const newSubtaskTitle = ref("");
const showSubtasks = ref(false);

const startEdit = () => {
  isEditing.value = true;
  editedTitle.value = props.task.title;
  nextTick(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
  });
};

const saveEdit = async () => {
  if (isEditing.value) {
    if (editedTitle.value.trim() !== props.task.title) {
      await taskStore.updateTaskTitle(props.task.id, editedTitle.value);
    }
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedTitle.value = props.task.title;
};

const progress = computed(() => {
  if (!props.task.subtasks || props.task.subtasks.length === 0) return 0;
  const done = props.task.subtasks.filter((s) => s.isDone).length;
  return Math.round((done / props.task.subtasks.length) * 100);
});

const handleAddSubtask = () => {
  if (!newSubtaskTitle.value.trim()) return;
  taskStore.addSubTask(props.task.id, newSubtaskTitle.value);
  newSubtaskTitle.value = "";
};

const handledeleteSubTask = (subtaskId: string) => {
  taskStore.deleteSubTask(props.task.id, subtaskId);
};

const isOverdue = computed(() => {
  if (!props.task.dueDate) return false;
  return (
    new Date(props.task.dueDate) < new Date() && props.task.status !== "DONE"
  );
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
};
</script>

<template>
  <div
    class="group relative bg-slate-800 border border-slate-700/50 p-4 rounded-xl shadow-sm hover:shadow-xl hover:border-slate-500 transition-all duration-300"
    :class="isEditing ? '' : 'cursor-grab hover:-translate-y-1'"
  >
    <div class="flex flex-col gap-4">
      <div v-if="isEditing">
        <input
          ref="inputRef"
          v-model="editedTitle"
          type="text"
          class="w-full bg-slate-700/50 border border-sky-500 rounded-lg px-3 py-1.5 text-sm text-slate-100 outline-none ring-2 ring-sky-500/20"
          @blur="saveEdit"
          @keydown.enter="saveEdit"
          @keydown.esc="cancelEdit"
        />
      </div>

      <div v-else class="flex items-start justify-between">
        <p
          class="text-sm font-semibold leading-relaxed text-slate-200 pr-8 hover:text-sky-400 transition cursor-pointer"
          @click="startEdit"
        >
          {{ task.title }}
        </p>

        <button
          @click="taskStore.removeTask(task.id)"
          class="absolute cursor-pointer top-3 right-3 p-1.5 rounded-lg transition-all text-red-500 opacity-100 lg:text-slate-600 lg:opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-500/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div v-if="task.dueDate" class="flex items-center gap-1.5 mt-1">
        <div
          :class="[
            'flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight transition-all',
            isOverdue
              ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50 animate-pulse'
              : 'bg-slate-700/50 text-slate-400',
          ]"
          :title="
            isOverdue ? 'Tugas ini sudah melewati deadline!' : 'Tenggat waktu'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{ formatDate(task.dueDate) }}</span>
          <span v-if="isOverdue" class="ml-1">— Terlambat!</span>
        </div>
      </div>

      <div v-if="task.subtasks?.length" class="space-y-1.5">
        <div
          class="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase"
        >
          <span class="text-slate-500">Progress</span>
          <span :class="progress === 100 ? 'text-emerald-400' : 'text-sky-400'"
            >{{ progress }}%</span
          >
        </div>
        <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-500 ease-out"
            :class="
              progress === 100
                ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                : 'bg-sky-500'
            "
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <div class="border-t border-slate-700/50 pt-3">
        <button
          @click="showSubtasks = !showSubtasks"
          class="flex items-center cursor-pointer gap-2 text-[11px] font-bold text-slate-500 hover:text-slate-300 transition uppercase tracking-widest"
        >
          <span
            :class="showSubtasks ? 'rotate-180' : ''"
            class="transition-transform duration-300"
            >▼</span
          >
          Checklist ({{ task.subtasks?.filter((s) => s.isDone).length || 0 }}/{{
            task.subtasks?.length || 0
          }})
        </button>

        <div v-if="showSubtasks" class="mt-3 space-y-2">
          <div
            v-for="sub in task.subtasks"
            :key="sub.id"
            class="flex items-center justify-between group/sub transition-all"
          >
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                :checked="sub.isDone"
                @change="taskStore.toggleSubTask(task.id, sub.id)"
                class="w-4 h-4 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-0 transition cursor-pointer"
              />
              <span
                class="text-xs transition-all"
                :class="
                  sub.isDone ? 'text-slate-500 line-through' : 'text-slate-300'
                "
              >
                {{ sub.title }}
              </span>
            </div>

            <button
              @click="handledeleteSubTask(sub.id)"
              class="transition-all p-1 cursor-pointer text-red-500 opacity-100 lg:text-slate-600 lg:opacity-0 group-hover/sub:opacity-100 hover:text-red-400"
              title="Hapus item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="mt-3 relative">
            <input
              v-model="newSubtaskTitle"
              type="text"
              placeholder="Tambah item baru..."
              class="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-[11px] text-slate-300 outline-none focus:border-sky-500/50 transition"
              @keyup.enter="handleAddSubtask"
            />
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/30"
      >
        <span class="text-[9px] text-slate-600 font-mono italic uppercase">
          ID: {{ task.id.slice(-5) }}
        </span>

        <div class="lg:hidden flex items-center gap-2">
          <select 
            :value="task.status"
            @change="(e) => taskStore.updateTaskStatus(task.id, (e.target as HTMLSelectElement).value as 'TODO' | 'IN_PROGRESS' | 'DONE')"
            class="bg-slate-900 border border-slate-700 text-[10px] text-slate-300 rounded px-1 py-0.5 outline-none focus:border-sky-500"
          >
            <option value="TODO">TO DO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">FINISHED</option>
          </select>
        </div>

        <span
          :class="[
            'text-[9px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-widest',
            task.status === 'TODO'
              ? 'bg-sky-500/10 text-sky-400'
              : task.status === 'IN_PROGRESS'
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-emerald-500/10 text-emerald-400',
          ]"
        >
          {{ task.status }}
        </span>
      </div>
    </div>
  </div>
</template>
