<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "../stores/task.store";

const title = ref("");
const dueDate = ref("");
const taskStore = useTaskStore();

const handleAdd = () => {
  if (!title.value.trim()) return;

  taskStore.addTask(title.value, dueDate.value);

  title.value = "";
  dueDate.value = "";
};
</script>

<template>
  <div class="max-w-2xl mx-auto w-full px-4 md:px-0">
    <form
      @submit.prevent="handleAdd"
      class="relative flex flex-col md:flex-row bg-slate-800/40 border-2 border-slate-700/50 rounded-2xl p-2 transition-all focus-within:border-sky-500"
    >
      <input
        v-model="title"
        type="text"
        placeholder="Ketik tugas baru..."
        class="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-slate-600 text-slate-100 text-sm"
      />

      <div
        class="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-700/50 pt-2 md:pt-0 md:pl-4"
      >
        <div class="relative flex-1 md:w-40">
          <input
            type="date"
            v-model="dueDate"
            placeholder="Tanggal jatuh tempo"
            class="w-full bg-slate-700/50 text-slate-200 placeholder:text-slate-100 text-xs rounded-lg px-3 py-2.5 outline-none border border-slate-600 appearance-none"
            style="min-width: 120px"
          />
        </div>

        <button
          type="submit"
          class="flex-1 md:flex-none bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"
        >
          Tambah
        </button>
      </div>
    </form>

    <p class="text-[10px] text-slate-500 mt-2 ml-2 italic">
      Tips: Tekan <span class="text-slate-400 font-bold">Enter</span> untuk
      menambah cepat.
    </p>
  </div>
</template>

<style scoped>
/* Menghilangkan border default date picker di beberapa browser mobile */
input[type="date"] {
  min-height: 40px; /* Agar enak di-tap jari */
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.8) sepia(100%) saturate(500%) hue-rotate(170deg);
  cursor: pointer;
}
</style>
