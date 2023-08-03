import fakeData from '../fakeData/index';
import FolderModel from '../models/FolderModel';
import AuthorModel from '../models/AuthorModel';
import NoteModel from '../models/NoteModel';

export const resolvers = {
  Query: {
    folders: async (parent: any, args: any, context: any) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ parent, args, context });
      return folders;
    },
    folder: async (parent: any, args: any) => {
      //parent: Folder, args: params sent from client
      const folderId: string = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });
      console.log(parent);
      return foundFolder;
    },
    note: async (parent: any, args: any) => {
      console.log('parent', parent);
      const note = await NoteModel.findById(args.noteId);
      return note;
    },
  },
  Folder: {
    author: (parent: any, args: any, contextValue: any, info: any) => {
      console.log('parent', parent, 'args', args, contextValue, info);
      return fakeData.authors.find((author) => author.id === parent.authorId);
    },
    notes: async (parent: any, args: any) => {
      console.log('parent', parent, 'args', args);
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ notes });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent: any, args: any, context: any) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log('newFolder', newFolder, 'parent', parent);
      await newFolder.save();
      return newFolder;
    },
    register: async (parent: any, args: any) => {
      console.log('parent : ', parent, 'args', args);
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      console.log('foundUser', foundUser);
      return foundUser;
    },
    addNote: async (parent: any, args: any) => {
      console.log(parent);
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
  },
};
