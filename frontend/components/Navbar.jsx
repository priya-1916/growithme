// import React from 'react';
// import { Link } from 'react-router-dom';


// const Navbar = ({ isLoggedIn, handleLogout }) => (
//   <nav className="bg-white shadow-md sticky top-0 z-50">
//     <div className="max-w-7xl mx-auto px-6">
//       <div className="flex justify-between items-center h-16">
//         <Link to="/" className="text-2xl font-bold text-[#2F855A] font-sans">
//           GroWithMe
//         </Link>
//         <div className="flex justify-between items-center space-x-6 text-base font-medium">
//           <div className="flex space-x-6">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/blog"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   Blog
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/user-dashboard"
//                   className="text-[#1A202C] hover:text-[#2F855A] transition"
//                 >
//                   User Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-[#1A202C] hover:text-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
          
         
//         </div>
//       </div>
//     </div>
//   </nav>
// );

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => (
  <nav className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/grow.svg" alt="GroWithMe Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-[#2F855A] font-sans">
            GroWithMe
          </span>
        </Link>

        <div className="flex justify-between items-center space-x-6 text-base font-medium">
          <div className="flex space-x-6">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/blog"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  Blog
                </Link>
                <Link
                  to="/dashboard"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/user-dashboard"
                  className="text-[#1A202C] hover:text-[#2F855A] transition"
                >
                  User Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#1A202C] hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
