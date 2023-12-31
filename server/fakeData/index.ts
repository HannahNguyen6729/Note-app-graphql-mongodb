export default {
  authors: [
    {
      id: 123,
      name: 'HoleTex',
    },
    {
      id: 999,
      name: 'Than Quan',
    },
    {
      id: 10,
      name: 'Da Dam',
    },
  ],
  folders: [
    {
      id: '1',
      name: 'Home',
      createdAt: '2023-11-18T03:42:13Z',
      authorId: 999,
    },
    {
      id: '2',
      name: 'New Folder',
      createdAt: '2023-10-18T03:42:13Z',
      authorId: 123,
    },
    {
      id: '3',
      name: 'Work',
      createdAt: '2023-09-18T03:42:13Z',
      authorId: 10,
    },
  ],
  notes: [
    {
      id: '400',
      content: ' <p> Go to the park </p>',
      folderId: '1',
    },
    {
      id: '401',
      content: ' <p> Go to the zoo </p>',
      folderId: '2',
    },
    {
      id: '402',
      content: ' <p> Go to the school </p>',
      folderId: '3',
    },
    {
      id: '403',
      content: ' <p> Go to the hospital </p>',
      folderId: '3',
    },
  ],
};
