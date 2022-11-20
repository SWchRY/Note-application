import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [users, setUsers] = useState([]);

  const handleSetRepeatPassword = useCallback((e) => {
    setRepeatPassword(e.target.value);
  }, []);

  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSetName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }

  const navigate = useNavigate();
  const handleRegister = useCallback(() => {
    if (email == '' || password == '' || name == '') {
      alert('Заполните все поля');
    } else if (!isEmailValid(email)) {
      alert('Введён не корректный email');
    } else if (password != repeatPassword) {
      alert('Пароли не совпадают');
    } else {
      fetch(`http://localhost:3001/users?email=${email}`)
        .then((r) => r.json())
        .then((users) => {
          if (users.length == 1) {
            alert('Данный email уже занят');
          } else {
            fetch(`http://localhost:3001/users`)
              .then((r) => r.json())
              .then((users) => {
                const user = {
                  id: users.length + 1,
                  email: email,
                  name: name,
                  password: password,
                  date: new Date(),
                };
                fetch('http://localhost:3001/users', {
                  method: 'POST',
                  body: JSON.stringify(user),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(() => {
                    navigate('/login');
                  })
                  .catch(() => {
                    alert('Bad');
                  });
              });
          }
        });
    }
  }, [email, password, name]);

  return (
    <div className="w-4/6 m-auto">
      <div id="2" className="flex flex-col items-start items-center">
        <p className="text-5xl mt-20 mb-7 font-medium">Sign up</p>
        <input
          placeholder="Email"
          className="bg-slate-200 m-5 text-2xl p-2 pr-20 relative"
          onChange={handleSetEmail}
          value={email}
        ></input>
        <input
          placeholder="Password"
          className="bg-slate-200 text-2xl p-2 pr-20"
          onChange={handleSetPassword}
          value={password}
          type="password"
        />
        <input
          placeholder="Repeat password"
          className="bg-slate-200 text-2xl p-2 pr-20 m-5"
          onChange={handleSetRepeatPassword}
          value={repeatPassword}
          type="password"
        />
        <input
          placeholder="Name"
          className="bg-slate-200 text-2xl p-2 pr-20"
          onChange={handleSetName}
          value={name}
        />
        <button
          className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-28 pl-28"
          onClick={handleRegister}
        >
          Sign up
        </button>
        <Link to="/login" className="mt-5">
          U have an account? Log in
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
