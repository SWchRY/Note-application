import { NavLink, Outlet } from 'react-router-dom';
import { useUserContext, UserContext } from '../components/userContext';

export default function Layout() {
  const user = useUserContext();

  const handleLogout = () => {
    user.setUser({ email: '' });
  };

  return (
    <div className="w-4/6 m-auto mt-10 text-xl">
      <header className="text-center flex justify-between">
        <p>Hello, {user.user.name}!</p>
        <div className="flex gap-x-8">
          <NavLink to="/" end={true}>
            About
          </NavLink>
          <NavLink to="/notes ">Notes</NavLink>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-52 border-1 border-t-2 border-black">
        <hr />
        <div className="flex justify-around mt-5 text-lg text-slate-400">
          <p>Created by: Urkevich Alex</p>
          <p>BSU: 2022</p>
        </div>
      </footer>
    </div>
  );
}
