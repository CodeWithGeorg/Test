export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        {task.description && <p className="text-gray-600">{task.description}</p>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.$id, !task.completed)}
          className={`px-3 py-1 rounded-lg ${task.completed ? 'bg-yellow-400' : 'bg-green-500 text-white'}`}
        >
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={() => onDelete(task.$id)}
          className="px-3 py-1 rounded-lg bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
