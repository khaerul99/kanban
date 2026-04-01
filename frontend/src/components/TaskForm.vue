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
  <div class="max-w-2xl mx-auto w-full px-4">
    <form @submit.prevent="handleAdd" class="flex flex-col gap-3">
      
      <div class="relative group">
        <input 
          v-model="title"
          type="text" 
          placeholder="Ketik tugas baru..." 
          class="w-full bg-slate-800/60 border-2 border-slate-700/50 rounded-2xl px-5 py-4 text-slate-100 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all shadow-lg"
        />
      </div>

      <div class="flex items-center gap-3">
        
        <div class="relative flex-1 group">
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input 
            type="date" 
            v-model="dueDate" 
            class="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-sky-400 uppercase tracking-wider outline-none appearance-none cursor-pointer focus:border-sky-500"
          />
        </div>

        <button 
          type="submit"
          class="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          Tambah
        </button>
      </div>
    </form>
    
    <p class="text-[10px] text-slate-600 mt-3 ml-2 flex items-center gap-1">
      <span class="w-1 h-1 bg-slate-600 rounded-full"></span>
      Tekan <span class="text-slate-400 font-bold">Enter</span> untuk menambah cepat.
    </p>
  </div>
</template>

<style scoped>
input[type="date"] {
  color-scheme: dark; 
  min-height: 48px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0; 
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}
</style>
