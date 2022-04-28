import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';

import axiosInstance from './helpers/axiosInstance';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import PMRoutes from './routes/PMRoutes';
import UncomfirmedRoutes from './routes/UncomfirmedRoutes';

import LoadingRoutes from './routes/LoadingRoutes';

function App() {
  const { loggedIn } = useContext(AuthContext);
  const [uncomfirmed, setUncomfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const checkUncomfirmed = async () => {
      let profile;
      setLoading(true);
      if (userId) {
        profile = await axiosInstance.get(
          `/profiles?filters[userId][id][$eq]=${userId}&populate=*`
        );
        if (profile.data.data[0].attributes.confirmed === false) {
          setUncomfirmed(true);
          setLoading(false);
        } else {
          setUncomfirmed(false);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkUncomfirmed();
  }, [loggedIn]);

  if (loading) {
    return (
      <div className="App">
        <LoadingRoutes />
      </div>
    );
  }

  if (uncomfirmed) {
    return (
      <div className="App">
        <UncomfirmedRoutes />
      </div>
    );
  }

  return (
    <div className="App">
      {loggedIn && userRole === 'system_administrator' ? (
        <AdminRoutes />
      ) : loggedIn && userRole === 'employee' ? (
        <EmployeeRoutes />
      ) : loggedIn && userRole === 'project_manager' ? (
        <PMRoutes />
      ) : (
        !token && <PublicRoutes />
      )}
    </div>
  );
}

export default App;
