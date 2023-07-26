import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import NoteList from '../components/NoteList';
import Note from '../components/Note';

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
            loader: async () => {
              const query = `query Folders {
                folders {
                  id
                  name
                  createdAt
                }
              }
				`;
              const response = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({ query }),
              });

              const data = await response.json();
              console.log('axios', data.data);
              return data;
            },
            children: [
              {
                element: <NoteList />,
                path: `/folders/:folderId`,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
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
