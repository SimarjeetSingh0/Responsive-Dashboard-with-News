// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../contexts/AuthContext'

// function Navbar() {
//   const { currentUser, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = async () => {
//     try {
//       await logout()
//       navigate('/login')
//     } catch (error) {
//       console.error('Failed to log out:', error)
//     }
//   }

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="text-xl font-bold text-gray-800">
//             News Dashboard
//           </Link>
          
//           {currentUser ? (
//             <div className="flex items-center space-x-4">
//               <Link to="/" className="text-gray-600 hover:text-gray-800">
//                 Dashboard
//               </Link>
//               <Link to="/calculator" className="text-gray-600 hover:text-gray-800">
//                 Calculator
//               </Link>
//               <Link to="/analytics" className="text-gray-600 hover:text-gray-800">
//                 Analytics
//               </Link>
//               <Link to="/export" className="text-gray-600 hover:text-gray-800">
//                 Export
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link to="/login" className="text-gray-600 hover:text-gray-800">
//                 Login
//               </Link>
//               <Link to="/register" className="text-gray-600 hover:text-gray-800">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();  // Changed from currentUser to user
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            News Dashboard
          </Link>
          
          {user ? (  // Changed from currentUser to user
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <Link to="/calculator" className="text-gray-600 hover:text-gray-800">
                Calculator
              </Link>
              <Link to="/analytics" className="text-gray-600 hover:text-gray-800">
                Analytics
              </Link>
              <Link to="/export" className="text-gray-600 hover:text-gray-800">
                Export
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-800">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;