import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error() {
  return (
    <div className="w-4/6 m-auto mt-40">
      <div className="flex flex-col text-center mt-20">
        <p className="text-4xl">404</p>
        <p className="text-5xl">Page not found</p>
        <p className="text-3xl mt-2">
          Go{' '}
          <NavLink to="/" className="hover:cursor-pointer hover:text-sky-500">
            Home
          </NavLink>
        </p>
      </div>
    </div>
  );
}
