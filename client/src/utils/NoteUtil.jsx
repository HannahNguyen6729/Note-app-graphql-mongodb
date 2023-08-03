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
