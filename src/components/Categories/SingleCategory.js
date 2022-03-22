import React from 'react';
import './SingleCategory.scss';

const SingleCategory = (props) => {
  return (
    <div className="category-box">
      <div className="category-box__left">
        <div className="category-box__left__desc">
          <div>{props.name}</div>
        </div>
      </div>
      <div className="category-box__right">
        <div style={{ cursor: 'pointer' }}></div>
        <div onClick={() => props.deleteCategory(props.id)}>
          <i
            style={{ color: '#8D0000', cursor: 'pointer' }}
            className="fas fa-trash-alt"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
