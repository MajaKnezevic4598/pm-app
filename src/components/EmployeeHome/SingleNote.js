import React from 'react';

import './SingleNote.scss';

const SingleNote = (props) => {
    return (
        <div>
            <div className="note__content">
                <div className="employee__info">
                    <div className="employee-info__left">
                        <div
                            style={{ width: '320px' }}
                            className="employee-info__left__desc"
                        >
                            <p
                                style={{
                                    lineHeight: '28px',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {props.name}
                            </p>
                            <p
                                style={{
                                    paddingTop: '16px',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    lineHeight: '21px',
                                    color: '#717171',
                                }}
                            >
                                {props.description}
                            </p>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                paddingTop: '80px',

                                width: '350px',
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <img
                                className="note__image"
                                src={
                                    'https://pm-app-bek.herokuapp.com' +
                                    props.photo
                                }
                                alt="profilephoto"
                            />
                            <p className="note__name">{props.pmName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
