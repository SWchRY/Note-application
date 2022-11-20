import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import { useUserContext, UserContext } from '../components/userContext';
import icon1 from './../assets/imgs/pencil.png';
import icon2 from './../assets/imgs/delete.png';

export const loader = async () => {
  const notes = await fetch(
    `http://localhost:3001/notes?userId=${localStorage.getItem('user')[6]}`
  ).then((r) => r.json());
  return notes;
};

export default function Notes() {
  const user = useUserContext();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(useLoaderData());

  const handleCreateNote = () => {
    navigate('/notes/newnote');
  };

  const handleGoNote = (e) => {
    navigate(`/notes/${e.target.id}`);
  };

  const handleEditNote = (e, id) => {
    e.stopPropagation();
    navigate(`/notes/${id}/editnote`);
  };

  const handleDeleteNote = async (e) => {
    let currId = e.target.parentElement.parentElement.id;
    await fetch(`http://localhost:3001/notes/${currId}`, {
      method: 'DELETE',
    });
    const newNotes = await fetch(
      `http://localhost:3001/notes?userId=${localStorage.getItem('user')[6]}`
    ).then((r) => r.json());
    setNotes(newNotes);
  };

  return (
    <div>
      <div className="text-center">
        <p className="mt-14 text-5xl font-medium">Notes</p>
        <button
          className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-20 pl-20"
          onClick={handleCreateNote}
        >
          Add new notes
        </button>
      </div>
      <div>
        {notes
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .map((el) => {
            return (
              <div
                id={`${el.id}`}
                className="p-3 flex justify-between items-center mt-10 bg-slate-300 cursor-pointer"
                onClick={handleGoNote}
              >
                <div className="flex gap-x-5 text-xl">
                  <p>{el.name}</p>
                  <p>
                    {new Date(el.data)
                      .toLocaleDateString('en-GB', {
                        year: '2-digit',
                        month: 'numeric',
                        day: 'numeric',
                      })
                      .replace(/\//g, '.')}
                  </p>
                </div>
                <div className="flex">
                  <img
                    className="w-8 h-8"
                    src={icon1}
                    onClick={(e) => handleEditNote(e, el.id)}
                  />
                  <img
                    onClick={handleDeleteNote}
                    className="w-8 h-8 cursor-pointer"
                    src={icon2}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
