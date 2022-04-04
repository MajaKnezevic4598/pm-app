import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Default from '../../assets/no-image.png';
import Spinner from '../Spinner.js/Spinner';
import SingleNote from '../EmployeeHome/SingleNote';
import EmptyNote from '../EmployeeHome/EmptyNote';
import '../EmployeeHome/EmployeeProjectView.scss';
import axiosInstance from '../../helpers/axiosInstance';
import { useParams } from 'react-router-dom';
import CreateNewNote from './CreateNewNote';

const fetchProject = async (id) => {
    const response = await axiosInstance.get(
        '/projects/' +
            id +
            '?populate=logo&populate=employees.profilePhoto&populate=project_manager.profilePhoto',
    );
    console.log(response.data);
    return response.data;
};

const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories');
    console.log(response.data.data);
    return response.data.data;
};

const fetchAllNotes = async (id, categoryName, nameFilter, SortValue) => {
    const response = await axiosInstance.get(
        `/notes?filters[category][name][$eq]=${categoryName}&filters[project][id][$eq]=${id}&filters[title][$containsi]=${nameFilter}&sort=createdAt:${SortValue}&populate=profile.profilePhoto`,
    );
    console.log(id, categoryName);
    return response.data.data;
    // return response.data;
};

const NotesView = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [sortValue, setSortValue] = useState('DESC');
    const [changeViewState, setChangeViewState] = useState(false);

    useEffect(() => {
        // console.log(data);
        console.log(props.notes);
        console.log(changeViewState);
    }, [changeViewState]);

    const { id } = useParams();

    const { data, status } = useQuery(['project'], () => fetchProject(id), {
        keepPreviousData: true,
    });

    const { data: categories, status: categoriesStatus } = useQuery(
        ['categoryPm'],
        () => fetchCategories(),
    );

    const {
        data: notes,
        status: notesStatus,
        refetch,
    } = useQuery(
        ['notesPm', sortValue, nameFilter, categoryName],
        () => fetchAllNotes(id, categoryName, nameFilter, sortValue),
        { keepPreviousData: true },
    );

    const changeFunction = () => {
        setChangeViewState(true);
    };

    const Image = React.memo(function Image({ src }) {
        return (
            <img
                src={src}
                className="employee-info__left__picture"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Default;
                }}
                alt="SomePhoto"
            />
        );
    });
    return (
        <>
            <div className="employee">
                <div className="emp__description">
                    <div className="flex-container">
                        <div className="header-logo">
                            <Image
                                src={
                                    data?.data?.attributes.logo.data?.attributes
                                        .url
                                        ? 'https://pm-app-bek.herokuapp.com' +
                                          data?.data?.attributes.logo.data
                                              ?.attributes.url
                                        : Default
                                }
                            />
                        </div>
                        <div className="employee__description__left">
                            <div>{data?.data.attributes.name}</div>
                            <div>{data?.data.attributes.description}</div>
                        </div>
                    </div>
                    <div className="emp__description__right">
                        <div className="manager">
                            {
                                data?.data.attributes.project_manager.data
                                    ?.attributes.name
                            }
                        </div>
                        <div className="emp__description__right__pmlogo">
                            <Image
                                src={
                                    data?.data.attributes.project_manager.data
                                        ?.attributes.profilePhoto.data
                                        .attributes.url
                                        ? 'https://pm-app-bek.herokuapp.com' +
                                          data?.data.attributes.project_manager
                                              .data?.attributes.profilePhoto
                                              .data.attributes.url
                                        : Default
                                }
                            />
                        </div>
                    </div>
                    <div className="emp__description__toright">
                        <p>Employees</p>
                        {/* slice for +nesto employees */}
                        {data?.data.attributes.employees?.data.map(
                            (employee) => {
                                return (
                                    <Image
                                        src={
                                            employee.attributes.profilePhoto
                                                .data
                                                ? 'https://pm-app-bek.herokuapp.com' +
                                                  employee.attributes
                                                      .profilePhoto.data
                                                      .attributes.url
                                                : Default
                                        }
                                    />
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
            {!changeViewState ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '0 auto',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            border: '1px solid black',
                            width: '20%',
                            padding: '2px 2px',
                        }}
                        onClick={changeFunction}
                    >
                        <button>ADD NOTE</button>
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
                            <header>
                                {categories?.map((category) => {
                                    return (
                                        <section
                                            onClick={() =>
                                                setCategoryName(
                                                    category.attributes.name,
                                                )
                                            }
                                        >
                                            {category.attributes.name}
                                        </section>
                                    );
                                })}
                            </header>
                        </div>
                    </div>

                    <div>
                        {notes?.length < 1 ? <EmptyNote /> : null}
                        {notes?.map((note) => {
                            return (
                                <SingleNote
                                    name={note.attributes.title}
                                    description={note.attributes.description}
                                    photo={
                                        note.attributes.profile.data?.attributes
                                            .profilePhoto.data?.attributes.url
                                    }
                                    pmName={
                                        note.attributes.profile.data?.attributes
                                            .name
                                    }
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <CreateNewNote
                    id={id}
                    setChangeView={setChangeViewState}
                    categories={categories}
                />
            )}
        </>
    );
};

export default NotesView;
