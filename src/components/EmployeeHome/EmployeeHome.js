import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import employee from '../../services/EmployeeService';
import EmployeeInfo from './EmployeeInfo';

import Spinner from '../Spinner.js/Spinner';
import './EmployeeHome.scss';
import Rocket from '../../assets/rocket2.png';
import { FiEdit } from 'react-icons/fi';

//U employeedata treba da se ubaci paginacija u get req
const fetchProjects = async (profileId, nameFilter) => {
    const response = employee.employeeData(profileId, nameFilter);
    return response;
};

const EmployeeHome = () => {
    const storageId = localStorage.getItem('userId');
    const profileId = localStorage.getItem('profileId');
    const [nameFilter, setNameFilter] = useState('');

    const { data, status } = useQuery(
        ['projects', nameFilter],
        () => fetchProjects(profileId, nameFilter),
        {
            keepPreviousData: true,
        },
    );

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
                    <div className="header-logo">
                        <img
                            className="header-logo__project-image"
                            src={Rocket}
                            alt="Rocket"
                        />
                    </div>
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
                                    <EmployeeInfo
                                        id={project.id}
                                        name={project.attributes.name}
                                        logo={
                                            project.attributes?.logo?.data
                                                ?.attributes?.url
                                        }
                                        projectManagerName={
                                            project.attributes?.project_manager
                                                ?.data?.attributes?.name
                                        }
                                        projectManagerPhoto={
                                            project.attributes?.project_manager
                                                ?.data?.attributes?.profilePhoto
                                                ?.data?.attributes?.url
                                        }
                                        employeeNumber={
                                            project.attributes?.employees?.data
                                                ?.length
                                        }
                                    />
                                </React.Fragment>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default EmployeeHome;
