import React, { useState } from 'react';

import axiosInstance from '../../helpers/axiosInstance';
import './CreateNewNote.scss';
import { BiArrowBack } from 'react-icons/bi';

const CreateNewNote = (props) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [category, setCategory] = useState(null);
    const profileId = localStorage.getItem('profileId');

    const saveNote = async (e) => {
        e.preventDefault();
        if (!category || !noteDescription || !noteTitle) {
            return;
        }
        await axiosInstance.post('/notes', {
            data: {
                title: noteTitle,
                description: noteDescription,
                category: category,
                project: props.id,
                profile: profileId,
            },
        });
        props.setChangeView(false);
    };
    return (
        <div>
            <div className="info">
                <p onClick={() => props.setChangeView(false)}>
                    <BiArrowBack style={{ paddingTop: '4px' }} />
                    Back
                </p>
                <h1>CREATE NEW NOTE</h1>
            </div>
            <div className="notecreate">
                <form onSubmit={saveNote}>
                    <label htmlFor="title">Note Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Note Title..."
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <label htmlFor="description">Note Description</label>
                    <textarea
                        id="description"
                        placeholder="Note Description..."
                        onChange={(e) => setNoteDescription(e.target.value)}
                    />
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value={0}>Select Category</option>
                        {props.categories?.map((category) => {
                            return (
                                <option value={category.id} key={category.id}>
                                    {category.attributes.name}
                                </option>
                            );
                        })}
                    </select>
                    <button className="notecreate__button__upload">
                        UPLOAD FILE
                    </button>
                    <button
                        className="notecreate__button__submit"
                        type="submit"
                    >
                        SAVE NOTE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewNote;

// const CreateNewNote = (props) => {
//     const [noteTitle, setNoteTitle] = useState('');
//     const [noteDescription, setNoteDescription] = useState('');
//     const [category, setCategory] = useState(null);
//     const profileId = localStorage.getItem('profileId');

//     const saveNote = async (e) => {
//         e.preventDefault();
//         if (!category || !noteDescription || !noteTitle) {
//             return;
//         }
//         await axiosInstance.post('/notes', {
//             data: {
//                 title: noteTitle,
//                 description: noteDescription,
//                 category: category,
//                 project: props.id,
//                 profile: profileId,
//             },
//         });
//         props.setChangeView(false);
//     };

//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 paddingTop: '12rem',
//             }}
//         >
//             <div>
//                 <p
//                     style={{
//                         padding: '0.5rem 1rem',
//                     }}
//                     onClick={() => props.setChangeView(false)}
//                 >
//                     {' '}
//                     Back
//                 </p>
//                 <h1>CREATE NEW NOTE</h1>
//             </div>
//             <div
//                 style={{
//                     display: 'flex',
//                     margin: '4px 2px',
//                     padding: '16px 32px',
//                 }}
//             >
// <form onSubmit={saveNote}>
//     <label htmlFor="title">Note Title</label>
//     <input
//         id="title"
//         type="text"
//         placeholder="Note Title..."
//         onChange={(e) => setNoteTitle(e.target.value)}
//     />
//     <label htmlFor="description">Note Description</label>
//     <textarea
//         id="description"
//         placeholder="Note Description..."
//         onChange={(e) => setNoteDescription(e.target.value)}
//     />
//     <select onChange={(e) => setCategory(e.target.value)}>
//         <option value={0}>Select Category</option>
//         {props.categories?.map((category) => {
//             return (
//                 <option value={category.id} key={category.id}>
//                     {category.attributes.name}
//                 </option>
//             );
//         })}
//     </select>
//     <button>UPLOAD FILE</button>
//     <button type="submit">SAVE NOTE</button>
// </form>
//             </div>
//         </div>
//     );
// };

// export default CreateNewNote;
