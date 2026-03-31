export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  position: number;
  dueDate?: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  isDone: boolean;
}
