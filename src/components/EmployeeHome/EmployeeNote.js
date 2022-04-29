import React from 'react';

import './SingleNote.scss';

const EmployeeNote = (props) => {
  return (
    <div className="note">
      <div className="note__content">
        <div className="note__head">
          <p className="title">{props.name}</p>
          <div>Note title:</div>
        </div>
        <div className="note__description">
          {' '}
          <div>
            <p className="description"> {props.description}</p>
          </div>
          <div>Note description:</div>
        </div>

        <div className="note__footer">
          <img
            className="footer-img"
            src={'https://pm-app-bek.herokuapp.com' + props.photo}
            alt="profile-photo"
          />
          <p className="footer-pmName">{props.pmName}</p>
          <div className="footer-details">Project manager:</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNote;
