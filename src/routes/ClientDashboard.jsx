import { useEffect, useState } from "react";
import { databases, account, ID } from "../appwrite";
import TaskCard  from "../components/TaskCard";

export default function ClientDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const userId = account.get().$id; // current user

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        [
          { attribute: "userId", operator: "equal", value: userId }
        ]
      );
      setTasks(res.documents);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        ID.unique(),
        { title, completed: false, userId }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, completed) => {
    await databases.updateDocument(DATABASE_ID, TASKS_COLLECTION_ID, id, { completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await databases.deleteDocument(DATABASE_ID, TASKS_COLLECTION_ID, id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 rounded-lg border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add
        </button>
      </form>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.$id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
