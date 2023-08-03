import React from 'react';
import { Button, Typography } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { graphqlRequest } from '../utils/request';

const Login = () => {
  const auth = getAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const data = await graphqlRequest({
      query: `
        mutation register($uid:String!, $name:String!){
          register(uid:$uid, name:$name){
            uid, 
            name
          } 
        }
      `,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log({ data });
  };

  if (localStorage.getItem('access_token')) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: '10px' }}>
        Welcome to Note app
      </Typography>
      <Button variant="outlined" onClick={handleLogin}>
        Login with google
      </Button>
    </div>
  );
};

export default Login;
