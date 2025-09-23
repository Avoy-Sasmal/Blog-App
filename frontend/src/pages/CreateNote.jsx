// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function CreateNote() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post("/notes", { title, content });
//     navigate("/");
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl font-bold text-purple-400 mb-6">
//         Create New Note
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto shadow"
//       >
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Content"
//           className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none h-40"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import {
  FiSave,
  FiArrowLeft,
  FiEdit3,
  FiType,
  FiFileText,
  FiUpload,
} from "react-icons/fi";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      // use FormData for file + text fields
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }

      await api.post("/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Notes</span>
            </button>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <FiEdit3 className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                Create New Note
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Capture your thoughts and ideas
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                  <FiType className="text-purple-400" />
                  <span>Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your note title..."
                  className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none text-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                  <FiFileText className="text-purple-400" />
                  <span>Content</span>
                </label>
                <textarea
                  placeholder="Write your note content here..."
                  className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none resize-none text-base leading-relaxed"
                  rows="12"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                  <FiUpload className="text-purple-400" />
                  <span>Upload File</span>
                </label>
                <input
                  type="file"
                  className="w-full text-gray-300 bg-gray-700 rounded-xl p-2 border border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <p className="text-sm text-gray-400 mt-1">
                    Selected:{" "}
                    <span className="text-purple-300">{file.name}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={!title.trim() || !content.trim() || isLoading}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:flex-1"
                >
                  <FiSave className="text-lg" />
                  <span>{isLoading ? "Saving..." : "Save Note"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-gray-300 hover:text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:w-32"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

