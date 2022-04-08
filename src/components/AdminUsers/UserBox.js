import React, { useCallback, useEffect, useState } from 'react';
import './UserBox.scss';
import Default from '../../assets/no-image.png';
import axiosInstance from '../../helpers/axiosInstance';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const Image = React.memo(function Image({ src }) {
  return (
    <img
      src={src}
      className="user-box__left__picture"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = Default;
      }}
    />
  );
});

const UserBox = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="user-box">
      <div className="user-box__left">
        <Image
          src={
            props.img ? 'https://pm-app-bek.herokuapp.com' + props.img : Default
          }
        />

        <div className="user-box__left__desc">
          <div>{props.name}</div>
          <div>{props.role}</div>
        </div>
      </div>
      <div className="user-box__right">
        <span
          className="user-box__right__more"
          onClick={() => setModalOpen(true)}
        >
          <BsBoxArrowUpRight />
        </span>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => props.toggleApprove(props.id, props.confirmed)}
        >
          {
            props.confirmed
              ? // <i style={{ color: 'red' }} className="fas fa-thumbs-down"></i>
                'Unapprove'
              : 'Approve'
            // <i style={{ color: 'green' }} className="fas fa-thumbs-up"></i>
          }
        </div>

        <div
          onClick={() => {
            props.toggleModal();
            props.setId(props.userId);
            props.setProfileId(props.id);
          }}
        >
          <i
            style={{ color: '#8D0000', cursor: 'pointer' }}
            className="fas fa-trash-alt"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
