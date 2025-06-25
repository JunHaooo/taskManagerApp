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
  const [newCommentText, setNewCommentText] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";


  // Fetch comments on mount
  useEffect(() => {
    setCommentLoading(true);
    fetch(`${API_URL}/tasks/${task.id}/comments`)
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

    // Function to handle adding a comment
  const handleAddComment = () => {
    if (!newCommentText.trim()) return; // ignore empty comments

    // Optional: clear error on new attempt
    setCommentError(null);

    fetch(`${API_URL}/tasks/${task.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newCommentText }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add comment");
        return res.json();
      })
      .then((createdComment) => {
        setComments((prev) => [createdComment, ...prev]); // add new comment to top
        setNewCommentText(""); // clear input
      })
      .catch(() => setCommentError("Failed to add comment"));
  };

  // Return your JSX *outside* of useEffect
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
      {commentLoading && (
        <p className="text-xs text-gray-500 ml-4">Loading comments...</p>
      )}
      {commentError && (
        <p className="text-xs text-red-500 ml-4">{commentError}</p>
      )}

      {/* New Comment Input */}
      <div className="mt-2 ml-4 flex items-center space-x-2">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="border border-gray-300 rounded px-2 py-1 flex-grow text-black"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Display comments */}
      <ul className="ml-4 text-sm text-gray-600 mt-1">
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}{" "}
            {comment.timestamp && (
              <span className="text-xs text-gray-400">({comment.timestamp})</span>
            )}
          </li>
        ))}
      </ul>

      

    </li>
  );
}

export default TaskItem;
