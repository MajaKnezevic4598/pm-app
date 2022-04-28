import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner.js/Spinner';
import './Categories.scss';
import SingleCategory from './SingleCategory';

const fetchCategories = async () => {
  const res = await axiosInstance.get('/categories?sort=createdAt:DESC');
  return res?.data?.data;
};

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data, status, refetch } = useQuery(['categories'], () =>
    fetchCategories()
  );

  const deleteCategory = async () => {
    await axiosInstance.delete('/categories/' + categoryId);
    setCategoryId(null);
    setShowModal(false);
    refetch();
  };

  const publishNewCategory = async () => {
    if (categoryName !== '') {
      await axiosInstance.post('/categories', { data: { name: categoryName } });
    }
    setCategoryName('');
    refetch();
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  const onUpdateFinish = () => {
    refetch();
  };

  const modalOn = () => {
    setShowModal(true);
  };

  const modallOff = () => {
    setShowModal(false);
    setCategoryId(null);
  };

  return (
    <div className="categories">
      <div className="categories__description">
        <div className="categories__description__left">
          <div>All categories</div>
          <div>Create or update note categories</div>
        </div>
        <div className="categories__description__right">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type={'text'}
            placeholder="Category Name"
          />
          <button onClick={publishNewCategory}>Create Category</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="categories__content">
          {data?.map((category) => (
            <SingleCategory
              name={category.attributes.name}
              key={category.id}
              id={category.id}
              onFinish={onUpdateFinish}
              toggleModal={modalOn}
              setCategoryId={setCategoryId}
            />
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        modalClosed={modallOff}
        clickFirst={modallOff}
        clickSecond={deleteCategory}
      />
    </div>
  );
};

export default Categories;
