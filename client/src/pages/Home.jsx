import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

import FolderList from "../components/FolderList";
import UserMenu from "../components/UserMenu";
const Home = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>

      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList
            folders={[
              { id: 1, name: "desktop" },
              { id: 2, name: "work" },
              { id: 3, name: "school" },
            ]}
          />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
