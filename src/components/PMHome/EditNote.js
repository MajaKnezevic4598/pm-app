import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import axiosInstance from '../../helpers/axiosInstance';
import './CreateNewNote.scss';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner.js/Spinner';

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
  const [files, setFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const profileId = localStorage.getItem('profileId');

  const { id } = useParams();

  const { data, status } = useQuery(['editNote'], () => fetchNoteById(id));

  const { data: categories, status: categoriesStatus } = useQuery(
    ['editCategories'],
    () => fetchCategories()
  );
  const saveNote = () => {};

  useEffect(() => {
    if (data) {
      setNoteTitle(data.attributes.title);
      setNoteDescription(data.attributes.description);
      setCategory(data.attributes.category.data.id);
      setOldFiles(data.attributes.files.data);
    }
  }, [data]);

  const uploadFiles = async (id) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const uploadData = await axiosInstance.post('/upload', formData);
    await axiosInstance.put('/notes/' + id, {
      data: {
        files: uploadData.data,
      },
    });
    setIsLoading(false);
    navigate(-1, { replace: true });
  };

  const editNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const notesData = await axiosInstance.put('/notes/' + id, {
      data: {
        title: noteTitle,
        description: noteDescription,
        category: category,
      },
    });
    if (files && notesData) {
      await uploadFiles(notesData.data.data.id);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="new-note">
      <div className="new-note__header">
        <div
          className="new-note__header__back"
          onClick={() => navigate(-1, { replace: true })}
        >
          <BiArrowBack style={{ paddingTop: '4px' }} />
          Back
        </div>
        <div className="new-note__header__title">Edit Note</div>
      </div>
      <div className="new-note__content">
        <div className="new-note__content__info">Note Info</div>
        <form onSubmit={editNote}>
          <label htmlFor="title" className="note-title">
            Note Title
          </label>
          <input
            className="note-input"
            id="title"
            type="text"
            value={noteTitle}
            placeholder="Note Title..."
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <label htmlFor="description" className="note-title">
            Note Description
          </label>
          <textarea
            value={noteDescription}
            id="description"
            placeholder="Note Description..."
            className="note-input"
            style={{ resize: 'none' }}
            onChange={(e) => setNoteDescription(e.target.value)}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="note-input"
            value={category}
          >
            <option value={0}>Select Category</option>
            {categories?.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.attributes.name}
                </option>
              );
            })}
          </select>

          <input
            id="file-upload"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) =>
              setFiles((prev) => {
                return [...prev, ...e.target.files];
              })
            }
          />
          <label htmlFor="file-upload" className="btn-upload">
            UPLOAD FILE
          </label>
          {oldFiles?.map((file) => (
            <div style={{ marginTop: '8px' }}>{file.attributes.name}</div>
          ))}
          {files?.map((file) => (
            <div style={{ marginTop: '8px' }}>{file.name}</div>
          ))}
          {console.log(files)}
          <button className="btn-submit" type="submit">
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
