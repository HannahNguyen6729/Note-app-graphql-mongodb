import { graphqlRequest } from './request';

export const noteLoader = async ({ params }) => {
  const noteId = params.noteId;
  const query = `query Folder($noteId: String) {
      note(noteId: $noteId) {
        id
        content
      }
    }
`;
  const data = await graphqlRequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;

  /*  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId,
      },
    }),
  });

  const data = await response.json();
  return data; */
};

export const notesLoader = async ({ params }) => {
  const folderId = params.folderId;
  const query = `query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        name
        id
        notes {
          id
          content
        }
      }
    }
`;

  const data = await graphqlRequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;

  /* const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId,
      },
    }),
  });

  const data = await response.json();
  return data; */
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ newNote, formDataObj, params });
  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const data = await graphqlRequest({
    query,
    variables: formDataObj,
  });

  console.log({ addNote: data });

  return data;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ updatedNote, formDataObj });
  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;

  const updateNote = await graphqlRequest({
    query,
    variables: formDataObj,
  });

  console.log({ updateNote });

  return updateNote;
};
