import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState();

    const checkJwtValid = (exp) => {
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    };

    async function getLoggedIn() {
        const tokenStorage = localStorage.getItem('token');
        if (tokenStorage) {
            let decoded = jwtDecode(tokenStorage);
            if (checkJwtValid(decoded.exp)) {
                setLoggedIn(true);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setLoggedIn(false);
            }
        }
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };
