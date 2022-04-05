import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import axiosInstance from '../../helpers/axiosInstance';
import './CreateNewNote.scss';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const fetchNoteById = async (id) => {
    const response = await axiosInstance.get('/notes/' + id + '?populate=*');
    console.log(response.data.data);
    return response.data.data;
};

const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories');
    console.log(response.data.data);
    return response.data.data;
};

const EditNote = (props) => {
    const navigate = useNavigate();
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [category, setCategory] = useState(null);
    const profileId = localStorage.getItem('profileId');

    const { id } = useParams();

    const { data, status } = useQuery(['editNote'], () => fetchNoteById(id));

    const { data: categories, status: categoriesStatus } = useQuery(
        ['editCategories'],
        () => fetchCategories(),
    );

    useEffect(() => {
        if (data) {
            setNoteTitle(data.attributes.title);
            setNoteDescription(data.attributes.description);
            setCategory(data.attributes.category.data.id);
        }
    }, [data]);

    const editNote = async (e) => {
        e.preventDefault();
        await axiosInstance.put('/notes/' + id, {
            data: {
                title: noteTitle,
                description: noteDescription,
                category: category,
            },
        });
        navigate(-1, { replace: true });
    };
    return (
        <div>
            <div className="info">
                <p onClick={() => navigate(-1, { replace: true })}>
                    <BiArrowBack style={{ paddingTop: '4px' }} />
                    Back
                </p>
                <h1>EDIT NOTE</h1>
            </div>
            <div className="notecreate">
                <form onSubmit={editNote}>
                    <label htmlFor="title">Edit Note Title</label>
                    <input
                        value={noteTitle}
                        id="title"
                        type="text"
                        placeholder="Note Title..."
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <label htmlFor="description">Edit Note Description</label>
                    <textarea
                        value={noteDescription}
                        id="description"
                        placeholder="Note Description..."
                        onChange={(e) => setNoteDescription(e.target.value)}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {/* <option value={0}>Select Category</option> */}
                        {categories?.map((category) => {
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
                        EDIT NOTE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
