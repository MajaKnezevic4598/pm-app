import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/use-input';

const Login = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

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

  const loginHandler = () => {
    if (emailIsValid && passwordIsValid) {
      console.log(enteredEmail);
      console.log(enteredPassword);
    } else {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (hasError) {
      if (emailRegEx.test(enteredEmail) && enteredPassword.length > 5) {
        setHasError(false);
      }
    }
  }, [enteredEmail, enteredPassword]);

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
