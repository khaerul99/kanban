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
        <div class="flex-1 md:w-44">
          <input
            type="date"
            v-model="dueDate"
            placeholder="Pilih Tanggal"
            class="mobile-date-fix w-full bg-slate-700/80 text-white text-[13px] rounded-xl px-3 py-3 outline-none border border-slate-600 appearance-none block"
          />
        </div>

        <button
          type="submit"
          class="flex-1 md:flex-none bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"
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
input[type="date"] {
  min-height: 40px;
}

.custom-date-input {
  min-height: 42px;
  color-scheme: dark;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}


@media (max-width: 768px) {
  .custom-date-input {
    font-size: 14px !important;
  }
}

.mobile-date-fix {
  min-height: 44px !important; 
  color: white !important;
  display: flex !important;
  align-items: center !important;
  position: relative;
  -webkit-appearance: none; 
}

input[type="date"]::before {
  content: attr(placeholder);
  width: 100%;
  color: #94a3b8;
}

input[type="date"]:focus::before,
input[type="date"]:valid::before {
  content: "";
  display: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  filter: invert(1);
  opacity: 1;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  input[type="date"] {
    font-size: 14px !important;
    padding-left: 12px !important;
  }
}
</style>
