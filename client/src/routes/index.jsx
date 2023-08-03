import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import NoteList from '../components/NoteList';
import Note from '../components/Note';
import {
  addNewNote,
  noteLoader,
  notesLoader,
  updateNote,
} from '../utils/NoteUtil';
import { foldersLoader } from '../utils/FolderUtil';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: `/folders/:folderId`,
                action: addNewNote,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    loader: noteLoader,
                    action: updateNote,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
