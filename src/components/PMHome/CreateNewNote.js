import React, { useState, useEffect } from 'react';

import axiosInstance from '../../helpers/axiosInstance';
import './CreateNewNote.scss';
import { BiArrowBack } from 'react-icons/bi';
import Spinner from '../Spinner.js/Spinner';

const CreateNewNote = (props) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [category, setCategory] = useState(null);
  const profileId = localStorage.getItem('profileId');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

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
    props.setChangeView(false);
    setIsLoading(false);
  };

  const saveNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!category || !noteDescription || !noteTitle) {
      return;
    }

    const notesData = await axiosInstance.post('/notes', {
      data: {
        title: noteTitle,
        description: noteDescription,
        category: category,
        project: props.id,
        profile: profileId,
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
          onClick={() => props.setChangeView(false)}
        >
          <BiArrowBack style={{ paddingTop: '4px' }} />
          Back
        </div>
        <div className="new-note__header__title">Create a new Note</div>
      </div>
      <div className="new-note__content">
        <div className="new-note__content__info">Note Info</div>
        <form onSubmit={saveNote}>
          <label htmlFor="title" className="note-title">
            Note Title
          </label>
          <input
            className="note-input"
            id="title"
            type="text"
            placeholder="Note Title..."
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <label htmlFor="description" className="note-title">
            Note Description
          </label>
          <textarea
            id="description"
            placeholder="Note Description..."
            className="note-input"
            style={{ resize: 'none' }}
            onChange={(e) => setNoteDescription(e.target.value)}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="note-input"
          >
            <option value={0}>Select Category</option>
            {props.categories?.map((category) => {
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
            style={{ display: 'none' }}
            multiple
            onChange={(e) =>
              setFiles((prev) => {
                return [...prev, ...e.target.files];
              })
            }
          />
          <label htmlFor="file-upload" className="btn-upload">
            UPLOAD FILE
          </label>
          {files.map((file) => (
            <div style={{ marginTop: '8px' }}>{file.name}</div>
          ))}
          <button className="btn-submit" type="submit">
            SAVE NOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewNote;
