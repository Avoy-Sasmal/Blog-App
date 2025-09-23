import { Link } from "react-router-dom";
import {
  FiEdit3,
  FiLogIn,
  FiUserPlus,
  FiFileText,
  FiUpload,
  FiSearch,
} from "react-icons/fi";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                <FiEdit3 className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              Welcome to BlogApp
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
              Create, organize, and manage your notes with ease. Upload images,
              videos, and files to make your notes more engaging and searchable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 font-medium text-white text-lg"
              >
                <FiUserPlus className="text-xl" />
                <span>Get Started</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-xl transition-all duration-200 font-medium text-white text-lg"
              >
                <FiLogIn className="text-xl" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full">
                  <FiFileText className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Create Notes
              </h3>
              <p className="text-gray-400">
                Write and organize your thoughts with our intuitive note-taking
                interface.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-600 to-green-700 rounded-full">
                  <FiUpload className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Upload Files
              </h3>
              <p className="text-gray-400">
                Attach images, videos, and documents to make your notes more
                comprehensive.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full">
                  <FiSearch className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Search
              </h3>
              <p className="text-gray-400">
                Find your notes quickly by searching through titles, content, or
                using note IDs.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-gray-800 to-gray-900 p-8 sm:p-12 rounded-2xl border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to start organizing your thoughts?
            </h2>
            <p className="text-gray-400 mb-6">
              Join thousands of users who trust BlogApp for their note-taking
              needs.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 font-medium text-white text-lg"
            >
              <FiUserPlus className="text-xl" />
              <span>Create Your Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
