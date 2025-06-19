// TaskItem.tsx
import { useEffect, useState } from "react";

type Comment = {
  id: number;
  text: string;
  timestamp: string;
};

type TaskProps = {
  task: {
    id: number;
    text: string;
    done: boolean;
  };
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
};

export default function TaskItem({ task, onDelete, onToggleDone }: TaskProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/${task.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [task.id]);

  return (
    <li className="flex flex-col border-b border-gray-200 py-2">
      <div className="flex justify-between items-center">
        <div
          onClick={() => onToggleDone(task.id)}
          className={`cursor-pointer select-none ${
            task.done ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {task.text}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>

      {/* Display comments for the task */}
      <ul className="ml-4 text-sm text-gray-600 mt-1">
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text} <span className="text-xs text-gray-400">({comment.timestamp})</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
