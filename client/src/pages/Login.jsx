import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log("response", res);
  };

  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note app
      </Typography>
      <Button variant="outlined" onClick={handleLogin}>
        Login with google
      </Button>
    </div>
  );
};

export default Login;
