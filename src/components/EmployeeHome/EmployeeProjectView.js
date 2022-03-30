import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import axiosInstance from '../../helpers/axiosInstance';

import Spinner from '../Spinner.js/Spinner';
import EmployeeProjectViewInfo from './EmployeeProjectViewInfo';

const fetchProjects = async (id) => {
    const response = await axiosInstance.get(
        '/projects/' +
            id +
            '?populate=project_manager.profilePhoto&populate=employees.profilePhoto&populate=logo&populate=notes',
    );
    return response.data.data;
};

const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories');
    console.log('neka izmena');
    return response.data.data;
};

const fetchAllNotes = async (id, categoryName) => {
    const response = await axiosInstance.get(
        `/notes?filters[category][name][$eq]=${categoryName}&filters[project][id][$eq]=${id}`,
    );
    console.log(id, categoryName);
    return response.data.data;
};

const EmployeeProjectView = (props) => {
    const storageId = localStorage.getItem('userId');
    const profileId = localStorage.getItem('profileId');
    const [categoryName, setCategoryName] = useState('');

    const { id } = useParams();

    const { data, status } = useQuery(['singleProjects'], () =>
        fetchProjects(id),
    );

    const { data: notes, status: notesStatus } = useQuery(
        ['notesEmployee', categoryName],
        () => fetchAllNotes(id, categoryName),
    );

    const { data: categories, status: categoriesStatus } = useQuery(
        ['categoryEmployee'],
        () => fetchCategories(),
    );

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
                        logo={data?.attributes.logo.data.attributes.url}
                        projectManagerName={
                            data?.attributes.project_manager.data.attributes
                                .name
                        }
                        employeeNumber={
                            data?.attributes?.employees?.data?.length
                        }
                        projectManagerPhoto={
                            data?.attributes.project_manager.data?.attributes
                                .profilePhoto?.data?.attributes?.url
                        }
                        employees={data?.attributes.employees.data}
                        setCategoryName={setCategoryName}
                        categories={categories}
                        notes={notes}
                        status={notesStatus}
                    />
                </div>
            </div>
        </>
    );
};

export default EmployeeProjectView;
