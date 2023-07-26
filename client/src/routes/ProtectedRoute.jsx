import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
