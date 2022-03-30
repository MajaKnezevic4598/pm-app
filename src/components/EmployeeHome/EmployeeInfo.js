import React, { useCallback, useEffect, useState } from 'react';

import './EmployeeInfo.scss';
import Default from '../../assets/no-image.png';
import axiosInstance from '../../helpers/axiosInstance';
import { FiEdit } from 'react-icons/fi';
import PmPhoto from '../../assets/testproject.png';
import { Link } from 'react-router-dom';

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

const EmployeeInfo = (props) => {
    return (
        <div className="employee-info">
            <div className="employee-info__left">
                <Image
                    src={
                        props.logo
                            ? 'https://pm-app-bek.herokuapp.com' + props.logo
                            : Default
                    }
                />

                <div className="employee-info__left__desc">
                    <div>{props.name}</div>
                    <div className="flex__container">
                        <div className="logo">
                            <img
                                src={
                                    props.projectManagerPhoto
                                        ? 'https://pm-app-bek.herokuapp.com' +
                                          props.projectManagerPhoto
                                        : Default
                                }
                                alt="ProjectManager"
                            />
                        </div>
                        <div>{props.projectManagerName}</div>
                    </div>
                </div>
            </div>
            <div className="employee-info__right">
                <div>
                    <Link to={`/${props.id}/employee-project-view`}>
                        <FiEdit />
                    </Link>
                </div>
                <div>
                    {props.employeeNumber} <span>employees</span>
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfo;
