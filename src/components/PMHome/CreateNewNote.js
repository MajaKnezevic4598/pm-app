import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

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
            <p onClick={() => props.setChangeView(false)}> Back</p>
            <h1>CREATE NEW NOTE</h1>
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
                <button>UPLOAD FILE</button>
                <button type="submit">SAVE NOTE</button>
            </form>
        </div>
    );
};

export default CreateNewNote;
