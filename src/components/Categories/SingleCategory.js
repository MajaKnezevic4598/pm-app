import React, { useState } from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import './SingleCategory.scss';

const SingleCategory = (props) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [nameValue, setNameValue] = useState(props.name ? props.name : '');
  const [hasError, setHasError] = useState(false);

  const updateNameStart = () => {
    setShouldUpdate(true);
  };

  const onInputChange = (e) => {
    setNameValue(e.target.value);
  };

  const updateNameFinish = async () => {
    if (nameValue !== '') {
      await axiosInstance.put('/categories/' + props.id, {
        data: {
          name: nameValue,
        },
      });
      setShouldUpdate(false);
      props.onFinish();
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="category-box">
      <div className="category-box__left">
        {!shouldUpdate ? (
          <div className="category-box__left__desc">
            <div>{props.name}</div>
          </div>
        ) : (
          <input
            style={{
              fontSize: '24px',
              border:
                hasError && nameValue.length === 0 ? '1px solid red' : 'none',
            }}
            autoFocus
            value={nameValue}
            onChange={onInputChange}
          />
        )}
      </div>
      <div className="category-box__right">
        <div style={{ cursor: 'pointer' }}></div>
        {!shouldUpdate ? (
          <i onClick={updateNameStart} className="fas fa-pen-square"></i>
        ) : (
          <i onClick={updateNameFinish} className="fas fa-check-square"></i>
        )}
        <div
          onClick={() => {
            props.setCategoryId(props.id);
            props.toggleModal();
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

export default SingleCategory;
