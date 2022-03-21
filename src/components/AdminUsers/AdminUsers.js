import React, { useEffect, useState } from 'react';
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
  useEffect(() => {
    console.log(data);
  }, [data]);

  const toggleApprove = async (id, confirmed) => {
    const shouldConfirm = confirmed === true ? true : false;
    console.log(shouldConfirm);
    if (storageId != id) {
      await axiosInstance.put(`/users/${id}`, { confirmed: !shouldConfirm });
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
      if (newProfiles.length === 0) {
      }
    } else {
      setFilteredUsers(data ? data : []);
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
            placeholder="search"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="users__content">
          {data && !searching
            ? data?.map((user) => {
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
            : filteredUsers?.map((user) => {
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
              })}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
