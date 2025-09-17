// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../api/axios.js";

// export default function EditNote() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get(`/notes/${id}`).then((res) => {
//       setTitle(res.data.data.title);
//       setContent(res.data.data.content);
//     });
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     await api.put(`/notes/${id}`, { title, content });
//     navigate("/");
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl font-bold text-purple-400 mb-6">Edit Note</h1>
//       <form
//         onSubmit={handleUpdate}
//         className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto shadow"
//       >
//         <input
//           type="text"
//           className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none h-40"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";

export default function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/notes/${id}`).then((res) => {
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/notes/${id}`, { title, content });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-700">
        <h1 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          ✏️ Edit Note
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows="6"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold transition transform hover:scale-105"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}
