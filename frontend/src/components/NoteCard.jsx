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
import { FiEdit3, FiTrash2, FiFileText } from "react-icons/fi";




// NoteCard Component
export default function NoteCard({ note, onDelete }) {
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

      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors">
        {note.content.substring(0, 120)}...
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-gray-700">
        <Link
          to={`/edit/${note._id}`}
          className="flex items-center justify-center space-x-2 text-sm px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <FiEdit3 className="text-sm" />
          <span>Edit</span>
        </Link>
        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center justify-center space-x-2 text-sm px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <FiTrash2 className="text-sm" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}