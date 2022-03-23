import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Spinner from '../Spinner.js/Spinner';
import './AdminUsers.scss';
import UserBox from './UserBox';

function compare(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return 0;
}

const fetchUsers = async () => {
  const res = await axiosInstance.get('/users');
  const sortedRes = res?.data.sort(compare);
  return sortedRes;
};

const AdminUsers = () => {
  const storageId = localStorage.getItem('userId');
  const [searching, setSearching] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data, status, refetch } = useQuery(['users'], () => fetchUsers());

  const toggleApprove = async (id, confirmed) => {
    const shouldConfirm = confirmed === true ? true : false;
    if (storageId != id) {
      await axiosInstance.put(`/users/${id}`, { confirmed: !shouldConfirm });
    }

    if (searching === true) {
      const foundUser = filteredUsers.find((user) => user.id === id);
      foundUser.confirmed = !shouldConfirm;
    }

    refetch();
  };

  useEffect(() => {
    let newProfiles = [];
    if (nameFilter !== '') {
      data?.map((profile) => {
        if (profile.name.toLowerCase().includes(nameFilter.toLowerCase())) {
          newProfiles.push(profile);
        }
      });
      setFilteredUsers(newProfiles);
    } else {
      setFilteredUsers(data ? data : []);
      setSearching(false);
    }
  }, [nameFilter]);

  const searchByName = (e) => {
    if (e.target.value === '') {
      setNameFilter(e.target.value);
      setSearching(false);
      return;
    }
    setNameFilter(e.target.value);
    setSearching(true);
  };

  const deleteProfile = async (id) => {
    await axiosInstance.delete('/users/' + id);
    refetch();
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  const FilteredProfiles = () => {
    return filteredUsers?.map((user) => {
      if (user.id != storageId) {
        return (
          <UserBox
            key={user.id}
            name={user.name}
            email={user.email}
            role={user.role.description}
            confirmed={user.confirmed}
            id={user.id}
            toggleApprove={toggleApprove}
            deleteProfile={deleteProfile}
          />
        );
      }
    });
  };

  return (
    <div className="users">
      <div className="users__description">
        <div className="users__description__left">
          <div>All Users</div>
          <div>Approve or delete users</div>
        </div>
        <div className="users__description__right">
          <input
            value={nameFilter}
            onChange={searchByName}
            type={'text'}
            placeholder="Search"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="users__content">
          {data && !searching ? (
            data?.map((user) => {
              if (user.id != storageId) {
                return (
                  <UserBox
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    role={user.role.description}
                    confirmed={user.confirmed}
                    id={user.id}
                    toggleApprove={toggleApprove}
                    deleteProfile={deleteProfile}
                  />
                );
              }
            })
          ) : (
            <FilteredProfiles />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
