import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner.js/Spinner';
import './AdminUsers.scss';
import UserBox from './UserBox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function compare(a, b) {
  if (a.attributes.createdAt > b.attributes.createdAt) {
    return -1;
  }
  if (a.attributes.createdAt < b.attributes.createdAt) {
    return 1;
  }
  return 0;
}

const fetchUsers = async (page, profileId, nameFilter) => {
  //PODICI LIMIT NA 25
  const res = await axiosInstance.get(
    `/profiles?sort=createdAt:DESC&populate=*&pagination[pageSize]=3&pagination[page]=${page}&filters[id][$ne]=${profileId}&filters[name][$containsi]=${nameFilter}`
  );
  console.log(res?.data);
  return res?.data;
};

const AdminUsers = () => {
  const storageId = localStorage.getItem('userId');
  const profileId = localStorage.getItem('profileId');
  const [searching, setSearching] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [futureId, setFutureId] = useState(null);
  const [futureProfileId, setFutureProfileId] = useState(null);
  const [page, setPage] = useState(1);

  const { data, status, refetch } = useQuery(
    ['users', page, nameFilter],
    () => fetchUsers(page, profileId, nameFilter),
    {
      keepPreviousData: true,
    }
  );
  const pageCount = data?.meta.pagination.pageCount;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleApprove = async (id, confirmed) => {
    const shouldConfirm = confirmed === true ? true : false;
    if (profileId != id) {
      await axiosInstance.put(`/profiles/${id}`, {
        data: { confirmed: !shouldConfirm },
      });
    }

    // if (searching === true) {
    //   const foundUser = filteredUsers.find((user) => user.id === id);
    //   foundUser.attributes.confirmed = !shouldConfirm;
    // }

    refetch();
  };

  // useEffect(() => {
  //   let newProfiles = [];
  //   if (nameFilter !== '') {
  //     data?.data?.map((profile) => {
  //       if (
  //         profile.attributes.name
  //           .toLowerCase()
  //           .includes(nameFilter.toLowerCase())
  //       ) {
  //         newProfiles.push(profile);
  //       }
  //     });
  //     setFilteredUsers(newProfiles);
  //   } else {
  //     setFilteredUsers(data?.data ? data?.data : []);
  //     setSearching(false);
  //   }
  // }, [nameFilter]);

  const searchByName = (e) => {
    // if (e.target.value === '') {
    //   setNameFilter(e.target.value);
    //   setSearching(false);
    //   return;
    // }
    setNameFilter(e.target.value);
    // setSearching(true);
  };

  const deleteProfile = async () => {
    if (futureId) {
      await axiosInstance.delete('/users/' + futureId);
    }
    await axiosInstance.delete('/profiles/' + futureProfileId);
    // if (searching === true) {
    //   setFilteredUsers(
    //     filteredUsers.filter((user) => user.id !== futureProfileId)
    //   );
    // }
    setShowModal(false);
    setFutureId(null);
    setFutureProfileId(null);
    refetch();
  };

  const modalOn = () => {
    setShowModal(true);
  };

  const modallOff = () => {
    setShowModal(false);
    setFutureId(null);
    setFutureProfileId(null);
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  // const FilteredProfiles = () => {
  //   return filteredUsers?.map((user) => {
  //     if (user.id != profileId) {
  //       return (
  //         <UserBox
  //           key={user.id}
  //           name={user.attributes.name}
  //           email={user.attributes.email}
  //           role={user.attributes.role}
  //           confirmed={user.attributes.confirmed}
  //           id={user.id}
  //           toggleApprove={toggleApprove}
  //           userId={user.attributes?.userId?.data?.id}
  //           deleteProfile={deleteProfile}
  //           img={user.attributes?.profilePhoto?.data?.attributes?.url}
  //           setId={setFutureId}
  //           setProfileId={setFutureProfileId}
  //           toggleModal={modalOn}
  //         />
  //       );
  //     }
  //   });
  // };

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
          {
            // data.data && !searching ?
            data?.data?.length !== 0 ? (
              data?.data?.map((user) => {
                // if (user.id != profileId) {
                return (
                  <UserBox
                    key={user.id}
                    name={user.attributes.name}
                    email={user.attributes.email}
                    role={user.attributes.role}
                    confirmed={user.attributes.confirmed}
                    id={user.id}
                    toggleApprove={toggleApprove}
                    img={user.attributes?.profilePhoto?.data?.attributes?.url}
                    userId={user.attributes?.userId?.data?.id}
                    setId={setFutureId}
                    setProfileId={setFutureProfileId}
                    toggleModal={modalOn}
                  />
                );
                // }
              })
            ) : (
              <div style={{ marginBottom: '18px' }}>No users found</div>
            )
            // : FilteredProfiles()
            // <FilteredProfiles />
          }
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Modal
        show={showModal}
        modalClosed={modallOff}
        clickFirst={modallOff}
        clickSecond={deleteProfile}
      />
    </div>
  );
};

export default AdminUsers;
