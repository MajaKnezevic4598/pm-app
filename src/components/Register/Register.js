import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

import AuthContext from '../../context/AuthContext';
import useInput from '../../hooks/use-input';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(null);
  //definisati role set role
  const [role, setRole] = useState(0);
  const { getLoggedIn } = useContext(AuthContext);

  const nameRegEx = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/g;
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

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => nameRegEx.test(value));

  const {
    value: enteredUserName,
    hasError: userNameInputHasError,
    isValid: enteredUserNameIsValid,
    valueChangeHandler: userNameChangedHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput((value) => nameRegEx.test(value));

  useEffect(() => {
    if (hasError) {
      if (
        emailRegEx.test(enteredEmail) &&
        enteredPassword.length > 5 &&
        nameRegEx.test(enteredName) &&
        nameRegEx.test(enteredUserName)
      ) {
        setHasError(false);
      }
    }
    return () => {
      setHasError(false);
    };
  }, [enteredEmail, enteredPassword, enteredName, enteredUserName]);

  const uploadImage = async (id) => {
    const formData = new FormData();

    formData.append('files', files);

    axiosInstance
      .post('/upload', formData)
      .then((response) => {
        console.log(response);
        axiosInstance.put('/profiles/' + id, {
          data: {
            profilePhoto: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerHandler = async () => {
    if (emailIsValid && passwordIsValid && enteredNameIsValid && role !== 0) {
      console.log(enteredName, enteredUserName, enteredEmail, enteredPassword);
      try {
        const data = await axiosInstance.post('/auth/local/register', {
          name: enteredName,
          username: enteredUserName,
          identifier: enteredEmail,
          password: enteredPassword,
          email: enteredEmail,
        });
        await axiosInstance.put(
          '/users/' + data.data.user.id,
          { confirmed: false, role: role },
          {
            headers: {
              //prettier-ignore
              "Authorization": "Bearer " + data.data.jwt,
            },
          }
        );

        localStorage.setItem('token', data.data.jwt);
        localStorage.setItem('userId', data.data.user.id);

        const getRegister = await axiosInstance.get('/users/me', {
          headers: {
            //prettier-ignore
            "Authorization": "Bearer " + data.data.jwt,
          },
        });
        localStorage.setItem('role', getRegister.data.role.name);

        console.log(getRegister);

        if (data) {
          //CREATE PROFILE, PROSLEDITI SVE ZIVO I NAME I USERNAME I SVEEEEE
          console.log(data.data);
          const profileCreate = await axiosInstance.post('/profiles', {
            data: {
              userId: data.data.user.id,
              name: data.data.user.name,
              email: data.data.user.email,
              profilePhoto: [],
              role: getRegister.data.role.name,
              username: data.data.user.username,
              confirmed: false,
            },
          });

          localStorage.setItem('profileId', profileCreate.data.data.id);

          if (files) {
            await uploadImage(profileCreate.data.data.id);
          }

          getLoggedIn();
          // window.location.href = '/';
          console.log(data);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    } else {
      setHasError(true);
      setIsLoading(false);
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
          <div className="register__signup">Please sign-up to continue!</div>
        </div>
      </div>
      {/* ADD FORM TO SUBMIT DATA, ADD IMAGE UPLOAD AND ROLE TO CHOSE */}
      <form
        className="register__bottom"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          value={enteredName}
          onChange={nameChangedHandler}
          type="text"
          placeholder="Full Name"
          style={{
            border:
              !enteredNameIsValid && hasError
                ? '1px solid red'
                : '1px solid #eee',
          }}
        />
        {hasError ? (
          <div
            style={{
              color: 'red',
              fontSize: '12px',
              paddingBottom: '8px',
            }}
          >
            {hasError && enteredName.length < 4 ? 'Name too short!' : null}
          </div>
        ) : null}
        {/* USERNAME */}
        <input
          value={enteredUserName}
          onChange={userNameChangedHandler}
          type="text"
          placeholder="Username"
        />
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
              fontSize: '12px',
              paddingBottom: '8px',
            }}
          >
            {hasError && enteredPassword.length < 6
              ? 'Password too short'
              : null}
          </div>
        ) : null}
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        {/* DROPDOWN ROLE, U OPTION VALUE  */}
        <label htmlFor="role-select"></label>
        <select
          onChange={(e) => setRole(e.target.value)}
          name="role"
          id="role-select"
          className="dropdown"
        >
          <option value={0}>Please Select Your Role</option>
          <option value={3}>Employee</option>
          <option value={4}>Project Manager</option>
          <option value={5}>Admin</option>
        </select>
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

export default Register;
