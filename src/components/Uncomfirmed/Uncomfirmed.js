import React from 'react';
import './Uncomfirmed.scss';

const Uncomfirmed = () => {
  return (
    <div className="uncomfirmed">
      <div className="uncomfirmed__text">
        <div className="uncomfirmed__text__title">
          Your account has not been approved yet.
        </div>
        <div>Please check back later!</div>
      </div>
    </div>
  );
};

export default Uncomfirmed;
