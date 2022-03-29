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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const profileId = localStorage.getItem('profileId');

  useEffect(() => {
    setName(data?.attributes.name);
  }, [data]);

  const uploadImage = async (id) => {
    const formData = new FormData();

    formData.append('files', picture[0]);

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

  const updateData = async () => {
    //todo - delete
    if (picture) {
      await uploadImage(profileId);
    }
    await axiosInstance.put('/profiles/' + profileId, { data: { name: name } });
    refetch();
  };

  useEffect(() => {
    console.log(data?.attributes.profilePhoto.data);
  }, [data]);

  if (status === 'loading') {
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
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="inputs">
          <span>Confirm Password: </span>
          <input
            type={'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
