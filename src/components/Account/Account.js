import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Spinner from '../Spinner.js/Spinner';
import './Account.scss';

const fetchProfile = async (id) => {
  const profile = await axiosInstance.get(`/profiles/${id}?populate=*`);
  return profile.data.data;
};

const Account = () => {
  const { data, status, refetch } = useQuery(['user-data'], () =>
    fetchProfile(profileId)
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const profileId = localStorage.getItem('profileId');

  useEffect(() => {
    setName(data?.attributes.name);
  }, [data]);

  const updateData = async () => {
    await axiosInstance.put('/profiles/' + profileId, { data: { name: name } });
    refetch();
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="acc-container">
      <div className="acc-container__my-account">
        <div className="acc-container__my-account__image-container">
          <img
            src={
              'https://pm-app-bek.herokuapp.com' +
              data?.attributes.profilePhoto.data?.attributes.url
            }
          />{' '}
          <div className="acc-container__my-account__image-container__edit-icon">
            <i class="fas fa-pen"></i>
          </div>
        </div>
        <div>
          <span>Name: </span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span>Email: {data?.attributes.email}</span>
        </div>
        <div>
          <span>Password: </span>
          <input
            type={'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
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
