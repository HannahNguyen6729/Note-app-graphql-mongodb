import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { NoteAddOutlined } from "@mui/icons-material";

const NoteList = () => {
  const { folderId, noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);

  const folders = [
    {
      id: 1,
      name: "desktop",
      notes: [
        { id: 1, content: "note1" },
        { id: 2, content: "note2" },
      ],
    },
    { id: 2, name: "work" },
    { id: 3, name: "school" },
  ];
  const foundFolder = folders.find((folder) => folder.id == folderId);

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip
                title="Add Note"
                // onClick={handleAddNewNote}
              >
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {foundFolder.notes?.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor:
                      id === activeNoteId ? "rgb(255 211 140)" : null,
                  }}
                >
                  <CardContent
                    sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    />
                    <Typography sx={{ fontSize: "10px" }}></Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        note detail
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default NoteList;
