import React from 'react';
import icon1 from './../assets/imgs/pencil.png';
import icon2 from './../assets/imgs/delete.png';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:3001/notes?id=${id}`).then((r) =>
    r.json()
  );
  return { note };
};

export default function Note() {
  const navigate = useNavigate();
  const { note } = useLoaderData();
  const handleBack = () => {
    navigate('/notes');
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/notes/${note[0].id}/editnote`);
  };
  const handleDelete = async (e) => {
    let currId = note[0].id;
    await fetch(`http://localhost:3001/notes/${currId}`, {
      method: 'DELETE',
    });
    navigate('/notes');
  };
  return (
    <div>
      <div className="flex flex-col mt-20">
        <div className="text-center ">
          <p className="text-5xl font-medium">{note[0].name}</p>
        </div>
        <div className="flex flex-col mt-20 gap-5">
          <p className="h-64 bg-slate-300 p-2">{note[0].text}</p>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-10 pl-10"
            >
              Back
            </button>
            <div className="flex mt-20 gap-x-5">
              <img className="w-10 h-10" src={icon1} onClick={handleEdit} />
              <img className="w-10 h-10" src={icon2} onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
