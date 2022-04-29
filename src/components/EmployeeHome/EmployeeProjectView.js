import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import axiosInstance from '../../helpers/axiosInstance';

import './EmployeeProjectView.scss';
import Spinner from '../Spinner.js/Spinner';
import EmployeeProjectViewInfo from './EmployeeProjectViewInfo';

const fetchProjects = async (id) => {
  const response = await axiosInstance.get(
    `/projects/ ` +
      id +
      `?populate=project_manager.profilePhoto&populate=employees.profilePhoto&populate=logo&populate=notes`
  );
  return response.data.data;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data.data;
};

const fetchAllNotes = async (id, categoryName, nameFilter, SortValue) => {
  const response = await axiosInstance.get(
    `/notes?filters[category][name][$eq]=${categoryName}&filters[project][id][$eq]=${id}&filters[title][$containsi]=${nameFilter}&sort=createdAt:${SortValue}&populate=profile.profilePhoto`
  );
  return response.data.data;
};

const EmployeeProjectView = (props) => {
  const storageId = localStorage.getItem('userId');
  const profileId = localStorage.getItem('profileId');
  const [categoryName, setCategoryName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [sortValue, setSortValue] = useState('DESC');

  const { id } = useParams();

  const { data, status } = useQuery([`singleProjects-${id}`], () =>
    fetchProjects(id)
  );

  const {
    data: notes,
    status: notesStatus,
    refetch,
  } = useQuery(
    ['notesEmployee', sortValue, nameFilter, categoryName],
    () => fetchAllNotes(id, categoryName, nameFilter, sortValue),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, [300]);

    return () => {
      clearInterval(timer);
    };
  }, [nameFilter]);

  const { data: categories, status: categoriesStatus } = useQuery(
    ['categoryEmployee'],
    () => fetchCategories()
  );

  const searchByName = (e) => {
    setNameFilter(e.target.value);
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <div>
          <EmployeeProjectViewInfo
            id={data?.id}
            name={data?.attributes.name}
            description={data?.attributes.description}
            logo={data?.attributes.logo.data?.attributes.url}
            projectManagerName={
              data?.attributes.project_manager.data.attributes.name
            }
            employeeNumber={data?.attributes?.employees?.data?.length}
            projectManagerPhoto={
              data?.attributes.project_manager.data?.attributes.profilePhoto
                ?.data?.attributes?.url
            }
            employees={data?.attributes.employees.data}
            setCategoryName={setCategoryName}
            categoryName={categoryName}
            categories={categories}
            notes={notes}
            status={notesStatus}
            nameFilter={nameFilter}
            searchByName={searchByName}
            setSortValue={setSortValue}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeProjectView;
