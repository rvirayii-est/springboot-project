import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/users/UserList';
import RoleList from './pages/roles/RoleList';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/users/UserForm';
import RoleForm from './pages/roles/RoleForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Routes with shared layout */}
      <Route element={<Layout />}>
        {/* Protected routes that require authentication */}
        <Route element={<ProtectedRoute />}>
        
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/new" element={<RoleForm />} />
          <Route path="/roles/edit/:id" element={<RoleForm />} />
        </Route>
      </Route>

      {/* Redirect any unknown path to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;