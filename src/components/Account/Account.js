import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Spinner from '../Spinner.js/Spinner';
import './Account.scss';
import Default from '../../assets/no-image.png';

const fetchProfile = async (id) => {
  const profile = await axiosInstance.get(`/profiles/${id}?populate=*`);
  return profile.data.data;
};

const Account = () => {
  const { data, status, refetch } = useQuery(['user-data'], () =>
    fetchProfile(profileId)
  );
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const profileId = localStorage.getItem('profileId');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setName(data?.attributes.name);
  }, [data]);

  const uploadImage = async (id) => {
    const formData = new FormData();

    formData.append('files', picture[0]);

    axiosInstance
      .post('/upload', formData)
      .then((response) => {
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

  const updateData = async () => {
    //todo - delete
    setLoading(true);
    if (picture) {
      await uploadImage(profileId);
    }
    if (password.length >= 6 && password === confirmPassword) {
      await axiosInstance.put('/users/' + userId, {
        password: password,
      });
    }
    if (name !== '') {
      await axiosInstance.put('/profiles/' + profileId, {
        data: { name: name },
      });
    }
    refetch();
    setLoading(false);
  };

  if (status === 'loading' || loading) {
    return <Spinner />;
  }

  return (
    <div className="acc-container">
      <div className="acc-container__my-account">
        <div className="acc-container__my-account__image-container">
          {!picture ? (
            <img
              src={
                data?.attributes.profilePhoto.data === null
                  ? Default
                  : 'https://pm-app-bek.herokuapp.com' +
                    data?.attributes.profilePhoto.data?.attributes.url
              }
              alt="profile-photo"
            />
          ) : (
            <img src={URL.createObjectURL(picture[0])} alt="profile-photo" />
          )}

          <input
            id="file-upload"
            type="file"
            onChange={(e) => setPicture(e.target.files)}
          />
          <label
            htmlFor="file-upload"
            className="acc-container__my-account__image-container__edit-icon"
          >
            <i className="fas fa-pen"></i>
          </label>
        </div>
        <div className="inputs">
          <span>Name: </span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inputs">
          <span>Email: </span>
          <span style={{ marginBottom: '16px', fontSize: '1.3rem' }}>
            {data?.attributes.email}
          </span>
        </div>
        <div className="inputs">
          <span>Password: </span>
          <input
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputs">
          <span>Confirm Password: </span>
          <input
            type={'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button style={{ cursor: 'pointer' }} onClick={updateData}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Account;
