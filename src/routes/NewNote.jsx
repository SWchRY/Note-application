import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, UserContext } from '../components/userContext';

export default function NewNote() {
  const user = useUserContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [textNote, setTextNote] = useState('');

  const handleBack = () => {
    navigate('/notes');
  };

  const handleCreate = useCallback(() => {
    fetch('http://localhost:3001/notes')
      .then((r) => r.json())
      .then((notes) => {
        let maxIdNote = notes.reduce((ell, all) =>
          ell.id > all.id ? ell : all
        );
        const note = {
          name: name,
          text: textNote,
          userId: user.user.id,
          id: maxIdNote.id + 1,
          data: new Date(),
        };

        fetch('http://localhost:3001/notes', {
          method: 'POST',
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            navigate('/notes');
          })
          .catch((e) => {
            alert(e);
          });
      });
  }, [name, textNote]);

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetNote = (e) => {
    setTextNote(e.target.value);
  };

  return (
    <div className="flex flex-col mt-20">
      <div className="text-center ">
        <p className="text-5xl font-medium">Create new note</p>
      </div>
      <div className="flex flex-col mt-20 gap-5">
        <input
          onChange={handleSetName}
          placeholder="Name"
          className="pb-1 pl-2 bg-slate-300 text-2xl"
        ></input>
        <textarea
          onChange={handleSetNote}
          placeholder="Note text..."
          className="pl-2 pb-20 bg-slate-300"
        ></textarea>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-10 pl-10"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-28 pl-28"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
