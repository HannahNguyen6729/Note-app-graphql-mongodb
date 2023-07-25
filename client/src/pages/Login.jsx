import { Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note app
      </Typography>
      <Button variant="outlined">Login with google</Button>
    </div>
  );
};

export default Login;
