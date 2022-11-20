import Home from './routes/Home';
import Layout from './routes/Layout';
import Login from './routes/Login';
import Error from './routes/Error';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import UserContextProvider from './components/userContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './routes/Register';
import Notes from './routes/Notes';
import NewNote from './routes/NewNote';
import { loader as notesLoader } from './routes/Notes';
import { loader as noteLoader } from './routes/EditNote.jsx';
import { loader as currNoteLoader } from './routes/Note.jsx';
import EditNote from './routes/EditNote';
import Note from './routes/Note';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/notes',
        loader: notesLoader,
        element: <Notes />,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/notes/newnote',
        element: <NewNote />,
      },
      {
        path: '/notes/:id/editnote',
        loader: noteLoader,
        element: <EditNote />,
      },
      {
        path: '/notes/:id',
        loader: currNoteLoader,
        element: <Note />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
