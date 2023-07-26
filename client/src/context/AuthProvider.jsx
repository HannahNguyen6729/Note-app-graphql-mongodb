import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //set up an observer for changes to the user's ID token using Firebase Authentication
    const unsubcribed = auth.onIdTokenChanged((user) => {
      // console.log("user from auth provider", user);

      //login
      if (user?.uid) {
        setUser(user);
        localStorage.setItem("access_token", user.accessToken);
        return;
      }

      //logout, reset user infor
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
