import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiPlus } from "react-icons/fi";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/notes").then((res) => setNotes(res.data.data));
  }, []);

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-purple-400 mb-6">All Notes</h1>
//       {notes.length === 0 ? (
//         <p className="text-gray-400">No notes yet. Create one!</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {notes.map((note) => (
//             <NoteCard key={note._id} note={note} onDelete={deleteNote} />
//           ))}
//         </div>
//       )}
//     </div>

<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          All Notes
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Organize your thoughts and ideas in one place
        </p>
      </div>

      {/* Content Section */}
      {notes.length === 0 ? (
        <div className="text-center py-16">
          <FiFileText className="mx-auto text-6xl text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg sm:text-xl mb-6">
            No notes yet. Create your first one!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-white"
          >
            <FiPlus className="text-lg" />
            <span>Create Note</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  );
}


