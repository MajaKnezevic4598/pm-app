import React from 'react';

import './EmptyNote.scss';

const EmptyNote = () => {
    return (
        <div className="empty">
            <div className="empty__text">
                <div className="empty__text__title">
                    There are no information at the moment.
                </div>
                <div>Please check back later!</div>
            </div>
        </div>
    );
};

export default EmptyNote;
