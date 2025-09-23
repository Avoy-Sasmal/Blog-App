import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiPlus, FiSearch, FiX } from "react-icons/fi";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  // Refresh notes when component becomes visible (after navigation)
  useEffect(() => {
    const handleFocus = () => {
      if (token) {
        fetchNotes();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [token]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data.data);
      setFilteredNotes(res.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
      setFilteredNotes(filteredNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredNotes(notes);
      return;
    }

    setIsSearching(true);
    try {
      const res = await api.get(`/notes/${searchTerm}`);
      if (res.data.success) {
        setFilteredNotes([res.data.data]);
      } else {
        setFilteredNotes([]);
      }
    } catch (error) {
      // If search by ID fails, try searching by title, content, or author in the existing notes
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.user &&
            note.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNotes(filtered);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredNotes(notes);
  };

  return (
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

          {/* Search Section */}
          <div className="mb-8 sm:mb-12">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search notes by title, content, author, or ID..."
                  className="w-full pl-12 pr-12 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>
            </form>
          </div>

          {/* Content Section */}
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16">
              {searchTerm ? (
                <>
                  <FiSearch className="mx-auto text-6xl text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg sm:text-xl mb-6">
                    No notes found for "{searchTerm}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-white"
                  >
                    <FiX className="text-lg" />
                    <span>Clear Search</span>
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={deleteNote}
                  onRefresh={fetchNotes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
