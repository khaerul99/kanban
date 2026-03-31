<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/task.store';

const title = ref('');
const dueDate = ref('');
const taskStore = useTaskStore();

const handleAdd = () => {
  if (!title.value.trim()) return;
  
  taskStore.addTask(title.value, dueDate.value); 
  
  title.value = '';
  dueDate.value = '';
};
</script>

<template>
  <div class="max-w-2xl mx-auto w-full group">
    <form 
      @submit.prevent="handleAdd" 
      class="relative flex flex-col md:flex-row items-center bg-slate-800/40 border-2 border-slate-700/50 rounded-2xl p-2 transition-all focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10"
    >
      <input 
        v-model="title"
        type="text" 
        placeholder="Ketik tugas baru..." 
        class="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-slate-600 text-slate-100 text-sm md:text-base"
      />

      <div class="flex items-center gap-3 pr-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-700/50 pt-2 md:pt-0 md:pl-4">
        <div class="relative flex items-center group/date">
          <input 
            type="date" 
            v-model="dueDate" 
            class="bg-slate-700/50 hover:bg-slate-700 text-[11px] text-slate-300 rounded-lg px-3 py-2 outline-none border border-slate-600 focus:border-sky-400 transition-all uppercase cursor-pointer"
            title="Pilih Deadline"
          />
        </div>

        <button 
          type="submit"
          class="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 active:scale-95 transition-all whitespace-nowrap"
        >
          Tambah
        </button>
      </div>
    </form>
    
    <p class="text-[10px] text-slate-500 mt-2 ml-4 italic tracking-wide">
      Tips: Tekan <span class="text-slate-400 font-bold">Enter</span> untuk menambah tugas dengan cepat.
    </p>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.8) sepia(100%) saturate(500%) hue-rotate(170deg);
  cursor: pointer;
}

@media (max-width: 768px) {
  input[type="date"] {
    width: 100%;
  }
}
</style>