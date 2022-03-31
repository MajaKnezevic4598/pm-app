import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner.js/Spinner';
import './AdminUsers.scss';
import UserBox from './UserBox';
import Pagination from '@mui/material/Pagination';

const fetchUsers = async (page, profileId, nameFilter) => {
  //PODICI LIMIT NA 25
  const res = await axiosInstance.get(
    `/profiles?sort=createdAt:DESC&populate=*&pagination[pageSize]=3&pagination[page]=${page}&filters[id][$ne]=${profileId}&filters[name][$containsi]=${nameFilter}`
  );
  // console.log(res?.data);
  return res?.data;
};

const AdminUsers = () => {
  const profileId = localStorage.getItem('profileId');
  const [nameFilter, setNameFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [futureId, setFutureId] = useState(null);
  const [futureProfileId, setFutureProfileId] = useState(null);
  const [page, setPage] = useState(1);

  const { data, status, refetch } = useQuery(
    ['users', page],
    () => fetchUsers(page, profileId, nameFilter),
    {
      keepPreviousData: true,
    }
  );
  const pageCount = data?.meta.pagination.pageCount;

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, [300]);

    return () => {
      clearInterval(timer);
    };
  }, [nameFilter]);

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

    refetch();
  };

  const searchByName = (e) => {
    setNameFilter(e.target.value);
  };

  const deleteProfile = async () => {
    if (futureId) {
      await axiosInstance.delete('/users/' + futureId);
    }
    await axiosInstance.delete('/profiles/' + futureProfileId);

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
          {data?.data?.length !== 0 ? (
            data?.data?.map((user) => {
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
            })
          ) : (
            <div style={{ marginBottom: '18px' }}>No users found</div>
          )}
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
