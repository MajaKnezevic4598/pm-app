import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import Spinner from '../Spinner.js/Spinner';
import './Categories.scss';
import SingleCategory from './SingleCategory';

const fetchCategories = async () => {
  const res = await axiosInstance.get('/categories');
  return res?.data.data;
};

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');

  const { data, status, refetch } = useQuery(['categories'], () =>
    fetchCategories()
  );

  const deleteCategory = async (id) => {
    await axiosInstance.delete('/categories/' + id);
    refetch();
  };

  const publishNewCategory = async () => {
    await axiosInstance.post('/categories', { data: { name: categoryName } });
    refetch();
  };

  if (status === 'loading') {
    return <Spinner />;
  }

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
              deleteCategory={deleteCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
