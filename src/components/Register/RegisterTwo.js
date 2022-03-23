import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

import AuthContext from '../../context/AuthContext';
import useInput from '../../hooks/use-input';
import './Register.scss';

const RegisterTwo = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = async (e) => {
        e.preventDefault();
        //axios logic
        try {
            const data = await axiosInstance.post('/auth/local/register', {
                name,
                username,
                identifier: email,
                password,
            });
            const token = data.data.jwt;
            localStorage.setItem('token', token);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="register">
            <div className="register__top">
                <div className="register__circle"></div>
                <div className="register__top__text">
                    <div
                        style={{
                            fontSize: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span>Create</span>
                        <span className="register__account">Account</span>
                    </div>
                    <div className="register__signup">
                        Please sign-up to continue!
                    </div>
                </div>
            </div>
            {/* ADD FORM TO SUBMIT DATA */}
            <form
                className="register__bottom"
                onSubmit={(e) => {
                    registerHandler();
                }}
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                />

                {/* USERNAME */}
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    placeholder="Password"
                    autoComplete="current-password"
                />

                <button
                    type="submit"
                    className="register__bottom__button"
                    onClick={registerHandler}
                >
                    Sign Up
                </button>
                <div className="login__bottom_signup">
                    Already have an account?{' '}
                    <span
                        style={{
                            color: '#fbb440',
                            fontWeight: 'bold',
                            marginLeft: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </span>
                </div>
            </form>
        </div>
    );
};

export default RegisterTwo;
