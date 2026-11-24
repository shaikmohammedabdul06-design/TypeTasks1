// ---------- 1. TaskStatus literal union ----------
export type TaskStatus = "todo" | "in-progress" | "done";

// ---------- 2. Task interface ----------
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// ---------- 3. addTask ----------
// Uses max(id) + 1 so ids stay unique even after tasks are deleted.
export function addTask(tasks: Task[], title: string): Task[] {
  const nextId: number =
    tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;

  const newTask: Task = { id: nextId, title, status: "todo" };
  return [...tasks, newTask];
}

// ---------- 4. completeTask ----------
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task =>
    t.id === id ? { ...t, status: "done" } : t
  );
}

// ---------- 5. filterByStatus ----------
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// ---------- Make It Yours: extra typed operations ----------

// Moves a task forward: todo -> in-progress -> done (done stays done)
export function advanceTask(tasks: Task[], id: number): Task[] {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "done",
  };
  return tasks.map((t): Task =>
    t.id === id ? { ...t, status: nextStatus[t.status] } : t
  );
}

// Removes a task by id
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Counts tasks with a given status
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}

// ---------- Quick demo (optional, safe to keep) ----------
let tasks: Task[] = [];
tasks = addTask(tasks, "Learn TypeScript");
tasks = addTask(tasks, "Build TypeTasks");
tasks = advanceTask(tasks, 1);
tasks = completeTask(tasks, 2);
console.log(filterByStatus(tasks, "done"));
console.log(countByStatus(tasks, "in-progress"));