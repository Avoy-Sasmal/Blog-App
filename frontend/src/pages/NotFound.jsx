// import { Link } from "react-router-dom";

// export default function NotFound() {
//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
//       <h1 className="text-4xl text-purple-400 mb-4">404 - Page Not Found</h1>
//       <Link
//         to="/"
//         className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500"
//       >
//         Go Home
//       </Link>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full">
            <FiAlertCircle className="text-white text-4xl" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FiHome className="text-lg" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-gray-300 hover:text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}