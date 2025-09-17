// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
//       <Link to="/" className="text-xl font-bold text-purple-400">
//          BlogApp
//       </Link>
//       <div className="space-x-4">
//         <Link to="/" className="hover:text-purple-300">
//           Home
//         </Link>
//         <Link
//           to="/create"
//           className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-500"
//         >
//           New Note
//         </Link>
//       </div>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { FiPlus, FiHome, FiEdit3  } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-6 lg:px-8 py-4 shadow-lg border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-all duration-200"
        >
          <FiEdit3 className="text-purple-400 text-2xl" />
          <span className="hidden sm:inline">BlogApp</span>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link 
            to="/" 
            className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 text-gray-300 hover:text-white group"
          >
            <FiHome className="text-lg" />
            <span className="hidden sm:inline text-sm font-medium">Home</span>
          </Link>
          <Link
            to="/create"
            className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 font-medium"
          >
            <FiPlus className="text-lg" />
            <span className="text-sm">New Note</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

