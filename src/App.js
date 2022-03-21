import { useContext, useEffect } from 'react';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import axiosInstance from './helpers/axiosInstance';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  //vercel
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  return (
    <div className="App">{loggedIn ? <AdminRoutes /> : <PublicRoutes />}</div>
  );
}

export default App;
