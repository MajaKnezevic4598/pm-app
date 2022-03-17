import { useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';

function App() {
  useEffect(() => {
    axiosInstance.get('/categories').then((data) => console.log(data));
  }, []);
  return <div className="App">Hello world!</div>;
}

export default App;
