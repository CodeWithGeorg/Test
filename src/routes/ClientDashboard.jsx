import { useEffect, useState } from "react";
import { databases, account, ID, DATABASE_ID, ORDERS_COLLECTION_ID } from "../appwrite";
import TaskCard from "../components/TaskCard";

export default function ClientDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        fetchTasks(user.$id);
      } catch (err) {
        console.error("Failed to get user:", err);
      }
    };
    getUser();
  }, []);

  const fetchTasks = async (uid) => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [
          { attribute: "userId", operator: "equal", value: uid }
        ]
      );
      setTasks(res.documents);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !userId) return;
    
    try {
      await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        { title, completed: false, userId }
      );
      setTitle("");
      fetchTasks(userId);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await databases.updateDocument(DATABASE_ID, ORDERS_COLLECTION_ID, id, { completed });
      fetchTasks(userId);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, ORDERS_COLLECTION_ID, id);
      fetchTasks(userId);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">My Tasks</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add your first task above!
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.$id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
