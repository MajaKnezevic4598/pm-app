import React, { useState } from 'react';

import axiosInstance from '../../helpers/axiosInstance';
import './CreateNewNote.scss';
import { BiArrowBack } from 'react-icons/bi';

const CreateNewNote = (props) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [category, setCategory] = useState(null);
  const profileId = localStorage.getItem('profileId');
  const [files, setFiles] = useState();

  const uploadImage = async (id) => {
    const formData = new FormData();

    formData.append('files', files[0]);

    axiosInstance
      .post('/upload', formData)
      .then((response) => {
        axiosInstance.put('/notes/' + id, {
          data: {
            files: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveNote = async (e) => {
    e.preventDefault();
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
      await uploadImage(notesData.data.data.id);
    }
    props.setChangeView(false);
  };
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
            onChange={(e) => setFiles(e.target.files)}
          />
          <label htmlFor="file-upload" className="btn-upload">
            UPLOAD FILE
          </label>
          <button className="btn-submit" type="submit">
            SAVE NOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewNote;
