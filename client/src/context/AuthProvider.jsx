import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //set up an observer for changes to the user's ID token using Firebase Authentication
    const unsubcribed = auth.onIdTokenChanged((user) => {
      // console.log("user from auth provider", user);

      //login
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem('access_token')) {
          localStorage.setItem('access_token', user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      //logout, reset user infor
      setUser({});
      setIsLoading(false);
      localStorage.clear();
      navigate('/login');
    });

    return () => {
      unsubcribed();
    };
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
