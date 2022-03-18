import { useEffect } from 'react';
import Login from './components/Login/Login';
import axiosInstance from './helpers/axiosInstance';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <div className="App">
      <PublicRoutes />
    </div>
  );
}

export default App;
