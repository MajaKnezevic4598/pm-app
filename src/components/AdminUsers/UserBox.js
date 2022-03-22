import React from 'react';
import './UserBox.scss';
import Default from '../../assets/no-image.png';
import axiosInstance from '../../helpers/axiosInstance';

const UserBox = (props) => {
  return (
    <div className="user-box">
      <div className="user-box__left">
        <img
          src={props.img ? props.img : Default}
          className="user-box__left__picture"
        />
        <div className="user-box__left__desc">
          <div>{props.name}</div>
          <div>{props.role}</div>
        </div>
      </div>
      <div className="user-box__right">
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => props.toggleApprove(props.id, props.confirmed)}
        >
          {props.confirmed
            ? // <i style={{ color: 'red' }} className="fas fa-thumbs-down"></i>
              'Unapprove'
            : 'Approve'
              // <i style={{ color: 'green' }} className="fas fa-thumbs-up"></i>
          }
        </div>
        <div onClick={() => props.deleteProfile(props.id)}>
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
