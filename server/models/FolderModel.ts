import mongoose from 'mongoose';

interface Folder {
  name: string;
  authorId: string;
}

const folderSchema = new mongoose.Schema<Folder>(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FolderModel = mongoose.model('Folder', folderSchema);
export default FolderModel;
