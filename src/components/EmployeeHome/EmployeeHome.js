import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import employee from '../../services/EmployeeService';
import EmployeeInfo from './EmployeeInfo';

import Spinner from '../Spinner.js/Spinner';
import './EmployeeHome.scss';
import Rocket from '../../assets/rocket2.png';
import Pagination from '@mui/material/Pagination';
import { FiEdit } from 'react-icons/fi';
import SingleProjectCard from '../PMHome/SingleProjectCard';

const fetchProjects = async (profileId, nameFilter, page) => {
  const response = employee.employeeData(profileId, nameFilter, page);
  return response;
};

const EmployeeHome = () => {
  const storageId = localStorage.getItem('userId');
  const profileId = localStorage.getItem('profileId');
  const [nameFilter, setNameFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(
    ['projects', page, nameFilter],
    () => fetchProjects(profileId, nameFilter, page),
    {
      keepPreviousData: true,
    }
  );

  const pageCount = data?.meta.pagination.pageCount;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const searchByName = (e) => {
    setNameFilter(e.target.value);
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="employee">
      <div className="employee__description">
        <div className="flex-container">
          <div className="header-logo"></div>
          <div className="employee__description__left">
            <div>My Projects</div>
            <div>Here you'll find your projects.</div>
          </div>
        </div>
        <div className="employee__description__right">
          <input
            value={nameFilter}
            onChange={searchByName}
            type={'text'}
            placeholder="Search"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div className="employee__content">
          {data?.data?.map((project, id) => {
            if (project.id != profileId) {
              return (
                <React.Fragment key={project.id}>
                  <SingleProjectCard
                    id={project.id}
                    // key={uuid()}
                    key={project.id}
                    manager={
                      project.attributes?.project_manager.data?.attributes.name
                    }
                    prName={project.attributes.name}
                    pmImage={
                      project.attributes.project_manager.data?.attributes
                        .profilePhoto.data?.attributes.url
                    }
                    projectLogo={
                      project?.attributes?.logo?.data?.attributes?.url
                    }
                    employees={project.attributes.employees.data?.length}
                    projectDescription={project.attributes.description}
                    projectId={project.id}
                    isEmployee={true}
                  />
                </React.Fragment>
              );
            }
          })}
        </div>
      </div>
      <Pagination
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeHome;
