import { useContext, useEffect } from 'react';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import axiosInstance from './helpers/axiosInstance';
import AdminRoutes from './routes/AdminRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import PMRoutes from './routes/PMRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  //vercel
  const { loggedIn } = useContext(AuthContext);

  const userRole = localStorage.getItem('role');

  return (
    <div className="App">
      {loggedIn && userRole === 'system_administrator' ? (
        <AdminRoutes />
      ) : loggedIn && userRole === 'employee' ? (
        <EmployeeRoutes />
      ) : loggedIn && userRole === 'project_manager' ? (
        <PMRoutes />
      ) : (
        <PublicRoutes />
      )}
    </div>
  );
}

export default App;
