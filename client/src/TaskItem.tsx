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

function TaskItem({ task, onDelete, onToggleDone }: TaskProps) {
  const [comments, setComments] = useState<Comment[]>([]); //was useState([]) originally
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  // ✅ Fetch comments on mount
  useEffect(() => {
    setCommentLoading(true);
    fetch(`http://localhost:8080/tasks/${task.id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a: Comment, b: Comment) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setComments(sorted);
      })
      .catch(() => setCommentError("Could not load comments"))
      .finally(() => setCommentLoading(false));
  }, [task.id]); // ✅ add dependency to avoid warnings

  // ✅ Return your JSX *outside* of useEffect
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

      {/* Loading or error */}
      {commentLoading && <p className="text-xs text-gray-500 ml-4">Loading comments...</p>}
      {commentError && <p className="text-xs text-red-500 ml-4">{commentError}</p>}

      {/* Display comments for the task */}
      <ul className="ml-4 text-sm text-gray-600 mt-1">
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}{" "}
            <span className="text-xs text-gray-400">({comment.timestamp})</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default TaskItem;
