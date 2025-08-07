import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeLinkClass = "text-white bg-gray-900";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {isAuthenticated && (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-2xl font-bold border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="flex-grow p-2">
            <NavLink to="/dashboard" className={({ isActive }) => `${isActive? activeLinkClass : inactiveLinkClass} block px-4 py-2 rounded-md text-sm font-medium`}>Dashboard</NavLink>
            <NavLink to="/users" className={({ isActive }) => `${isActive? activeLinkClass : inactiveLinkClass} block px-4 py-2 rounded-md text-sm font-medium mt-1`}>Users</NavLink>
            <NavLink to="/roles" className={({ isActive }) => `${isActive? activeLinkClass : inactiveLinkClass} block px-4 py-2 rounded-md text-sm font-medium mt-1`}>Roles</NavLink>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <p className="text-sm">Welcome, {user?.username}</p>
            <button onClick={handleLogout} className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;