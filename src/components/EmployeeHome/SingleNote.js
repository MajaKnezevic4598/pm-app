import React from 'react';

const SingleNote = (props) => {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.description}</p>
        </div>
    );
};

export default SingleNote;
