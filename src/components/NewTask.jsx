import { useState } from "react";

export default function NewTask({ onAdd, onDelete }) {
  const [newTask, setNewTask] = useState("");

  function handleAddNewTask(event) {
    setNewTask(event.target.value);
  }

  function hadleAddTask() {
    onAdd(newTask);
    setNewTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleAddNewTask}
        type="text"
        value={newTask}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={hadleAddTask}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
