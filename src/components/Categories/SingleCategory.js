import React, { useEffect, useState } from 'react';
import './SingleCategory.scss';

const SingleCategory = (props) => {
  return (
    <div className="category-box">
      <div className="category-box__left">
        {/* {!props.inp ? ( */}
        <div className="category-box__left__desc">
          <div>{props.name}</div>
        </div>
        {/* ) : ( */}
        {/* <input value={props.nameValue} onChange={props.onInputChange} /> */}
        {/* )} */}
      </div>
      <div className="category-box__right">
        <div style={{ cursor: 'pointer' }}></div>
        <div onClick={() => props.deleteCategory(props.id)}>
          {/* <button onClick={() => props.updateCategory(props.id)}>+++</button> */}
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
