import { useContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import axiosInstance from './helpers/axiosInstance';
import AdminRoutes from './routes/AdminRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import PMRoutes from './routes/PMRoutes';
import PublicRoutes from './routes/PublicRoutes';
import UncomfirmedRoutes from './routes/Uncomfirmed';

function App() {
  //vercel
  const { loggedIn } = useContext(AuthContext);
  const [uncomfirmed, setUncomfirmed] = useState(false);

  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkUncomfirmed = async () => {
      const profile = await axiosInstance.get(
        `/profiles?filters[userId][id][$eq]=${userId}&populate=*`
      );
      if (profile.data.data[0].attributes.confirmed === false) {
        setUncomfirmed(true);
      } else {
        setUncomfirmed(false);
      }
    };

    checkUncomfirmed();
  }, [loggedIn]);

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
        <PublicRoutes />
      )}
    </div>
  );
}

export default App;
