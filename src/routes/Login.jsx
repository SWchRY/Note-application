import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from './../components/userContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/users').then((r) => r.json());
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(() => {
    fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
        } else {
          alert('Uncorrect data');
        }
      });
  }, [email, password, navigate, userContext]);

  useEffect(() => {
    if (userContext.user?.email) {
      navigate('/');
    }
  }, [navigate, userContext.user]);

  return (
    <div className="w-4/6 m-auto">
      <div className="flex flex-col items-start items-center">
        <p className="text-5xl mt-20 mb-7 font-medium">Log in</p>
        <input
          placeholder="Email"
          className="bg-slate-200 m-5 text-2xl p-2 pr-20"
          onChange={handleSetEmail}
          value={email}
        />
        <input
          placeholder="Password"
          className="bg-slate-200 text-2xl p-2 pr-20"
          onChange={handleSetPassword}
          value={password}
          type="password"
        />
        <button
          className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-28 pl-28"
          onClick={handleLogin}
        >
          Log in
        </button>
        <Link to="/register" className="mt-5">
          Dont have an account? Register
        </Link>
      </div>
      <footer className="mt-52 border-1 border-t-2 border-black">
        <hr />
        <div className="flex justify-around mt-5 text-lg text-slate-500">
          <p>Created by: Urkevich Alex</p>
          <p>BSU: 2022</p>
        </div>
      </footer>
    </div>
  );
}
