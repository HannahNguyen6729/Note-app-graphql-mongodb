import React, { useEffect, useRef, useState } from 'react';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

const Note = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const response = useLoaderData();
  const note = response.data.note;
  const submit = useSubmit();
  const location = useLocation();

  //note data got from backend then send back to it
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    setRawHTML(note.content);
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
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = React.useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;

      submit(
        { ...note, content: rawHTML },
        {
          method: 'post',
          action: pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
