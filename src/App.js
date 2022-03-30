import { useContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import axiosInstance from './helpers/axiosInstance';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import PMRoutes from './routes/PMRoutes';
import UncomfirmedRoutes from './routes/UncomfirmedRoutes';
import Spinner from './components/Spinner.js/Spinner';
import Header from './components/Header/Header';
import LoadingRoutes from './routes/LoadingRoutes';
import { useQuery } from 'react-query';

const fetchConfirmed = async (userId) => {
    if (userId) {
        const res = await axiosInstance.get(
            `/profiles?filters[userId][id][$eq]=${userId}&populate=*`,
        );
        return res.data.data[0].attributes.confirmed;
    }
};

function App() {
    const { loggedIn } = useContext(AuthContext);
    const [uncomfirmed, setUncomfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');

    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const checkUncomfirmed = async () => {
            let profile;
            if (userId) {
                setLoading(true);
                profile = await axiosInstance.get(
                    `/profiles?filters[userId][id][$eq]=${userId}&populate=*`,
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
                <PublicRoutes />
            )}
        </div>
    );
}

export default App;
