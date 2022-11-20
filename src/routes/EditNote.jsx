import React, { useCallback, useState } from 'react';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import { useUserContext, UserContext } from '../components/userContext';

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:3001/notes?id=${id}`).then((r) =>
    r.json()
  );
  return { note };
};

export default function EditNote() {
  const { note } = useLoaderData();
  const [name, setName] = useState(note[0].name);
  const [textNote, setTextNote] = useState(note[0].text);
  const navigate = useNavigate();

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetNote = (e) => {
    setTextNote(e.target.value);
  };

  const handleBack = () => {
    navigate('/notes');
  };

  const handleEdit = useCallback(() => {
    fetch('http://localhost:3001/notes')
      .then((r) => r.json())
      .then((notes) => {
        const editNote = {
          name: name,
          text: textNote,
        };
        console.log(note);
        fetch(`http://localhost:3001/notes/${note[0].id}`, {
          method: 'PATCH',
          body: JSON.stringify(editNote),
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

  return (
    <div>
      <div className="flex flex-col mt-20">
        <div className="text-center ">
          <p className="text-5xl font-medium">Edit note</p>
        </div>
        <div className="flex flex-col mt-20 gap-5">
          <input
            onChange={handleSetName}
            placeholder="Name"
            className="pb-1 pl-2 bg-slate-300 text-2xl"
            value={name}
          ></input>
          <textarea
            onChange={handleSetNote}
            placeholder="Note text..."
            className="pl-2 pb-20 bg-slate-300"
            value={textNote}
          ></textarea>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-10 pl-10"
            >
              Back
            </button>
            <button
              onClick={handleEdit}
              className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-28 pl-28"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
