import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import axiosInstance from '../../helpers/axiosInstance';
import AuthContext from '../../context/AuthContext';
import Spinner from '../Spinner.js/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailRegEx.test(value));

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => +value.length > 5);

  const loginHandler = async () => {
    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const data = await axiosInstance.post('/auth/local', {
          identifier: enteredEmail,
          password: enteredPassword,
        });
        if (data) {
          localStorage.setItem('token', data.data.jwt);
          localStorage.setItem('userId', data.data.user.id);
          const profileData = await axiosInstance.get(
            '/users/' + data.data.user.id
          );
          localStorage.setItem('role', profileData.data.role.name);
          const profile = await axiosInstance.get(
            `https://pm-app-bek.herokuapp.com/api/profiles?filters[userId][id][$eq]=${data.data.user.id}&populate=*`
          );
          localStorage.setItem('profileId', profile.data.data[0].id);
          getLoggedIn();
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasError) {
      if (emailRegEx.test(enteredEmail) && enteredPassword.length > 5) {
        setHasError(false);
      }
    }

    return () => {
      setHasError(false);
    };
  }, [enteredEmail, enteredPassword]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <div className="login__top">
        <div className="login__circle"></div>
        <div className="login__top__text">
          <div
            style={{
              fontSize: '3rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Welcome</span>

            <span style={{ marginTop: '-10px' }}>Back</span>
          </div>
          <div style={{ marginTop: '10px' }}>Please sign-in to continue!</div>
        </div>
      </div>
      <form
        className="login__bottom"
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler();
        }}
      >
        <input
          value={enteredEmail}
          onChange={emailChangedHandler}
          type="email"
          placeholder="Email"
          autoComplete="email"
          style={{
            border:
              !emailIsValid && hasError ? '1px solid red' : '1px solid #eee',
          }}
        />
        <input
          value={enteredPassword}
          onChange={passwordChangedHandler}
          type={'password'}
          placeholder="Password"
          autoComplete="current-password"
          style={{
            border:
              !passwordIsValid && hasError ? '1px solid red' : '1px solid #eee',
          }}
        />
        {hasError ? (
          <div
            style={{
              color: 'red',
            }}
          >
            {hasError && enteredPassword.length < 6
              ? 'Password too short'
              : 'Invalid input'}
          </div>
        ) : null}
        <div className="login__bottom__forgot">Forgot your password?</div>
        <button
          type="submit"
          className="login__bottom__button"
          onClick={loginHandler}
        >
          Signin
        </button>
        <div className="login__bottom_signup">
          Don't have an account?{' '}
          <span
            style={{
              color: '#fbb440',
              fontWeight: 'bold',
              marginLeft: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/register')}
          >
            Signup
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
