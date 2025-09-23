// import { Link } from "react-router-dom";

// export default function NoteCard({ note, onDelete }) {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-purple-600">
//       <h2 className="text-xl font-bold text-purple-300">{note.title}</h2>
//       <p className="text-gray-300 mt-2">{note.content.substring(0, 100)}...</p>
//       <div className="flex justify-between mt-4">
//         <Link
//           to={`/edit/${note._id}`}
//           className="text-sm px-3 py-1 rounded bg-purple-600 hover:bg-purple-500"
//         >
//           Edit
//         </Link>
//         <button
//           onClick={() => onDelete(note._id)}
//           className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-500"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import {
  FiEdit3,
  FiTrash2,
  FiFileText,
  FiImage,
  FiVideo,
  FiFile,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";
import { useState } from "react";

// Helper function to get file type icon
const getFileIcon = (url) => {
  if (!url) return null;

  const extension = url.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return <FiImage className="text-blue-400" />;
  } else if (["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extension)) {
    return <FiVideo className="text-red-400" />;
  } else {
    return <FiFile className="text-gray-400" />;
  }
};

// Helper function to check if URL is an image
const isImage = (url) => {
  if (!url) return false;
  const extension = url.split(".").pop().toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension);
};

// Helper function to check if URL is a video
const isVideo = (url) => {
  if (!url) return false;
  const extension = url.split(".").pop().toLowerCase();
  return ["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extension);
};

// NoteCard Component
export default function NoteCard({ note, onDelete, onRefresh }) {
  const { user } = useAuth();
  const isOwner = user && note.user && user.id === note.user._id;
  const [commentText, setCommentText] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const likesCount = Array.isArray(note.likes) ? note.likes.length : 0;
  const hasLiked = Array.isArray(note.likes)
    ? note.likes.some((uid) =>
        typeof uid === "string" ? uid === user?.id : uid?._id === user?.id
      )
    : false;

  const handleToggleLike = async () => {
    try {
      setLikeLoading(true);
      await api.post(`/notes/${note._id}/like`);
      onRefresh && onRefresh();
    } catch (e) {
      // no-op
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      setCommentLoading(true);
      await api.post(`/notes/${note._id}/comments`, { text: commentText });
      setCommentText("");
      onRefresh && onRefresh();
    } catch (e) {
      // no-op
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiFileText className="text-purple-400 text-lg flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-purple-300 line-clamp-2 group-hover:text-purple-200 transition-colors">
            {note.title}
          </h2>
        </div>
      </div>

      {/* Author Information */}
      {note.user && (
        <div className="flex items-center space-x-2 mb-4">
          <FiUser className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-400">
            By {note.user.name} {isOwner && "(You)"}
          </span>
        </div>
      )}

      {/* File Preview */}
      {note.image && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            {getFileIcon(note.image)}
            <span className="text-sm text-gray-400">Attached file</span>
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-700">
            {isImage(note.image) ? (
              <img
                src={note.image}
                alt="Note attachment"
                className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : isVideo(note.image) ? (
              <video
                src={note.image}
                className="w-full h-32 sm:h-40 object-cover"
                controls
                preload="metadata"
              />
            ) : (
              <div className="w-full h-32 sm:h-40 flex items-center justify-center bg-gray-700">
                <div className="text-center">
                  <FiFile className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">File attached</p>
                  <a
                    href={note.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-xs mt-1 inline-block"
                  >
                    View File
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors">
        {note.content.substring(0, 120)}...
      </p>

      {/* Action Buttons - Only show for note owner */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
        {/* Like / Count */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleLike}
            disabled={likeLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              hasLiked
                ? "bg-purple-700 text-white hover:bg-purple-600"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {likeLoading ? "..." : hasLiked ? "Unlike" : "Like"}
          </button>
          <span className="text-gray-400 text-sm">{likesCount} likes</span>
        </div>

        {/* Comments List */}
        {Array.isArray(note.comments) && note.comments.length > 0 && (
          <div className="space-y-2">
            {note.comments.slice(-3).map((c, idx) => (
              <div key={idx} className="text-sm text-gray-300">
                <span className="text-purple-300 mr-2">{c.user?.name || "User"}:</span>
                <span className="text-gray-200">{c.text}</span>
              </div>
            ))}
            {note.comments.length > 3 && (
              <div className="text-xs text-gray-500">and {note.comments.length - 3} more...</div>
            )}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            disabled={commentLoading}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm text-white"
          >
            {commentLoading ? "..." : "Send"}
          </button>
        </form>

        {/* Message Author */}
        {note.user && user && user.id !== note.user._id && (
          <Link
            to={`/chat?with=${note.user._id}&name=${encodeURIComponent(note.user.name)}`}
            className="inline-block mt-2 text-sm text-purple-300 hover:text-purple-200"
          >
            Message {note.user.name}
          </Link>
        )}

        {isOwner && (
          <><Link
            to={`/edit/${note._id}`}
            className="flex items-center justify-center space-x-2 text-sm px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FiEdit3 className="text-sm" />
            <span>Edit</span>
          </Link><button
            onClick={() => onDelete(note._id)}
            className="flex items-center justify-center space-x-2 text-sm px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
              <FiTrash2 className="text-sm" />
              <span>Delete</span>
            </button></>
            )} {/* <-- This closes the inner isOwner check for Delete button */}
          {/* Remove the extra isOwner check here, as it's already checked above */}
      </div>
    </div>
  );
}
