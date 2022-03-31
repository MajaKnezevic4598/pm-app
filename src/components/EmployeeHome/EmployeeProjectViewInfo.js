import React, { useEffect } from 'react';

import Default from '../../assets/no-image.png';
import Spinner from '../Spinner.js/Spinner';
import './EmployeeProjectView.scss';
import SingleNote from './SingleNote';
import EmptyNote from './EmptyNote';

const EmployeeProjectViewInfo = (props) => {
    useEffect(() => {
        // console.log(data);
        console.log(props.notes);
    }, [props.notes]);

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
                                    props.logo
                                        ? 'https://pm-app-bek.herokuapp.com' +
                                          props.logo
                                        : Default
                                }
                            />
                        </div>
                        <div className="employee__description__left">
                            <div>{props.name}</div>
                            <div>{props.description}</div>
                        </div>
                    </div>
                    <div className="emp__description__right">
                        <div className="manager">
                            {props.projectManagerName}
                        </div>
                        <div className="emp__description__right__pmlogo">
                            <Image
                                src={
                                    props.projectManagerPhoto
                                        ? 'https://pm-app-bek.herokuapp.com' +
                                          props.projectManagerPhoto
                                        : Default
                                }
                            />
                        </div>
                    </div>
                    <div className="emp__description__toright">
                        <p>Employees</p>
                        {/* slice for +nesto employees */}
                        {props.employees.map((employee) => {
                            return (
                                <Image
                                    src={
                                        employee.attributes.profilePhoto.data
                                            ? 'https://pm-app-bek.herokuapp.com' +
                                              employee.attributes.profilePhoto
                                                  .data.attributes.url
                                            : Default
                                    }
                                />
                            );
                        })}
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
                        <header>
                            {props.categories?.map((category) => {
                                return (
                                    <section
                                        onClick={() =>
                                            props.setCategoryName(
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
            </div>
            <div>
                {/* Ovo mozes ubaciti na kraju kad namestis sve. */}
                {/* {props.status === 'loading' ? <Spinner /> : null} */}
                {props.notes?.length < 1 ? <EmptyNote /> : null}
                {props.notes?.map((note) => {
                    return (
                        <SingleNote
                            name={note.attributes.title}
                            description={note.attributes.description}
                            photo={
                                note.attributes.profile.data?.attributes
                                    .profilePhoto.data?.attributes.url
                            }
                            pmName={
                                note.attributes.profile.data?.attributes.name
                            }
                        />
                    );
                })}
            </div>
        </>
    );
};

export default EmployeeProjectViewInfo;
