import React, { useEffect, useRef, useState } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Note = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const note = {
    id: 3,
    content: "csand",
  };

  //note data got from backend then send back to it
  const [rawHtml, setRawHtml] = useState(note.content);

  useEffect(() => {
    setRawHtml(note.content);
  }, [note.content]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id, note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <div>
      <Editor
        ref={editor}
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="Write something!"
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      ;
    </div>
  );
};

export default Note;
